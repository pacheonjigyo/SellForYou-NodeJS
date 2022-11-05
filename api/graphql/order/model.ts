import { objectType } from "nexus";
import { shopDataUrlInfo } from "../../playauto_api_type";
import { throwError } from "../../utils/error";


export const t_Order = objectType({
    name: "Order",
    definition(t) {
        t.model.id();
        t.model.userShopDataId();
        t.model.state();
        t.model.orderProductNumber();
        t.model.storeProductId();
        t.model.orderState();
        t.model.productName();
        t.model.optionName();
        t.model.quantity();
        t.model.productId();
        t.model.payPrice();
        t.model.shippingFee();
        t.model.buyerName();
        t.model.receiverName();
        t.model.customId();
        t.model.isCustomIdValid();
        t.model.orderedAt();
        t.model.deliveryExpiredAt();
        t.model.originalData();
        t.model.sellerProductCode();
        t.model.product();
        t.model.userShopData();
        t.string("storeUrl", {
            resolve: async (src, args, ctx, info) => {
                try {
                    const shopInfo = await ctx.prisma.userShopData.findUnique({ where: { id: src.userShopDataId } });
                    if (!shopInfo) return null;
                    // 주문에 대해서는 쿠팡 관련해서 아직 어떻게 할 지 모름
                    return shopDataUrlInfo[shopInfo.siteCode]({ id: src.storeProductId, storeName: shopInfo.etc });
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});