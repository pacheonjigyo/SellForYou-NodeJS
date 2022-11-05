import { PrismaClient } from ".prisma/client";
import { decorateType, enumType, inputObjectType, nonNull, objectType } from "nexus";
import { PurchaseLogPlanInfoType } from "..";
import { NexusGenAllTypes } from "../../typegen";
import { throwError } from "../../utils/error";

export const getPurchaseInfo = async (prisma: PrismaClient, userId: number): Promise<NexusGenAllTypes["UserPurchaseInfo"]> => {
    if (!userId) return { level: 0, levelExpiredAt: new Date(9990, 11, 31), additionalInfo: [] };
    const purchaseInfos = await prisma.purchaseLog.findMany({ where: { userId, state: "ACTIVE", expiredAt: { gte: new Date() } } });
    const processedInfos = purchaseInfos.map(v => ({ ...v, planInfo: JSON.parse(v.planInfo) as PurchaseLogPlanInfoType }))
        .sort((a, b) => (b.planInfo.planLevel ?? 0) - (a.planInfo.planLevel ?? 0));

    const additionalInfo: NexusGenAllTypes["UserPurchaseAdditionalInfo"][] = [];
    const imageTranslate = processedInfos.find(v => v.planInfo.externalFeatureVariableId === 'IMAGE_TRANSLATE');
    const stock = processedInfos.find(v => v.planInfo.externalFeatureVariableId === 'STOCK');
    if (imageTranslate) {
        additionalInfo.push({ type: "IMAGE_TRANSLATE", expiredAt: imageTranslate.expiredAt });
    }
    if (stock) {
        additionalInfo.push({ type: "STOCK", expiredAt: stock.expiredAt });
    }
    //결제 플랜 계산
    const levelInfo = processedInfos.find(v => v.planInfo.planLevel);
    if (!levelInfo) return { level: 0, levelExpiredAt: new Date(9990, 11, 31), additionalInfo };
    return { level: levelInfo.planInfo.planLevel!, levelExpiredAt: levelInfo.expiredAt, additionalInfo };
}

export const t_User = objectType({
    name: "User",
    definition(t) {
        t.model.id();
        t.model.email();
        t.field("password", {
            type: "String",
            resolve: () => ""
        })
        t.model.state();
        t.model.naverId();
        t.model.kakaoId();
        t.model.createdAt();
        t.model.product({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.companyInfo();
        t.model.userInfo();
        t.model.userShopData({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.userLog({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.nonNull.field("purchaseInfo", {
            type: nonNull("UserPurchaseInfo"),
            resolve: async (src, args, ctx, info) => {
                try {
                    return getPurchaseInfo(ctx.prisma, src.id);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.nonNull.int("productCount", {
            resolve: async (src, args, ctx, info) => {
                try {
                    return ctx.prisma.product.count({ where: { userId: src.id } })
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});


export const t_UserInfo = objectType({
    name: "UserInfo",
    definition(t) {
        t.model.userId();
        t.model.phone();
        t.model.marginRate();
        t.model.defaultShippingFee();
        t.model.refundAccountInfoData();
        t.field("refundAccountInfo", {
            type: "AccountInfo",
            resolve: async (src, args, ctx, info) => {
                try {
                    if (src.refundAccountInfoData) {
                        return JSON.parse(src.refundAccountInfoData)
                    }
                    return null;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.fixImageTop();
        t.model.fixImageBottom();
        t.model.cnyRate();
        t.model.codeFile();
        t.model.user();
        t.model.productCollectCount();
        t.model.maxProductLimit();
        t.model.additionalShippingFeeJeju();
        t.model.asTel();
        t.model.asInformation();
        t.model.refundShippingFee();
        t.model.exchangeShippingFee();
    }
});

export const t_UserCompanyInfo = objectType({
    name: "UserCompanyInfo",
    definition(t) {
        t.model.userId();
        t.model.name();
        t.model.code();
        t.model.ownerName();
        t.model.user();
    }
});
export const t_AccountInfo = objectType({
    name: "AccountInfo",
    definition(t) {
        t.nonNull.string("bankName");
        t.nonNull.string("accountHolder");
        t.nonNull.string("accountNumber");
    }
});

export const t_UserPurchaseInfo = objectType({
    name: "UserPurchaseInfo",
    definition(t) {
        t.nonNull.int("level");
        t.nonNull.date("levelExpiredAt");
        t.nonNull.list.nonNull.field("additionalInfo", {
            type: "UserPurchaseAdditionalInfo"
        });
    }
});

export const enum_UserPurchaseAdditionalInfoEnum = enumType({
    name: "UserPurchaseAdditionalInfoEnumType",
    members: ["IMAGE_TRANSLATE", "STOCK"]
})

export const t_UserPurchaseAdditionalInfo = objectType({
    name: "UserPurchaseAdditionalInfo",
    definition(t) {
        t.nonNull.field("type", { type: 'UserPurchaseAdditionalInfoEnumType' });
        t.nonNull.date("expiredAt");
    }
});

export const t_AccountInfoInput = inputObjectType({
    name: "AccountInfoInput",
    definition(t) {
        t.nonNull.string("bankName");
        t.nonNull.string("accountHolder");
        t.nonNull.string("accountNumber");
    }
});

export const t_UserCompanyInfoInput = inputObjectType({
    name: "UserCompanyInfoInput",
    definition(t) {
        t.nonNull.string("name");
        t.nonNull.string("code");
        t.nonNull.string("ownerName");
    }
});

export interface UserLogPayload {
    type: "scrapOrder" | "registerProduct" | "getTaobaoItem" | "purchaseRenewed" | "updateProductImage";
    title: string;
    // 아래부터는 optional

    /**
     * type이 "purchaseRenewed"인 경우에는 필수로 들어감
     *
     * @author Kuhave
     * @memberof UserLogPayload
     */
    renewedAccessToken?: string;
}

export const t_UserLog = objectType({
    name: "UserLog",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.title();
        t.model.payloadData();
        t.model.isRead();
        t.model.createdAt();
        t.model.user();
    }
});