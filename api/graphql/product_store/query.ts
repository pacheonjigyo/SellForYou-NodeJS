import { ProductState } from "@prisma/client";
import { GraphQLResolveInfo } from "graphql";
import { shake256 } from "js-sha3";
import { extendType, intArg, list, nonNull } from "nexus";
import { Context } from "nexus-plugin-prisma/typegen";
import { ArgsValue } from "nexus/dist/typegenTypeHelpers";
import { ProductStoreStateEnum, predefinedSiilData } from "..";
import { shopDataNameInfo, IPADShopInfo, IPADataDataSet10 } from "../../playauto_api_type";
import { EXTERNAL_ADDRESS } from "../../utils/constants";
import { errors, throwError } from "../../utils/error";
import { EXTERNAL_S3_ADDRESS, getFromS3 } from "../../utils/file_manage";
import { encodeObjectToKeyEqualsValueNewline, getOptionHeaderHtmlByProductId, sendPlayAutoJob } from "../../utils/local/playauto";
import { IWordTable, replaceWordTable } from "../../utils/local/word-replace";
import * as CryptoJS from "crypto-js";



interface IPADataImagePartial {
    img1: string;
    img2: string;
    img3: string;
    img4: string;
    img5: string;
    img6: string;
    img7: string;
    img8: string;
    img9: string;
    img10: string;
    img1_blob: string;
    img2_blob: string;
    img3_blob: string;
    img4_blob: string;
    img5_blob: string;
    img6_blob: string;
    img7_blob: string;
    img8_blob: string;
    img9_blob: string;
    img10_blob: string;
}

interface IQueryAdminArg {
    adminId: number;
    targetUserId: number;
}

