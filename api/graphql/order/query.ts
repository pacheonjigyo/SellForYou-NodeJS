import { extendType } from "nexus";
import { errors, throwError } from "../../utils/error";
import deepmerge from "deepmerge";

export const query_order = extendType({
    type: "Query",
    definition(t) {
        t.crud.orders({
            alias: "selectOrdersByUser",
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.where = deepmerge<typeof args.where>(args.where, { userShopData: { userId: { equals: ctx.token!.userId! } } })
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});