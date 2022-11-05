import { extendType, nonNull } from "nexus";
import { errors, throwError } from "../../utils/error";

export const query_taobao_order = extendType({
    type: "Query",
    definition(t) {
        // t.field("selectRemainingTaobaoOrderQueueCountByAdmin", {
        //     type: nonNull("Int"),
        //     resolve: async (src, args, ctx, info) => {
        //         try {
        //             return await ctx.prisma.taobaoOrderQueue.count();
        //         } catch (e) {
        //             return throwError(e, ctx);
        //         }
        //     }
        // })
        // t.crud.taobaoOrderQueues({
        //     alias: "selectTaobaoOrderQueuesByAdmin",
        //     filtering: true,
        //     ordering: true,
        //     pagination: true,
        // })
        t.crud.taobaoOrders({
            alias: "selectTaobaoOrdersByAdmin",
            filtering: true,
            ordering: true,
            pagination: true,
        })
    }
});