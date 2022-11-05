import { UserLog } from "@prisma/client";
import { withFilter } from "apollo-server-express";
import { extendType, intArg, nonNull } from "nexus";
import { Context } from "nexus-plugin-prisma/typegen";
import { throwError, errors } from "../../utils/error";
import { withCancel } from "../../utils/helpers";


export const subscription_user = extendType({
    type: "Subscription",
    definition(t) {
        t.field("subscribeUserEvent", {
            type: 'UserLog',
            subscribe: withFilter(
                (root, args, ctx: Context) => {
                    if (!ctx.token?.userId) return throwError(errors.etc("잘못된 접근입니다."), null);
                    // console.log("connect subscribeUserEvent : ", { userId: ctx.token.userId });
                    // if (args.chatRoom !== 0) new Promise(async () => {
                    //     try {
                    //     }
                    //     catch (e) { }
                    // });
                    return withCancel(ctx.pubsub.asyncIterator(`user_${ctx.token.userId}`), () => {
                        // console.log("disconnect subscribeUserEvent : ", { userId: ctx.token?.userId });
                        // new Promise(async () => {
                        //     try {s
                        //     }
                        //     catch (e) { }
                        // });
                    });
                },
                (payload: UserLog, args: {}, ctx: Context, info) => {
                    // payload : publish한 메시지 내용
                    // args : 해당 subscription args
                    return ctx.token?.userId === payload.userId;
                }
            ),
            resolve: async (payload: UserLog, args, ctx, info) => {
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