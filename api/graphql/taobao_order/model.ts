import { objectType } from "nexus";


export const t_TaobaoOrder = objectType({
    name: "TaobaoOrder",
    definition(t) {
        t.model.id();
        t.model.taobaoId();
        t.model.taobaoOrderNum();
        t.model.state();
        t.model.logisticCompany();
        t.model.waybill();
        t.model.buyerMessage();
        t.model.realMoney();
        t.model.originalData();
        t.model.createdAt();
        t.model.modifiedAt();
        t.model.order();
    }
});