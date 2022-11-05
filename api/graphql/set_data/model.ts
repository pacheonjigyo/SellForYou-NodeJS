import { shake256 } from "js-sha3";
import { objectType } from "nexus";
import { throwError } from "../../utils/error";
import * as CryptoJS from "crypto-js";
import { decrypt } from "../../utils/helpers";


export const t_SetData = objectType({
    name: "UserSetData",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.setFilePath();
        t.model.userShopDataId();
        t.model.userShopData();
    }
});

export const t_UserShopData = objectType({
    name: "UserShopData",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.siteCode();
        t.model.siteUserId();
        t.model.siteUserPw({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUserPw;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "Pw");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "Pw");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc1({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc1;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc1");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc1");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc2({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc2;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc2");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc2");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc3({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc3;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc3");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc3");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc4({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc4;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc4");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc4");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc5({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc5;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc5");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc5");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.siteUseretc6({
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    const siteUseretc = (src as any).siteUseretc6;
                    if (ctx.token?.userId === src.userId) {
                        return decrypt(siteUseretc, ctx.token!.userId! + process.env.CODE_SECRET + "etc6");
                    }
                    else if (ctx.token?.adminId) {
                        return decrypt(siteUseretc, src.userId + process.env.CODE_SECRET + "etc6");
                    }
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.user();
        t.model.userSetData();
    }
});

export const t_SetParamType = objectType({
    name: "SetParamType",
    definition(t) {
        t.nonNull.string("userCode");
        t.nonNull.string("sol_type");
        t.nonNull.string("siteCode");
        t.nonNull.string("number");
        t.nonNull.string("siteUserId");
        t.nonNull.string("siteUserPw");
        t.nonNull.string("siteUseretc1");
        t.nonNull.string("siteUseretc2");
        t.nonNull.string("siteUseretc3");
        t.nonNull.string("siteUseretc4");
        t.nonNull.string("siteUseretc5");
        t.nonNull.string("siteUseretc6");
        t.string("encodedSetInfo", { description: "수정용" });
    }
});