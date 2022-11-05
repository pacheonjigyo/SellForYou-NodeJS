import { UserLog } from "@prisma/client";
import { withFilter } from "apollo-server-express";
import { extendType, intArg, nonNull } from "nexus";
import { Context } from "nexus-plugin-prisma/typegen";
import { throwError, errors } from "../../utils/error";
import { withCancel } from "../../utils/helpers";


export const subscription_taobao_order = extendType({
    type: "Subscription",
    definition(t) {
        t.field("subscribeTaobaoOrderQueueEventByAdmin", {
            type: nonNull('Int'),
            subscribe: withFilter(
                (root, args, ctx: Context) => {
                    if (!ctx.token?.adminId) return throwError(errors.etc("잘못된 접근입니다."), null);
                    console.log("connect subscribeTaobaoOrderQueueEventByAdmin : ", { adminId: ctx.token.adminId });
                    // if (args.chatRoom !== 0) new Promise(async () => {
                    //     try {
                    //     }
                    //     catch (e) { }
                    // });
                    const onCancel = (ctx: Context, adminId: number) => {
                        console.log("disconnect subscribeTaobaoOrderQueueEventByAdmin : ", { adminId });
                        // new Promise(async () => {
                        //     try {s
                        //     }
                        //     catch (e) { }
                        // });
                    }
                    return withCancel(ctx.pubsub.asyncIterator(`admin_toq`), onCancel.bind(null, ctx, ctx.token.adminId));
                },
                (payload: UserLog, args: {}, ctx: Context, info) => {
                    // payload : publish한 메시지 내용
                    // args : 해당 subscription args
                    return ctx.token?.userId === payload.userId;
                }
            ),
            resolve: async (payload: number, args, ctx, info) => {
                try {
                    //console.log("update", payload);
                    // ctx.prisma.userLog.update({ where: { id: payload.id }, data: { isRead: true } }).then(() => { });
                    return payload;
                } catch (error) {
                    return throwError(error, ctx);
                }
            }
        })
    }
});