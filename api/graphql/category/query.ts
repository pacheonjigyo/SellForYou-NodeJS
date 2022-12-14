import { extendType, intArg, list, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";

export const query_category = extendType({
    type: "Query",
    definition(t) {
        t.crud.categories({
            alias: "selectCategoriesBySomeone",
            filtering: true,
            ordering: true,
            pagination: true,
        })
        t.field("searchCategoriesBySomeone", {
            type: nonNull(list(nonNull("Category"))),
            args: {
                keyword: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const a = await ctx.prisma.category.findMany({
                        where: {
                            OR: [
                                { c1Name: { contains: args.keyword } },
                                { c2Name: { contains: args.keyword } },
                                { c3Name: { contains: args.keyword } },
                                { c4Name: { contains: args.keyword } },
                            ]
                        },
                        orderBy: { id: "asc" }
                    });
                    return a;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("selectCategoriesByHierarchicalBySomeone", {
            type: nonNull(list(nonNull("CategorySelectType"))),
            args: {
                code: stringArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const splitedCode = args.code?.split("_");
                    // if (splitedCode?.some(v => v.length !== 8)) return throwError(errors.etc("잘못된 코드입니다."), ctx);
                    // if (splitedCode?.length === 4) return throwError(errors.etc("최하단 항목입니다."), ctx);
                    if (splitedCode?.length === 4) return [];
                    const byCondition = "c" + ((splitedCode?.length ?? 0) + 1) as "c1" | "c2" | "c3" | "c4";
                    const byConditionName = "c" + ((splitedCode?.length ?? 0) + 1) + "Name" as "c1Name" | "c2Name" | "c3Name" | "c4Name";
                    // const where = args.depth === 1 ? undefined : args.depth === 2 ? { c1: args.cn! } : args.depth === 3 ? { c2: args.cn! } : { c3: args.cn! }
                    const a = await ctx.prisma.category.groupBy({
                        by: [byCondition, byConditionName], _count: { _all: true }, where: {
                            c1: splitedCode ? splitedCode[0] : "",
                            c2: splitedCode ? splitedCode[1] : "",
                            c3: splitedCode ? splitedCode[2] : "",
                            c4: splitedCode ? splitedCode[3] : "",
                        }
                    });
                    const result = await Promise.all(a.map(async v => {
                        if (v._count._all === 1) {
                            const currentCode = [...(splitedCode ?? []), v[byCondition]]
                            const category = await ctx.prisma.category.findFirst({
                                where: {
                                    c1: currentCode ? currentCode[0] : "",
                                    c2: currentCode ? currentCode[1] : "",
                                    c3: currentCode ? currentCode[2] : "",
                                    c4: currentCode ? currentCode[3] : "",
                                }
                            })
                            // console.log("categ", currentCode, category)
                            return { code: category!.code, name: category![byConditionName] }
                        }
                        return {
                            code: (args.code ?? "") + (args.code ? "_" : "") + v[byCondition],
                            name: v[byConditionName],
                        }
                    }));
                    // console.log(args, Array.from(new Set(result)));
                    return Array.from(new Set(result));
                    // return throwError(errors.etc("Awdawd"), null);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});