const truncateOptionNameInternal = (siteCode: string, text: string) => {
    if (siteCode === 'A077') {//스마트스토어
        return text.replace(/[\\\*\?"<>,]/g, "").slice(0, 25);
    }
    if (siteCode === 'B378') {//쿠팡
        return text.replace(/[\\\*\?"<>,]/g, "").slice(0, 30);
    }
    return text;
}

const truncateOptionName = <T extends IWordTable>(siteCode: string, text: string, wordTable: T[]) => replaceWordTable(truncateOptionNameInternal(siteCode, text), wordTable)
// const truncateOptionName = <T extends IWordTable>(siteCode: string, text: string, wordTable: T[]) => truncateOptionNameInternal(siteCode, text)

export function getValidUploadImageUrl(image: string) {
    if (!/^https?:\/\//.test(image) && image !== "") {
        image = `${EXTERNAL_S3_ADDRESS}/${image}`;
    }
    if (/^https:\/\//.test(image)) {
        image = image.replace(/^https/, "http");
    }
    return image;
}



const registerProductResolver = (data: IQueryAdminArg | null) => async (src: {}, args: ArgsValue<"Query", "getRegisterProductsDataByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    const adminId = data?.adminId ?? null;
    try {
        if (args.productIds.length === 0) return throwError(errors.etc("상품 ID를 입력하세요."), ctx);
        const product2 = await ctx.prisma.product.findMany({
            where: { id: { in: args.productIds } },
            include: {
                productStore: { include: { userSetData: true } },
                category: true,
                taobaoProduct: true,
                productOption: {
                    orderBy: [{ optionString: "asc" }],
                    include: {
                        optionValue1: { include: { productOptionName: true } },
                        optionValue2: { include: { productOptionName: true } },
                        optionValue3: { include: { productOptionName: true } },
                    }
                },
                productOptionName: { orderBy: [{ order: "asc" }], include: { productOptionValue: { orderBy: [{ number: "asc" }] } } }
            }
        })
        if (product2.length !== args.productIds.length) return throwError(errors.etc("상품 ID를 확인하세요."), ctx);
        const userId = data ? data.targetUserId : ctx.token!.userId!;
        if (!adminId && !product2.every(v => v.userId === userId)) return throwError(errors.etc("자신의 상품 ID를 입력하세요."), ctx);

        const shopData = await ctx.prisma.userShopData.findUnique({ where: { id: args.userShopDataId } })
        if (!shopData) return throwError(errors.etc("해당 스토어정보가 없습니다."), ctx);
        if (shopData.userId !== userId) return throwError(errors.etc("해당 유저의 스토어정보가 아닙니다."), ctx);

        // 중복업로드 막기
        const duplicateUpload = false; //개발용
        const product = duplicateUpload ? product2 : product2.filter(v => v.productStore.every(v2 => v2.userShopDataId !== shopData.id || v2.storeProductId === null));
        if (product.length === 0) {
            return throwError(errors.etc(`요청하신 모든 상품이 ${shopDataNameInfo[shopData.siteCode]}(ID : ${shopData.siteUserId})에 이미 업로드되어 있습니다.`), ctx);
        }

        // const setDataJson = JSON.parse((await getFromS3(setData.setFilePath)).Body!.toString("utf8"));

        if (!product.every(v => v.categoryCode !== null)) return throwError(errors.etc(`카테고리 데이터가 없는 상품이 있습니다.\n해당 상품 : ${product.filter(v => v.categoryCode === null).map(v => v.productCode).join(", ")}`), ctx);

        const wordTable = await ctx.prisma.wordTable.findMany({ where: { userId } });
        const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId } });
        if (!userInfo) return throwError(errors.etc("해당 유저가 없습니다."), ctx);

        // 복호화
        Object.keys(shopData).map(v2 => {
            const v = v2 as keyof typeof shopData;
            if (v.startsWith("siteUser")) {
                if (v === 'siteUserId') return;
                const key = Buffer.from(shake256(userId + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                const code = CryptoJS.AES.decrypt(shopData[v] as string, key).toString(CryptoJS.enc.Utf8);
                (shopData[v] as string) = code;
            }
        })

        //금지어 적용
        const productStoreCheck = await Promise.all(product.map(async v => {
            try {
                v.productOption.map(v2 => {
                    return {
                        opt1: truncateOptionName(shopData.siteCode, ("00" + v2.optionValue1.number).slice(-2) + " " + v2.optionValue1.name, wordTable), //옵션타입1의 옵션명
                        opt2: truncateOptionName(shopData.siteCode, v2.optionValue2?.name ? ("00" + v2.optionValue2.number).slice(-2) + " " + v2.optionValue2.name : "", wordTable), //옵션타입2의 옵션명
                        opt3: truncateOptionName(shopData.siteCode, v2.optionValue3?.name ? ("00" + v2.optionValue3.number).slice(-2) + " " + v2.optionValue3.name : "", wordTable), //옵션타입3의 옵션명
                        misc1: truncateOptionName(shopData.siteCode, v2.optionValue1.productOptionName.name, wordTable), //옵션타입 1의 명칭
                        misc2: truncateOptionName(shopData.siteCode, v2.optionValue2?.productOptionName.name ?? "", wordTable), //옵션타입 2의 명칭
                        misc3: truncateOptionName(shopData.siteCode, v2.optionValue3?.productOptionName.name ?? "", wordTable), //옵션타입 3의 명칭
                    }
                })
                // replaceWordTable(`<div style="text-align: center;">${await getOptionHeaderHtmlByProductId(ctx.prisma, v.product.id)}${/^product\/\d+\/description.html$/.test(v.product.description) ? (await getFromS3(v.product.description)).Body!.toString("utf8") : v.product.description}</div>`, wordTable);
                replaceWordTable(v.name, wordTable);
            }
            catch (e) {
                const a = e as Error;
                return `${v.productCode} 상품에서 ${a.message}`;
            }
            return v;
        }));

        if (productStoreCheck.filter(v => typeof v === 'string').length > 0) {
            return throwError(errors.etc(`요청하신 상품 중 설정한 금지단어가 포함된 상품이 있어서 작업이 중단되었습니다.\n${productStoreCheck.filter((v): v is string => typeof v === 'string').join("\n")}`), ctx);
        }
        const productStore = productStoreCheck.filter(<T>(v: T): v is Exclude<T, string> => typeof v !== 'string').map(v => ({ product: v }))

        try {
            const job_json: { DShopInfo: IPADShopInfo<IPADataDataSet10> } = {
                DShopInfo: {
                    action: [10], //작업 기본정보 RegistProd(상품등록)
                    account_code: "SFY", //업체코드 또는 업체 ID(발급받아서 입력해주세요)
                    site_code: shopData.siteCode, //쇼핑몰 코드
                    dll_code: shopData.siteCode, //dll 코드(쇼핑몰 코드와 동일)
                    site_name: shopDataNameInfo[shopData.siteCode], //쇼핑몰 이름
                    encoding: "utf-8", //인코딩 방식
                    id: shopData.siteUserId, //쇼핑몰 아이디
                    pw: shopData.siteUserPw, //쇼핑몰 비밀번호
                    etc: shopData.siteUseretc1,
                    etc2: shopData.siteUseretc2,
                    etc3: shopData.siteUseretc3,
                    etc4: shopData.siteUseretc4,
                    etc5: shopData.siteUseretc5,
                    etc6: shopData.siteUseretc6,
                    id2: "",
                    dummy1: 9999,
                    global_yn: "1", //해외쇼핑몰 여부 -> 무조건 1
                    prod_codes: productStore.map(v => v.product.productCode), // 마스터 상품코드(작업대상 상품별 고유 코드)
                    //각 작업별 데이터 (DataDataSet)
                    DataDataSet: {
                        api: productStore.map(v => ({
                            amp_key: "",
                            amp_program_code: "koozapas@naver.com", //발급받아서 입력해주세요
                            amp_program_type: "TEST", //발급받아서 입력해주세요
                            amp_program_homedir: "",
                            amp_program_homeurl: "",
                        })),
                        //옵션데이터
                        data_opt: productStore.map(v => {

                            //상품판매가 계산
                            let price = Math.round((v.product.price) / 10) * 10;
                            if (shopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
                                const productPrice = Math.round(v.product.price / 10) * 10;
                                const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
                                const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;
                                if (v.product.productOption.some(v2 => v2.price < minRange || v2.price > maxRange)) { //판매가 범위 밖이면
                                    price = Math.min(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10)); //실제상품가격 = 최저옵션가
                                }
                            }
                            const a = v.product.productOption.map(v2 => {
                                const image = v2.optionValue1.image ?? v2.optionValue2?.image ?? v2.optionValue3?.image ?? null;
                                return {
                                    number: 0, //옵션별 고유코드 0 //TODO:무슨 역할인지 물어보기
                                    type: 'SELECT', //옵션 종류
                                    code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
                                    manage_code: `SFY_${v.product.id.toString(36)}_${v2.id.toString(36)}`, //관리코드
                                    opt1: truncateOptionName(shopData.siteCode, ("00" + v2.optionValue1.number).slice(-2) + " " + v2.optionValue1.name, wordTable), //옵션타입1의 옵션명
                                    opt2: truncateOptionName(shopData.siteCode, v2.optionValue2?.name ? ("00" + v2.optionValue2.number).slice(-2) + " " + v2.optionValue2.name : "", wordTable), //옵션타입2의 옵션명
                                    opt3: truncateOptionName(shopData.siteCode, v2.optionValue3?.name ? ("00" + v2.optionValue3.number).slice(-2) + " " + v2.optionValue3.name : "", wordTable), //옵션타입3의 옵션명
                                    price: Math.round((v2.price - price) / 10) * 10, //옵션 추가 가격
                                    stock: v2.stock ?? 0, //옵션 수량
                                    soldout: 0, //품절 여부
                                    wdate: '2020-11-27 08:59:40', //등록일자
                                    misc1: truncateOptionName(shopData.siteCode, v2.optionValue1.productOptionName.name, wordTable), //옵션타입 1의 명칭
                                    misc2: truncateOptionName(shopData.siteCode, v2.optionValue2?.productOptionName.name ?? "", wordTable), //옵션타입 2의 명칭
                                    misc3: truncateOptionName(shopData.siteCode, v2.optionValue3?.productOptionName.name ?? "", wordTable), //옵션타입 3의 명칭
                                    weight: '0', //추가무게
                                    optimg: image ? getValidUploadImageUrl(image) : null, //옵션 이미지}
                                }
                            })
                            return a;
                        }).flat(),
                        data_set: [],
                        // 세트 데이터
                        data_slave: [],
                        data: await Promise.all(productStore.map(async v => {
                            // console.log("카테고리", v.product.category);
                            // if (setDataJson.Category1 === "") throw new Error("세트 정보에 카테고리 데이터가 없습니다. 세트에 카테고리 데이터를 입력해주세요.")

                            const images = JSON.parse(v.product.imageThumbnailData) as string[];
                            const imageInfo = new Array(10).fill(0).map((_, i): Partial<IPADataImagePartial> | null => {
                                if (i > 9) return null;
                                let a: Partial<IPADataImagePartial> = {};
                                let image = images[i] ?? "";
                                if (i === 0 && image === "") image = 'http://prog2.playauto.co.kr/junho/test.png';
                                image = getValidUploadImageUrl(image);
                                a["img" + (i + 1) as keyof IPADataImagePartial] = image;
                                a["img" + (i + 1) + "_blob" as keyof IPADataImagePartial] = image;
                                return a;
                            }).filter((v): v is Partial<IPADataImagePartial> => v !== null).reduce((p, c) => ({ ...p, ...c })) as IPADataImagePartial;

                            //상품판매가 계산
                            let price = Math.round((v.product.price) / 10) * 10;
                            if (shopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
                                const productPrice = Math.round(v.product.price / 10) * 10;
                                const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
                                const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;
                                if (v.product.productOption.some(v2 => v2.price < minRange || v2.price > maxRange)) { //판매가 범위 밖이면
                                    const max = Math.max(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    const min = Math.min(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    price = Math.round(((max - min) * 2) / 10) * 10;
                                }
                            }


                            //카테고리 및 고시정보
                            const siil_data = v.product.siilCode ? JSON.stringify(predefinedSiilData.find(v2 => v2.infoCode === v.product.siilCode)!) :
                                v.product.category?.siilCode ? JSON.stringify(predefinedSiilData.find(v2 => v2.infoCode === v.product.category!.siilCode)!) : JSON.stringify(predefinedSiilData.find(v2 => v2.infoCode === "35")!);
                            //카테고리 고시정보
                            let cate1 = '';
                            let cate2 = '';
                            let cate3 = '';
                            let cate4 = '';
                            let cate_code = '';
                            let cate_code2 = '';
                            let finalCategory = '';
                            if (v.product.categoryCode) { //상품별 카테고리 설정시
                                const category = await ctx.prisma.category.findUnique({ where: { code: v.product.categoryCode } })
                                if (!category) return throwError(errors.etc("해당 카테고리 데이터를 찾을 수 없습니다."), ctx);
                                if (["A077"].includes(shopData.siteCode)) {
                                    finalCategory = category.a077Code;
                                    cate_code = finalCategory;
                                }
                                else if (shopData.siteCode === 'B378') {
                                    finalCategory = category.b378Code.toString();
                                    cate_code = finalCategory;
                                }
                            }
                            cate_code2 = "";
                            // cate_code = [cate4, cate3, cate2, cate1].filter(v => v !== '')[0];
                            cate1 = "";
                            cate2 = "";
                            cate3 = "";
                            cate4 = "";

                            // 쇼핑몰별 세트데이터 전처리
                            let discountAmount = 0;
                            if (shopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
                                const productPrice = Math.round(v.product.price / 10) * 10;
                                const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
                                const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;

                                if (v.product.productOption.some(v2 => v2.price < minRange || v2.price > maxRange)) { //판매가 범위 밖이면
                                    const max = Math.max(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    const min = Math.min(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    discountAmount = Math.round(((max - min) * 2) / 10) * 10 - min;
                                }
                            }

                            return {
                                ...imageInfo,
                                wdate: "2020-11-26 19:43:09", //상품 등록일자
                                edate: "2022-11-26 19:43:09", //상품 만료일자
                                code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
                                name: "SellForYou",
                                name2: "", //홍보문구
                                eng_name: "", //영어상품명
                                china_name: "", //중국어상품명
                                japan_name: "", //일본어상품명
                                bonus: "", //사은품 명칭
                                cate1, //표준 카테고리 대분류
                                cate2, //표준 카테고리 중분류
                                cate3, //표준 카테고리 소분류
                                cate4, //표준 카테고리 세분류
                                cate_code, //표준 카테고리 전체 코드
                                cate_code2, //쇼핑몰별 카테고리 코드
                                tax: "", //과세여부(과세,면세,영세)
                                model: "", //모델명
                                brand: "", //브랜드
                                maker: "상품상세참조", //제조사
                                madein: "해외|아시아|중국", //원산지
                                siil_data,
                                nprice: discountAmount, //시중가
                                wprice1: 0, //원가
                                wprice2: 0, //공급가
                                sprice: price, //판매가
                                buy: 0, //구매수
                                deliv: v.product.localShippingFee > 0 ? "선결제" : "무료", //배송방법(무료,착불,선결제)
                                deliv_fee: v.product.localShippingFee, //배송비
                                stock: 100, //재고
                                misc1: v.product.taobaoProduct.videoUrl ?? "", //기타값1
                                misc2: "", //기타값2
                                misc3: "", //기타값3
                                misc4: "", //기타값4
                                misc5: "", //기타값5
                                made_date: "0000-00-00", //제조일자
                                expr_date: "0000-00-00", //유효일자
                                opt_type: v.product.productOption.length === 0 ? "" : "SELECT", //옵션타입
                                use_addopt: false, //추가구매 옵션 적용여부
                                model_id: "", //옥션, G마켓, 11번가, 인터파크, 스마트스토어 모델 고유코드
                                use_siil_data: true, //품목정보 존재유무
                                use_cert: "A", //인증정보사용여부 A사용함, B:상세설명참조,C사용안함
                                opt_type_select: v.product.productOption.length === 0 ? "" : "SM", //선택형옵션의 상세 독립형:SS, 조합형:SM
                                tmall_catalog_id: "", //11번가 카탈로그
                                inpark_catalog_id: "", //인터파크 카탈로그
                                tmall_catalog_etc: "", //11번가 카탈로그
                                inpark_catalog_etc: "", //인터파크 카탈로그
                                name_short: "", //요약상품명
                                use_optImg: true, //옵션이미지 사용여부
                                weight: 0, //상품무게
                                //상세설명
                                //                                 content: replaceWordTable(`<div style="text-align: center;">
                                // ${userInfo.fixImageTop ? "<img src=\"" + getValidUploadImageUrl(userInfo.fixImageTop) + "\" alt=\"\" />" : ""}
                                // ${await getOptionHeaderHtmlByProductId(ctx.prisma, v.product.id)}
                                // ${/^product\/\d+\/description.html$/.test(v.product.description) ? (await getFromS3(v.product.description)).Body!.toString("utf8") : v.product.description}
                                // ${userInfo.fixImageBottom ? "<img src=\"" + getValidUploadImageUrl(userInfo.fixImageBottom) + "\" alt=\"\" />" : ""}
                                // </div>`, wordTable),
                                content: `<div style="text-align: center;">
${userInfo.fixImageTop ? "<img src=\"" + getValidUploadImageUrl(userInfo.fixImageTop) + "\" alt=\"\" />" : ""}
${await getOptionHeaderHtmlByProductId(ctx.prisma, v.product.id)}
${/^product\/\d+\/description.html$/.test(v.product.description) ? (await getFromS3(v.product.description)).Body!.toString("utf8") : v.product.description}
${userInfo.fixImageBottom ? "<img src=\"" + getValidUploadImageUrl(userInfo.fixImageBottom) + "\" alt=\"\" />" : ""}
</div>`,
                                content2: "", //추가상세설명
                                content3: "", //광고/홍보
                                eng_content: "", //영어 상세설명
                                china_content: "", //중국어 상세설명
                                japan_content: "", //일본어 상세설명
                                catalog_etc: "", //카탈로그 정보(오픈마켓전용)
                                addon_opt: null, //추가구매옵션
                                cert: "cert_02=인증기관=000=구매대행=2019-01-07=2024-10-17=구매대행=kc_02", //인증정보 (엔터 기준(\n)으로 여러 인증정보 복수 적용 가능)
                                model_etc: "", //샵N 모델명
                                eng_keyword: "", //영어 키워드
                                china_keyword: "", //중국어 키워드
                                japan_keyword: "", //일본어 키워드
                                made_country: "", //생산지 국가
                                hs_code: "", //전세계배송코드
                                imgtag: "", //이미지태그
                                site_code: shopData.siteCode, //쇼핑몰 코드
                                site_id: shopData.siteUserId, //쇼핑몰 아이디
                                site_sprice: price, //쇼핑몰 판매가
                                site_stock: v.product.productOption.reduce((p, c) => p + (c.stock ?? 0), 1), //쇼핑몰 재고
                                site_buy: 0, //쇼핑몰 판매수량
                                slave_state: "판매대기", //쇼핑몰별 툴 상품상태('판매대기','판매중','수정대기','취소대기','판매취소','판매종료','판매제외','종료대기','일시품절','재고품절대기','승인대기')
                                slave_state_old: "판매대기", //쇼핑몰별 툴 변경 이전 상품상태('판매대기','판매중','수정대기','취소대기','판매취소','판매종료','판매제외','종료대기','일시품절','재고품절대기','승인대기')
                                slave_state_date: "", //쇼핑몰별 툴 상품상태 변경일
                                slave_wdate: "", //쇼핑몰별 툴 상품등록일
                                slave_reg_edate: "0001-01-01 00:00:00", //쇼핑몰별 상품 판매 종료일
                                slave_reg_code: "",
                                //slave_reg_code: `${prodSlaveCode}`, //쇼핑몰별 사이트 상품코드
                                slave_type: "", //쇼핑몰별 판매방식
                                name3: `${replaceWordTable(v.product.name, wordTable)}`, //상품명
                                deliv2: v.product.localShippingFee > 0 ? "선결제" : "무료", //쇼핑몰별 배송방법('무료','착불','선결제','착불/선결제')
                                deliv_fee2: v.product.localShippingFee, //쇼핑몰별 배송비
                                cate_manual: "",
                                slave_set_data: "",
                                slave_reg_code_sub: "",
                                optImg_URL: null, //옵션이미지(url)
                                result: null, //등록 결과 수신용
                                result_error: null, //등록 결과 수신용
                                result_error_code: null, //등록 결과 수신용
                                keyword1: "",
                                keyword2: "",
                                keyword3: "",
                                keyword4: "",
                                keyword5: "",
                            }
                        })),
                        config: [
                            {
                                ProdUseDenyKeyword: "", //등록 금지 키워드 사용 여부
                                ProdUseDenyKeywordString: "", //등록 금지 키워드 내용 (,로 구분)
                                ProdUseCancelMsg: "", //판매취소 사유 메세지 사용 여부
                                ProdUseCancelMsgString: "", //판매취소 사유 메세지 사용시 메세지 여부
                                ProdSearchDate: "", //상품수집 검색 기간 (년)
                                ProdUseEditImg: "", //수정 후 등록시 이미지도 다시 등록하기 여부
                                OrderSearchDate: "", //주문 및 문의 수집 기간
                            },
                        ],
                    },
                    DataDataSetFileName: "",
                    syncList: "",
                    fromState: "",
                    SetNo: "",
                    Desc: "",
                },
            };
            return JSON.stringify({ job_data: job_json, result_callback_url: `${EXTERNAL_ADDRESS}/playauto/add_job_callback` });
        }
        catch (e) {
            throw e as Error;
        }
    } catch (e) {
        return throwError(e, ctx);
    }
}



export const query_product_store = extendType({
    type: "Query",
    definition(t) {
        t.field("getRegisterProductsDataByUser", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                userShopDataId: nonNull(intArg()),
            },
            resolve: registerProductResolver(null),
        })
    }
});