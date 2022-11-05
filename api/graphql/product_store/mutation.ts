import { shake256 } from "js-sha3";
import { extendType, intArg, list, nonNull } from "nexus";
import { errors, throwError } from "../../utils/error";
import { EXTERNAL_S3_ADDRESS, getFromS3, } from "../../utils/file_manage";
import { predefinedSiilData } from "../siil";
import * as CryptoJS from "crypto-js";
import { IPADataDataSet10, IPADShopInfo, shopDataNameInfo } from "../../playauto_api_type";
import { encodeObjectToKeyEqualsValueNewline, getOptionHeaderHtmlByProductId, sendPlayAutoJob } from "../../utils/local/playauto";
import { ProductStoreStateEnum } from "../enum";
import { Prisma, ProductState } from "@prisma/client";
import { EXTERNAL_ADDRESS } from "../../utils/constants";
import { Context } from "../../types";
import { GraphQLResolveInfo } from "graphql";
import { ArgsValue } from "nexus/dist/core";
import { IWordTable, replaceWordTable } from "../../utils/local/word-replace";
import { copyProductsToUser } from "..";


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

const registerProductResolver = (adminId: number | null) => async (src: {}, args: ArgsValue<"Mutation", "registerProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        if (args.productIds.length === 0) return throwError(errors.etc("상품 ID를 입력하세요."), ctx);
        const product2 = await ctx.prisma.product.findMany({ where: { id: { in: args.productIds } }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } })
        if (product2.length !== args.productIds.length) {
            console.log("ID 비교\n", product2.map(v => v.id), args.productIds);
            return throwError(errors.etc("상품 ID를 확인하세요."), ctx);
        }
        const setData = await ctx.prisma.userSetData.findUnique({ where: { id: args.setDataId }, include: { userShopData: true } });
        if (!setData) return throwError(errors.etc("올바른 세트 데이터가 아닙니다."), ctx);
        const shopData = setData.userShopData;
        const userId = adminId ? setData.userShopData.userId : ctx.token!.userId!;
        if (!adminId && !product2.every(v => v.userId === userId)) return throwError(errors.etc("자신의 상품 ID를 입력하세요."), ctx);
        if (setData.userShopData.userId !== userId) return throwError(errors.etc("올바른 세트 데이터가 아닙니다."), ctx);
        // 중복업로드 막기
        const duplicateUpload = false; //개발용
        const product = duplicateUpload ? product2 : product2.filter(v => v.productStore.every(v2 => v2.userShopDataId !== setData.userShopDataId || v2.storeProductId === null));
        if (product.length === 0) {
            const storeInfo = (await ctx.prisma.userShopData.findUnique({ where: { id: setData.userShopDataId } }))!;
            return throwError(errors.etc(`요청하신 모든 상품이 ${shopDataNameInfo[storeInfo.siteCode]}(ID : ${storeInfo.siteUserId})에 이미 업로드되어 있습니다.`), ctx);
        }

        const setDataJson = JSON.parse((await getFromS3(setData.setFilePath)).Body!.toString("utf8"));

        if (setDataJson.Category1 === "" && !product.every(v => v.categoryCode !== null)) return throwError(errors.etc("카테고리 데이터가 없는 상품이 있습니다."), ctx);

        const wordTable = await ctx.prisma.wordTable.findMany({ where: { userId } });
        const userInfo = await ctx.prisma.userInfo.findUnique({ where: { userId } });
        if (!userInfo) return throwError(errors.etc("해당 유저가 없습니다."), ctx);

        // 복호화
        Object.keys(setData.userShopData).map(v2 => {
            const v = v2 as keyof typeof setData.userShopData;
            if (v.startsWith("siteUser")) {
                if (v === 'siteUserId') return;
                const key = Buffer.from(shake256(userId + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                const code = CryptoJS.AES.decrypt(setData.userShopData[v] as string, key).toString(CryptoJS.enc.Utf8);
                (setData.userShopData[v] as string) = code;
            }
        })

        const initProductStore = await Promise.all(product.map(async v => {
            const existingProductStore = duplicateUpload ? undefined : v.productStore.find(v2 => v2.userShopDataId === setData.userShopDataId && v2.storeProductId)
            if (existingProductStore) {
                return await ctx.prisma.productStore.update({
                    where: { id: existingProductStore.id },
                    data: { state: ProductStoreStateEnum.REGISTER_REQUESTED },
                    include: {
                        product: {
                            include: {
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
                        }
                    }
                })
            }
            return await ctx.prisma.productStore.create({
                data: { productId: v.id, userSetDataId: setData.id, state: ProductStoreStateEnum.REGISTER_REQUESTED, userShopDataId: setData.userShopDataId },
                include: {
                    product: {
                        include: {
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
                    }
                }
            })
        }))

        //금지어 적용
        const productStore = (await Promise.all(initProductStore.map(async v => {
            try {
                v.product.productOption.map(v2 => {
                    return {
                        opt1: truncateOptionName(setData.userShopData.siteCode, ("00" + v2.optionValue1.number).slice(-2) + " " + v2.optionValue1.name, wordTable), //옵션타입1의 옵션명
                        opt2: truncateOptionName(setData.userShopData.siteCode, v2.optionValue2?.name ? ("00" + v2.optionValue2.number).slice(-2) + " " + v2.optionValue2.name : "", wordTable), //옵션타입2의 옵션명
                        opt3: truncateOptionName(setData.userShopData.siteCode, v2.optionValue3?.name ? ("00" + v2.optionValue3.number).slice(-2) + " " + v2.optionValue3.name : "", wordTable), //옵션타입3의 옵션명
                        misc1: truncateOptionName(setData.userShopData.siteCode, v2.optionValue1.productOptionName.name, wordTable), //옵션타입 1의 명칭
                        misc2: truncateOptionName(setData.userShopData.siteCode, v2.optionValue2?.productOptionName.name ?? "", wordTable), //옵션타입 2의 명칭
                        misc3: truncateOptionName(setData.userShopData.siteCode, v2.optionValue3?.productOptionName.name ?? "", wordTable), //옵션타입 3의 명칭
                    }
                })
                // replaceWordTable(`<div style="text-align: center;">${await getOptionHeaderHtmlByProductId(ctx.prisma, v.product.id)}${/^product\/\d+\/description.html$/.test(v.product.description) ? (await getFromS3(v.product.description)).Body!.toString("utf8") : v.product.description}</div>`, wordTable);
                replaceWordTable(v.product.name, wordTable);
            }
            catch (e) {
                const a = e as Error;
                await ctx.prisma.productStore.update({
                    where: { id: v.id },
                    data: {
                        productStoreState: { connect: { id: 3 } },
                        productStoreLog: {
                            create: {
                                jobId: "PREPROCESS",
                                destState: ProductStoreStateEnum.ON_SELL,
                                uploadState: 'FAIL',
                                errorMessage: a.message,
                            }
                        },
                        product: {
                            update: {
                                state: 'UPLOAD_FAILED' as ProductState,
                            }
                        }
                    }
                });
                return null;
            }
            return v;
        }))).filter(<T>(v: T): v is Exclude<T, null> => v !== null);

        if (productStore.length === 0 && initProductStore.length > 0) return throwError(errors.etc("요청하신 모든 상품에 금지단어가 포함되어 작업이 중단되었습니다."), ctx);

        if (shopData.siteCode === 'B378') {
            //배송지, 출고지 조회

            //각각 상품 등록
            const result = await Promise.all(productStore.map(async v => {

            }))
            return '';
        }

        try {
            const job_json: { DShopInfo: IPADShopInfo<IPADataDataSet10> } = {
                DShopInfo: {
                    action: [10], //작업 기본정보 RegistProd(상품등록)
                    account_code: "koozapas@naver.com", //업체코드 또는 업체 ID(발급받아서 입력해주세요)
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
                            if (setData.userShopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
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
                                    opt1: truncateOptionName(setData.userShopData.siteCode, ("00" + v2.optionValue1.number).slice(-2) + " " + v2.optionValue1.name, wordTable), //옵션타입1의 옵션명
                                    opt2: truncateOptionName(setData.userShopData.siteCode, v2.optionValue2?.name ? ("00" + v2.optionValue2.number).slice(-2) + " " + v2.optionValue2.name : "", wordTable), //옵션타입2의 옵션명
                                    opt3: truncateOptionName(setData.userShopData.siteCode, v2.optionValue3?.name ? ("00" + v2.optionValue3.number).slice(-2) + " " + v2.optionValue3.name : "", wordTable), //옵션타입3의 옵션명
                                    price: Math.round((v2.price - price) / 10) * 10, //옵션 추가 가격
                                    stock: v2.stock ?? 0, //옵션 수량
                                    soldout: 0, //품절 여부
                                    wdate: '2020-11-27 08:59:40', //등록일자
                                    misc1: truncateOptionName(setData.userShopData.siteCode, v2.optionValue1.productOptionName.name, wordTable), //옵션타입 1의 명칭
                                    misc2: truncateOptionName(setData.userShopData.siteCode, v2.optionValue2?.productOptionName.name ?? "", wordTable), //옵션타입 2의 명칭
                                    misc3: truncateOptionName(setData.userShopData.siteCode, v2.optionValue3?.productOptionName.name ?? "", wordTable), //옵션타입 3의 명칭
                                    weight: '0', //추가무게
                                    optimg: image ? getValidUploadImageUrl(image) : null, //옵션 이미지}
                                }
                            })
                            return a;
                        }).flat(),
                        data_set: [],
                        // 세트 데이터
                        data_slave: productStore.map(v => {
                            // 쇼핑몰별 세트데이터 전처리
                            const preprocessedSetData = JSON.parse(JSON.stringify(setDataJson));
                            if (setData.userShopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
                                const productPrice = Math.round(v.product.price / 10) * 10;
                                const maxRange = productPrice >= 10000 ? productPrice * 1.5 : productPrice * 2;
                                const minRange = productPrice < 2000 ? 0 : productPrice * 0.5;

                                //세트정보의 카테고리 데이터 없애기
                                preprocessedSetData["key_custom_cate_use"] = undefined;
                                preprocessedSetData["key_ep1_txtCategory"] = ["", ""];
                                preprocessedSetData["CatMenu_0"] = undefined;
                                preprocessedSetData["CatMenu_1"] = undefined;
                                preprocessedSetData["CatMenu_2"] = undefined;
                                preprocessedSetData["CatMenu_3"] = undefined;
                                preprocessedSetData["Category1"] = "";
                                preprocessedSetData["Category2"] = "";
                                preprocessedSetData["key_ep1_txtAsrtCode"] = "";
                                preprocessedSetData["key_cate1"] = "";
                                preprocessedSetData["key_cate2"] = "";
                                preprocessedSetData["key_cate3"] = "";
                                preprocessedSetData["key_cate4"] = "";
                                preprocessedSetData["asrt_lname"] = "";
                                preprocessedSetData["asrt_mname"] = "";
                                preprocessedSetData["asrt_sname"] = "";
                                preprocessedSetData["asrt_dname"] = "";
                                preprocessedSetData["mall_cate_name"] = "";

                                if (v.product.productOption.some(v2 => v2.price < minRange || v2.price > maxRange)) { //판매가 범위 밖이면
                                    const max = Math.max(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    const min = Math.min(...v.product.productOption.map(v2 => Math.round((v2.price) / 10) * 10));
                                    const discountAmount = Math.round(((max - min) * 2) / 10) * 10 - min;

                                    preprocessedSetData["key_SellerDiscount_YN"] = "Y";
                                    preprocessedSetData["key_SellerPcDiscount_YN"] = "Y";
                                    preprocessedSetData["key_SellerMoDiscount_YN"] = "Y";
                                    preprocessedSetData["key_SellerDiscount_Amount"] = discountAmount.toString();
                                    preprocessedSetData["key_SellerDiscount_WP"] = "W";
                                    preprocessedSetData["key_SellerDiscount_StartDate"] = "";
                                    preprocessedSetData["key_SellerDiscount_date_StHH"] = "0";
                                    preprocessedSetData["key_SellerDiscount_EndDate"] = "";
                                    preprocessedSetData["key_SellerPcDiscount_date_StMM"] = "00";
                                    preprocessedSetData["key_SellerPcDiscount_date_EnHH"] = "0";
                                    preprocessedSetData["key_SellerPcDiscount_date_EnMM"] = "09";
                                    preprocessedSetData["key_SellerMoDiscount_Amount"] = discountAmount.toString();
                                    preprocessedSetData["key_SellerMoDiscount_WP"] = "W";
                                    preprocessedSetData["key_SellerMoDiscount_StartDate"] = "";
                                    preprocessedSetData["key_SellerMoDiscount_date_StHH"] = "00";
                                    preprocessedSetData["key_SellerMoDiscount_date_StMM"] = "00";
                                    preprocessedSetData["key_SellerMoDiscount_EndDate"] = "";
                                    preprocessedSetData["key_SellerMoDiscount_date_EnHH"] = "00";
                                    preprocessedSetData["key_SellerMoDiscount_date_EnMM"] = "09";
                                }
                            }
                            return {
                                code: v.product.productCode, //마스터 상품코드(작업대상 상품별 고유 코드)
                                //세트정보
                                set_data: encodeObjectToKeyEqualsValueNewline(preprocessedSetData),
                            }
                        }),
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
                            if (setData.userShopData.siteCode === 'A077') { //스마트스토어 할인금액 설정
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
                                if (["A077"].includes(setData.userShopData.siteCode)) {
                                    // console.log(v);
                                    // let categoryStore = await ctx.prisma.categoryStore.findFirst({
                                    //     where: {
                                    //         acode: setData.userShopData.siteCode,
                                    //         ccode: category[setData.userShopData.siteCode.toLowerCase() + 'Code' as 'b378Code']
                                    //     }
                                    // });
                                    // if (!categoryStore) {
                                    //     categoryStore = await ctx.prisma.categoryStore.findFirst({
                                    //         where: {
                                    //             acode: setData.userShopData.siteCode,
                                    //             pcode: category.code
                                    //         }
                                    //     });
                                    // }
                                    // if (!categoryStore) return throwError(errors.etc("해당 카테고리 데이터와 매칭되는 스토어 카테고리 데이터를 찾을 수 없습니다."), ctx);
                                    finalCategory = category.a077Code;
                                    // const categoryArray = category.code.split("_");
                                    // cate1 = categoryArray[0];
                                    // cate2 = categoryArray[1];
                                    // cate3 = categoryArray[2] ?? "";
                                    // cate4 = categoryArray[3] ?? "";
                                    // cate_code = categoryArray.reverse().filter(v => v !== '')[0];

                                    cate1 = "";
                                    cate2 = "";
                                    cate3 = "";
                                    cate4 = "";
                                    cate_code = finalCategory;
                                }
                            }
                            if (cate_code === '' && setDataJson.Category1 !== '') {
                                cate1 = v.product.category?.c1 ?? setDataJson.key_cate1; //표준 카테고리 대분류
                                cate2 = v.product.category?.c2 ?? setDataJson.key_cate2; //표준 카테고리 중분류
                                cate3 = v.product.category?.c3 ?? setDataJson.key_cate3; //표준 카테고리 소분류
                                cate4 = v.product.category?.c4 ?? setDataJson.key_cate4; //표준 카테고리 세분류
                                cate_code = v.product.categoryCode ?? setDataJson.Category1; //표준 카테고리 전체 코드
                                cate_code2 = v.product.categoryCode ?? setDataJson.Category1; //쇼핑몰별 카테고리 코드
                            }
                            cate_code2 = "";
                            // cate_code = [cate4, cate3, cate2, cate1].filter(v => v !== '')[0];
                            cate1 = "";
                            cate2 = "";
                            cate3 = "";
                            cate4 = "";


                            // cate1 = cate_code === cate1 ? cate_code : cate1;
                            // cate2 = cate_code === cate2 ? cate_code : cate2;
                            // cate3 = cate_code === cate3 ? cate_code : cate3;
                            // cate4 = cate_code === cate4 ? cate_code : cate4;


                            // cate4 = v.product.category?.c4 ?? setDataJson.key_cate4; //표준 카테고리 세분류
                            // cate_code = v.product.category?.c4 ?? setDataJson.key_cate4; //표준 카테고리 세분류
                            // cate_code2 = v.product.category?.c4 ?? setDataJson.key_cate4; //표준 카테고리 세분류

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
                                tax: setDataJson.key_tax, //과세여부(과세,면세,영세)
                                model: "", //모델명
                                brand: "", //브랜드
                                maker: "상품상세참조", //제조사
                                madein: "해외|아시아|중국", //원산지
                                siil_data,
                                nprice: 0, //시중가
                                wprice1: 0, //원가
                                wprice2: 0, //공급가
                                sprice: price, //판매가
                                buy: 0, //구매수
                                deliv: v.product.localShippingFee > 0 ? "선결제" : "무료", //배송방법(무료,착불,선결제)
                                deliv_fee: v.product.localShippingFee, //배송비
                                stock: 100, //재고
                                misc1: "", //기타값1
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
                                //상품이미지(파일명)
                                // img1: v.product.taobaoProduct.imageThumbnail === '' ? 'http://prog2.playauto.co.kr/junho/test.png' : v.product.taobaoProduct.imageThumbnail,
                                // img2: "",
                                // img3: "",
                                // img4: "",
                                // img5: "",
                                // img6: '',
                                // img7: '',
                                // img8: '',
                                // img9: '',
                                // img10: '',
                                // img1_blob: v.product.taobaoProduct.imageThumbnail === '' ? 'http://prog2.playauto.co.kr/junho/test.png' : v.product.taobaoProduct.imageThumbnail,
                                // img2_blob: "",
                                // img3_blob: "",
                                // img4_blob: "",
                                // img5_blob: "",
                                // img6_blob: "",
                                // img7_blob: "",
                                // img8_blob: "",
                                // img9_blob: "",
                                // img10_blob: "",
                                //상품이미지(URL)
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
                    SetNo: setData.id.toString(),
                    Desc: setData.name,
                },
            };
            const rea = await sendPlayAutoJob<typeof job_json>({
                job_cate: "PROD",
                job_name: "TEST 12345",
                job_type: "RegistProd",
                site_code: shopData.siteCode,
                site_id: shopData.siteUserId,
                site_name: shopDataNameInfo[shopData.siteCode],
                sol_user: userId.toString(),
            }, job_json, `${EXTERNAL_ADDRESS}/playauto/add_job_callback`);
            console.log("addJob result :", rea);
            // await Promise.all(productStore.map(async v => {
            //     await ctx.prisma.productStoreLog.create({
            //         data: {
            //             jobId: rea.job_id.toString(),
            //             destState: ProductStoreStateEnum.REGISTER_REQUESTED,
            //             productStoreId: v.id,
            //             uploadState: 'WAIT',
            //         }
            //     })
            // }))
            await ctx.prisma.product.updateMany({ where: { id: { in: productStore.map(v => v.productId) } }, data: { state: "UPLOAD_WAITING" } });
            return `상품 ${product2.length}개 중 ${product.length}개의 등록 요청이 완료되었습니다.`;


        }
        catch (e) {
            await ctx.prisma.productStore.deleteMany({ where: { id: { in: productStore.map(v => v.id) } } })
            throw e as Error;
        }
    } catch (e) {
        return throwError(e, ctx);
    }
}


