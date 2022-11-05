import { extendType, intArg, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import * as CryptoJS from "crypto-js";
import { shake256 } from "js-sha3";
import { shopDataEtcInfo } from "../../playauto_api_type";

export const mutation_set_data = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createShopDataByUser", {
            type: nonNull("UserShopData"),
            args: {
                siteCode: nonNull(stringArg()),
                siteUserId: nonNull(stringArg()),
                siteUserPw: nonNull(stringArg()),
                siteUseretc1: nonNull(stringArg()),
                siteUseretc2: nonNull(stringArg()),
                siteUseretc3: nonNull(stringArg()),
                siteUseretc4: nonNull(stringArg()),
                siteUseretc5: nonNull(stringArg()),
                siteUseretc6: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const shopDataEtcIndex = shopDataEtcInfo.findIndex(v => v[0] === args.siteCode);
                    if (shopDataEtcIndex === -1) return throwError(errors.etc("쇼핑몰 코드가 잘못되었습니다."), ctx);
                    if (/ /.test(args.siteUserId)) return throwError(errors.etc("쇼핑몰 아이디의 공백을 제거해 주세요."), ctx);
                    if (args.siteUserId === "") return throwError(errors.etc("쇼핑몰 아이디를 입력하세요."), ctx);
                    if (args.siteUserPw === "") return throwError(errors.etc("쇼핑몰 비밀번호를 입력하세요."), ctx);
                    const existingId = await ctx.prisma.userShopData.findUnique({ where: { UQ_user_shop_data_unique: { siteCode: args.siteCode, siteUserId: args.siteUserId, userId: ctx.token!.userId! } } });
                    if (existingId) return throwError(errors.etc("입력한 계정과 동일한 계정이 있습니다."), ctx);
                    let etcInfo: string | null = null;
                    Object.keys(args).forEach(v => {
                        if (v.startsWith("siteUser")) {
                            if (v === 'siteUserId') return;
                            if (v.length === 12) {
                                const index = parseInt(v.slice(-1));
                                if (args.siteCode === "A077") {
                                    if (v === "siteUseretc6") { //스마트스토어 예외
                                        if (args[v] !== "" && args[v] !== "naver") return throwError(errors.etc("스마트스토어의 etc6은 빈값 혹은 \"naver\"만 넣어주세요."), ctx);
                                    }
                                    if (v === "siteUseretc2") { //스마트스토어 예외 (도메인 ID는 내부용이지만 우리쪽에서도 필요)
                                        etcInfo = args[v];
                                        // args[v] = "";
                                    }
                                }
                                else if (shopDataEtcInfo[shopDataEtcIndex][index] !== "" && args[v as keyof typeof args] === "") {
                                    return throwError(errors.etc(`etc${index}에 필요한 ${shopDataEtcInfo[shopDataEtcIndex][index]} 정보가 누락되었습니다.`), ctx);
                                }
                            }
                            const key = Buffer.from(shake256(ctx.token!.userId! + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                            const code = CryptoJS.AES.encrypt(args[v as keyof typeof args], key).toString();
                            args[v as keyof typeof args] = code;
                        }
                    })
                    const result = await ctx.prisma.userShopData.create({ data: { ...args, userId: ctx.token!.userId!, etc: etcInfo } });
                    return result;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateShopDataByUser", {
            type: nonNull("UserShopData"),
            args: {
                userShopDataId: nonNull(intArg()),
                siteUserId: stringArg(),
                siteUserPw: stringArg(),
                siteUseretc1: stringArg(),
                siteUseretc2: stringArg(),
                siteUseretc3: stringArg(),
                siteUseretc4: stringArg(),
                siteUseretc5: stringArg(),
                siteUseretc6: stringArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    type ArgKey = keyof typeof args;
                    const shopData = await ctx.prisma.userShopData.findUnique({ where: { id: args.userShopDataId } });
                    if (!shopData) return throwError(errors.noSuchData, ctx);
                    const shopDataEtcIndex = shopDataEtcInfo.findIndex(v => v[0] === shopData.siteCode);
                    if (args.siteUserId && args.siteUserId.trim() !== args.siteUserId) return throwError(errors.etc("쇼핑몰 아이디의 공백을 제거해 주세요."), ctx);
                    if (args.siteUserId === "") return throwError(errors.etc("쇼핑몰 아이디를 입력하세요."), ctx);
                    if (args.siteUserPw === "") return throwError(errors.etc("쇼핑몰 비밀번호를 입력하세요."), ctx);
                    let etcInfo: string | null = null;
                    Object.keys(args).forEach(v2 => {
                        const v = v2 as ArgKey;
                        if (v === "userShopDataId") return;
                        if (!args[v]) {
                            args[v] = undefined;
                            return;
                        }
                        if (v.startsWith("siteUser")) {
                            if (v === 'siteUserId') return;
                            if (v.length === 12) {
                                const index = parseInt(v.slice(-1));
                                if (shopData.siteCode === "A077") { //스마트스토어 예외
                                    if (v === "siteUseretc6") {
                                        if (args[v] !== "" && args[v] !== "naver") return throwError(errors.etc("스마트스토어의 etc6은 빈값 혹은 \"naver\"만 넣어주세요."), ctx);
                                    }
                                    if (v === "siteUseretc2") { //스마트스토어 예외 (도메인 ID는 내부용이지만 우리쪽에서도 필요)
                                        etcInfo = args[v] as string;
                                        // args[v] = "";
                                    }
                                }
                                else if (shopDataEtcInfo[shopDataEtcIndex][index] !== "" && args[v] === "") {
                                    return throwError(errors.etc(`etc${index}에 필요한 ${shopDataEtcInfo[shopDataEtcIndex][index]} 정보가 누락되었습니다.`), ctx);
                                }
                            }
                            const key = Buffer.from(shake256(ctx.token!.userId! + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                            const code = CryptoJS.AES.encrypt(args[v]!, key).toString();
                            args[v] = code;
                        }
                    })
                    const { userShopDataId: id, ...data } = args as { userShopDataId: number } & { [K in Exclude<ArgKey, "userShopDataId">]: string | undefined };
                    const result = await ctx.prisma.userShopData.update({ where: { id }, data: { ...data, etc: etcInfo, modifiedAt: new Date() } });
                    return result;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("addSetDataByUser", {
            type: nonNull("UserShopData"),
            args: {
                siteCode: nonNull(stringArg()),
                siteUserId: nonNull(stringArg()),
                siteUserPw: nonNull(stringArg()),
                siteUseretc1: nonNull(stringArg()),
                siteUseretc2: nonNull(stringArg()),
                siteUseretc3: nonNull(stringArg()),
                siteUseretc4: nonNull(stringArg()),
                siteUseretc5: nonNull(stringArg()),
                siteUseretc6: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const shopDataEtcIndex = shopDataEtcInfo.findIndex(v => v[0] === args.siteCode);
                    if (shopDataEtcIndex === -1) return throwError(errors.etc("쇼핑몰 코드가 잘못되었습니다."), ctx);
                    if (args.siteUserId.trim() !== args.siteUserId) return throwError(errors.etc("쇼핑몰 아이디의 공백을 제거해 주세요."), ctx);
                    if (args.siteUserId === "") return throwError(errors.etc("쇼핑몰 아이디를 입력하세요."), ctx);
                    if (args.siteUserId === "") return throwError(errors.etc("쇼핑몰 비밀번호를 입력하세요."), ctx);
                    Object.keys(args).forEach(v => {
                        if (v.startsWith("siteUser")) {
                            if (v === 'siteUserId') return;
                            if (v.length === 12) {
                                const index = parseInt(v.slice(-1));
                                if (args.siteCode === "A077" && v === "siteUseretc6") { //스마트스토어 예외
                                    if (args[v] !== "" && args[v] !== "naver") return throwError(errors.etc("스마트스토어의 etc6은 빈값 혹은 \"naver\"만 넣어주세요."), ctx);
                                }
                                else if (shopDataEtcInfo[shopDataEtcIndex][index] !== "" && args[v as keyof typeof args] === "") {
                                    return throwError(errors.etc(`etc${index}에 필요한 ${shopDataEtcInfo[shopDataEtcIndex][index]} 정보가 누락되었습니다.`), ctx);
                                }
                            }
                            const key = Buffer.from(shake256(ctx.token!.userId! + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                            const code = CryptoJS.AES.encrypt("", key).toString();
                            args[v as keyof typeof args] = code;
                        }
                    })
                    const result = await ctx.prisma.userShopData.create({ data: { ...args, userId: ctx.token!.userId! } });
                    return result;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});