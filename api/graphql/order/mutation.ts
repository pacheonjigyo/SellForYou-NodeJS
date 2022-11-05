import { shake256 } from "js-sha3";
import { arg, booleanArg, extendType, intArg, list, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import { getFromS3, } from "../../utils/file_manage";
import { predefinedSiilData } from "../siil";
import * as CryptoJS from "crypto-js";
import { IPADataDataSet10, IPADataDataSet3, IPADShopInfo, shopDataNameInfo } from "../../playauto_api_type";
import { encodeObjectToKeyEqualsValueNewline, getOptionHeaderHtmlByProductId, sendPlayAutoJob } from "../../utils/local/playauto";
import { ProductStoreStateEnum } from "../enum";
import { Prisma } from "@prisma/client";
import { getPurchaseInfo } from "..";
import { EXTERNAL_ADDRESS } from "../../utils/constants";


export const mutation_order = extendType({
    type: "Mutation",
    definition(t) {
        t.field("scrapOrderByUser", {
            type: nonNull("String"),
            args: {
                shopDataId: nonNull(intArg()),
                collectNewOrder: nonNull(booleanArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const shopData = await ctx.prisma.userShopData.findUnique({ where: { id: args.shopDataId } });
                    if (!shopData || shopData.userId !== ctx.token!.userId!) return throwError(errors.etc("올바른 사이트 아이디 데이터가 아닙니다."), ctx);


                    // 복호화
                    Object.keys(shopData).map(v2 => {
                        const v = v2 as keyof typeof shopData;
                        if (v.startsWith("siteUser")) {
                            if (v === 'siteUserId') return;
                            const key = Buffer.from(shake256(ctx.token!.userId! + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                            const code = CryptoJS.AES.decrypt(shopData[v] as string, key).toString(CryptoJS.enc.Utf8);
                            (shopData[v] as string) = code;
                        }
                    })

                    const job_json: { DShopInfo: IPADShopInfo<IPADataDataSet3> } = {
                        DShopInfo: {
                            action: [3], //작업 기본정보 ScrapOrder(주문수집)
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
                            prod_codes: [], // 마스터 상품코드(작업대상 상품별 고유 코드)
                            //각 작업별 데이터 (DataDataSet)
                            DataDataSet: {
                                api: [{
                                    amp_key: "",
                                    amp_program_code: "koozapas@naver.com", //발급받아서 입력해주세요
                                    amp_program_type: "TEST", //발급받아서 입력해주세요
                                    amp_program_homedir: "",
                                    amp_program_homeurl: "",
                                }],
                                confirm_order: [{
                                    confirm_doit: args.collectNewOrder,
                                    // confirm_doit: false,
                                }],
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
                            SetNo: "testdata",
                            Desc: "세트명: test",
                        },
                    };
                    const rea = await sendPlayAutoJob<typeof job_json>({
                        job_cate: "ORDER",
                        job_name: `${args.shopDataId}`,
                        job_type: "ScrapOrder",
                        site_code: shopData.siteCode,
                        site_id: shopData.siteUserId,
                        site_name: shopDataNameInfo[shopData.siteCode],
                        sol_user: ctx.token!.userId!.toString(),
                    }, job_json, `${EXTERNAL_ADDRESS}/playauto/add_job_order_callback`);
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
                    return `주문수집 요청이 완료되었습니다.`;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("changeOrderStateByUser", {
            type: nonNull("String"),
            args: {
                orderIds: nonNull(list(nonNull(stringArg()))),
                destState: nonNull(arg({ type: "OrderState" })),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.destState === 'NEW') return throwError(errors.etc("신규 상태로 변경할 수 없습니다."), ctx);
                    // const purchaseInfo = await getPurchaseInfo(ctx.prisma, ctx.token!.userId!);
                    if (!ctx.token?.level) return throwError(errors.higherLevelRequired, ctx);
                    if (ctx.token.level.level !== 2) return throwError(errors.etc("2단계 이용자만 주문 상태를 변경할 수 있습니다."), ctx);
                    const result = await ctx.prisma.order.updateMany({
                        where: {
                            userShopData: { userId: { equals: ctx.token!.userId! } },
                            id: { in: args.orderIds },
                            state: 'NEW',
                        },
                        data: {
                            state: args.destState
                        }
                    })
                    if (result.count === args.orderIds.length) return `선택하신 ${args.orderIds.length}개의 주문의 상태가 변경되었습니다.`;
                    return `선택하신 ${args.orderIds.length}개의 주문 중 ${result.count}개의 상태가 변경되었습니다.`;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});