export const mutation_product_store = extendType({
    type: "Mutation",
    definition(t) {
        t.field("registerProductByUser", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                setDataId: nonNull(intArg()),
            },
            resolve: registerProductResolver(null)
        })
        t.field("registerProductsByUser", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                setDataIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const resultArray: string[] = [];
                    for (const v of args.setDataIds) {
                        try {
                            const result = await registerProductResolver(null)(src, { productIds: args.productIds, setDataId: v }, ctx, info);
                            resultArray.push(result);
                        }
                        catch (e) {
                            const error = e as Error;
                            resultArray.push(error.message);
                        }
                    }
                    console.log("registerProductsByUser result", { args: JSON.stringify(args), result: resultArray.join('\n') })
                    return resultArray.join('\n');
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("registerProductsByAdmin", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                setDataIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                const setData = await ctx.prisma.userSetData.findMany({ where: { id: { in: args.setDataIds } }, select: { id: true, userShopData: { select: { userId: true } } } });
                const userIds = [...new Set(setData.map(v => v.userShopData.userId))];

                const targetProducts = await ctx.prisma.product.findMany({
                    where: { id: { in: args.productIds }, userId: { equals: null } },
                    select: { id: true, taobaoProductId: true }
                });

                const productResults = await Promise.all(userIds.map(async userId => {
                    const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    else if (user.state !== 'ACTIVE') return throwError(errors.etc("해당 유저가 없습니다."), ctx);

                    const existingProducts = await ctx.prisma.product.findMany({
                        where: {
                            userId: { equals: userId },
                            taobaoProductId: { in: targetProducts.map(v => v.taobaoProductId) }
                        },
                        select: { taobaoProductId: true }
                    });
                    const filteredTargetProducts = targetProducts.filter(v => existingProducts.findIndex(v2 => v2.taobaoProductId === v.taobaoProductId) === -1);

                    if (targetProducts.length > 0 && filteredTargetProducts.length === 0) return { userId, products: [] };
                    const newProduct = await copyProductsToUser(filteredTargetProducts.map(v => v.id), ctx, userId);
                    return { userId, products: newProduct }

                }))

                const resultArray: string[] = [];

                for (const v of setData) {
                    const productIds = productResults.find(v2 => v2.userId === v.userShopData.userId)!.products.map(v => v.id);

                    try {
                        const result = await registerProductResolver(ctx.token!.adminId!)(src, { productIds, setDataId: v.id }, ctx, info)
                        resultArray.push(result);
                    }
                    catch (e) {
                        const error = e as Error;
                        resultArray.push(error.message);
                    }
                }

                return resultArray.join('\n');
            }
        })
    }
});
