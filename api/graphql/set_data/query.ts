import { UserShopData } from ".prisma/client";
import deepmerge from "deepmerge";
import { extendType, intArg, nonNull } from "nexus";
import { errors, throwError } from "../../utils/error";
import { getEncodedSetData } from "../../utils/local/playauto";
import * as CryptoJS from "crypto-js";
import { shake256 } from "js-sha3";

export const query_set_data = extendType({
    type: "Query",
    definition(t) {
        t.crud.userShopData({
            alias: "selectMyShopDataByUser",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userId: { equals: ctx.token!.userId! } });
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.crud.userSetData({
            alias: "selectMySetDataByUser",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userShopData: { userId: { equals: ctx.token!.userId! } } });
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("getUserSetObjectByUser", {
            type: nonNull("SetParamType"),
            description: "생성 시 : userShopDataId만, 수정 시 : userSetDataId만 (동시에 넣지 말 것)",
            args: {
                userShopDataId: intArg(),
                userSetDataId: intArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (!args.userSetDataId === !args.userShopDataId) return throwError(errors.etc("userShopDataId,userSetDataId 중 하나만 넣어주세요."), ctx);
                    let encodedSetInfo: string | null = null;
                    let userShopDataId = args.userShopDataId ?? 0;
                    if (args.userSetDataId) {
                        const setData = await ctx.prisma.userSetData.findUnique({ where: { id: args.userSetDataId } });
                        if (!setData) return throwError(errors.noSuchData, ctx);
                        encodedSetInfo = await getEncodedSetData(setData.setFilePath);
                        userShopDataId = setData.userShopDataId;
                    }
                    const shopData = await ctx.prisma.userShopData.findUnique({ where: { id: userShopDataId } });
                    if (!shopData) return throwError(errors.noSuchData, ctx);
                    if (!shopData.isActive) return throwError(errors.etc("비활성화된 계정입니다."), ctx);
                    if (shopData.userId !== ctx.token!.userId!) return throwError(errors.forbiddenForData, ctx);
                    Object.keys(shopData).forEach(v => {
                        if (v.startsWith("siteUser")) {
                            if (v === 'siteUserId') return;
                            const key = Buffer.from(shake256(ctx.token!.userId! + process.env.CODE_SECRET + v.slice(8), 192), "hex").toString("base64");
                            (shopData[v as keyof UserShopData] as string) = CryptoJS.AES.decrypt(shopData[v as keyof UserShopData] as string, key).toString(CryptoJS.enc.Utf8);
                        }
                    });
                    const key = Buffer.from(shake256(process.env.CODE_SECRET, 192), "hex").toString("base64");
                    // console.log(process.env.CODE_SECRET, key);
                    const numberString = CryptoJS.AES.encrypt(JSON.stringify({ userId: shopData.userId, userSetDataId: args.userSetDataId ?? undefined, userShopDataId: shopData.id }), key).toString();
                    return {
                        number: encodeURIComponent("1" + numberString), siteCode: shopData.siteCode, siteUserId: shopData.siteUserId, siteUserPw: shopData.siteUserPw,
                        siteUseretc1: shopData.siteUseretc1,
                        siteUseretc2: shopData.siteUseretc2,
                        siteUseretc3: shopData.siteUseretc3,
                        siteUseretc4: shopData.siteUseretc4,
                        siteUseretc5: shopData.siteUseretc5,
                        siteUseretc6: shopData.siteUseretc6,
                        sol_type: "TEST",
                        userCode: "", //반환이 안 와서 못씀
                        encodedSetInfo
                    }
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.crud.userShopData({
            alias: "selectShopDataByAdmin",
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.field("selectShopDataCountByAdmin", {
            type: "Int",
            args: {
                where: "UserShopDataWhereInput"
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    return ctx.prisma.userShopData.count({ where: args.where as any });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.crud.userSetData({
            alias: "selectSetDataByAdmin",
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.field("selectSetDataCountByAdmin", {
            type: "Int",
            args: {
                where: "UserSetDataWhereInput"
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    return ctx.prisma.userSetData.count({ where: args.where as any });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});