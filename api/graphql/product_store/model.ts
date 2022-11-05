import { objectType } from "nexus";
import { shopDataUrlInfo } from "../../playauto_api_type";
import { throwError } from "../../utils/error";


export const t_ProductStore = objectType({
    name: "ProductStore",
    definition(t) {
        t.model.id();
        t.model.productId();
        t.model.userSetDataId();
        t.model.state();
        t.model.productStoreState();
        t.model.storeProductId();
        t.model.product();
        t.model.userSetData();
        t.model.userShopData();
        t.model.userShopDataId();
        t.model.productStoreLog({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.etcVendorItemId();
        t.string("storeUrl", {
            resolve: async (src, args, ctx, info) => {
                try {
                    if (!src.storeProductId) return null;
                    const shopInfo = await ctx.prisma.userShopData.findFirst({ where: { id: src.userShopDataId } });
                    if (!shopInfo) return null;
                    return shopDataUrlInfo[shopInfo.siteCode]({ id: src.storeProductId, storeName: shopInfo.etc, vendorId: src.etcVendorItemId });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});

export const t_ProductStoreState = objectType({
    name: "ProductStoreState",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.description();
    }
});

export const t_ProductStoreLog = objectType({
    name: "ProductStoreLog",
    definition(t) {
        t.model.id();
        t.model.productStoreId();
        t.model.jobId();
        t.model.destState();
        t.model.uploadState();
        t.model.errorMessage();
        t.model.createdAt();
        t.model.modifiedAt();
        t.model.productStoreState();
        t.model.productStore();
    }
});