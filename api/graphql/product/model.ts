import deepmerge from "deepmerge";
import { arg, inputObjectType, intArg, list, nonNull, objectType } from "nexus";
import { SiilEncodedSavedData } from "..";
import { errors, throwError } from "../../utils/error";
import { getOptionHeaderHtmlByProductId } from "../../utils/local/playauto";

export const t_Product = objectType({
    name: "Product",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.adminId();
        t.model.taobaoProductId();
        t.model.productCode();
        t.model.state();
        t.model.name();
        t.model.isNameTranslated();
        t.model.isImageTranslated();
        t.model.price();
        t.model.localShippingFee();
        t.model.description();
        t.model.createdAt();
        t.model.modifiedAt();
        t.model.stockUpdatedAt();
        t.model.categoryCode();
        t.model.siilCode();
        t.model.imageThumbnailData();
        t.field("imageThumbnail", {
            type: nonNull(list(nonNull("String"))),
            resolve: async (src, args, ctx, info) => {
                try {
                    return JSON.parse(src.imageThumbnailData)
                } catch (e) {
                    return [];
                    // return throwError(e, ctx);
                }
            }
        });
        t.model.siilData();
        t.field("siilInfo", {
            type: "SiilSavedData",
            resolve: async (src, args, ctx, info) => {
                try {
                    if (src.siilData) {
                        const info = JSON.parse(src.siilData) as SiilEncodedSavedData;
                        return { code: info.c, data: info.d.map(v => ({ code: v.c, value: v.v })) }
                    }
                    return null;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.category();
        t.model.taobaoProduct();
        t.model.user();
        t.model.admin();
        t.model.productOption({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ optionString: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.productOptionName({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ order: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.productStore({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.field("optionInfoHtml", {
            type: nonNull("String"),
            resolve: async (src, args, ctx, info) => {
                try {
                    const id = src.id;
                    return await getOptionHeaderHtmlByProductId(ctx.prisma, id);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.marginRate();
        t.model.cnyRate();
        t.model.shippingFee();
    }
});

export const t_ProductOption = objectType({
    name: "ProductOption",
    definition(t) {
        t.model.id();
        t.model.productId();
        t.model.optionValue1Id();
        t.model.optionValue2Id();
        t.model.optionValue3Id();
        t.field("name", {
            type: nonNull("String"),
            resolve: async (src, args, ctx, info) => {
                try {
                    const optionValues = await ctx.prisma.productOptionValue.findMany({
                        where: { id: { in: [src.optionValue1Id, src.optionValue2Id ?? -1, src.optionValue3Id ?? -1] } },
                        include: { productOptionName: true }
                    });
                    optionValues.sort((a, b) => a.optionNameOrder - b.optionNameOrder);
                    // return optionValues.reduce((p, c) => p + `${c.productOptionName.name}${("00" + c.number).slice(-2)}_`, "").slice(0, -1) + " => " + optionValues.reduce((p, c) => p + `${c.productOptionName.name}:${c.name}, `, "").slice(0, -2);
                    return optionValues.reduce((p, c) => p + `${c.productOptionName.name}:${c.name}, `, "").slice(0, -2);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.model.isActive();
        t.model.taobaoSkuId();
        t.model.priceCny();
        t.model.price();
        t.model.stock();
        t.model.optionString();
        t.model.optionValue1();
        t.model.optionValue2();
        t.model.optionValue3();
        t.model.product();
    }
});

export const t_ProductOptionName = objectType({
    name: "ProductOptionName",
    definition(t) {
        t.model.id();
        t.model.productId();
        t.model.order();
        t.model.name();
        t.model.isNameTranslated();
        t.model.taobaoPid();
        t.model.product();
        t.model.productOptionValue({
            filtering: true,
            ordering: true,
            pagination: true,
            resolve: async (src, args, ctx, info, ori) => {
                try {
                    args.orderBy = [{ number: "asc" }, ...(args.orderBy ?? [])]
                    return ori(src, args, ctx, info);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});


export const t_ProductOptionValue = objectType({
    name: "ProductOptionValue",
    definition(t) {
        t.model.id();
        t.model.productOptionNameId();
        t.model.optionNameOrder();
        t.model.name();
        t.model.isNameTranslated();
        t.model.taobaoVid();
        t.model.image();
        t.model.number();
        t.model.productOptionName();
        t.field("productOption", {
            type: nonNull(list(nonNull("ProductOption"))),
            args: {
                where: arg({ type: "ProductOptionWhereInput" }),
                orderBy: list(arg({ type: "ProductOptionOrderByWithRelationInput" })),
                take: intArg(),
                skip: intArg(),
                cursor: arg({ type: "ProductOptionWhereUniqueInput" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const a = src.optionNameOrder;
                    args.where = deepmerge<typeof args.where>(args.where, a === 1 ? { optionValue1Id: { equals: src.id } } : a === 2 ? { optionValue2Id: { equals: src.id } } : { optionValue3Id: { equals: src.id } });

                    // return ctx.prisma.productOptionValue.findUnique({ where: { id: src.id } }).productOption1({
                    //     where: args.where,
                    //     orderBy: args.orderBy || undefined,
                    //     take: args.take || undefined,
                    //     skip: args.skip || undefined,
                    //     cursor: args.cursor || undefined,
                    // })

                    return ctx.prisma.productOption.findMany({
                        where: args.where,
                        orderBy: args.orderBy,
                        skip: args.skip,
                        take: args.take,
                        cursor: args.cursor,
                    } as any)
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.productOption1({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.productOption2({
            filtering: true,
            ordering: true,
            pagination: true,
        });
        t.model.productOption3({
            filtering: true,
            ordering: true,
            pagination: true,
        });
    }
});


export const t_ProductOptionUpdateInput = inputObjectType({
    name: "ProductOptionUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.int("price");
        t.nonNull.boolean("isActive")
    }
});
export const t_ProductOptionNameUpdateInput = inputObjectType({
    name: "ProductOptionNameUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
    }
});
export const t_ProductOptionValueUpdateInput = inputObjectType({
    name: "ProductOptionValueUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("name");
        t.string("image")
        t.upload("newImage")
        t.string("newImageBase64")
    }
});
export const t_ProductOptionValueImageUpdateInput = inputObjectType({
    name: "ProductOptionValueImageUpdateInput",
    definition(t) {
        t.nonNull.int("id");
        t.string("image")
        t.string("newImageBase64")
    }
});
export const t_ProductThumbnailUpdateInput = inputObjectType({
    name: "ProductThumbnailUpdateInput",
    definition(t) {
        t.nonNull.string("defaultImage");
        t.upload("uploadImage");
    }
});
export const t_ProductThumbnailImageUpdateInput = inputObjectType({
    name: "ProductThumbnailImageUpdateInput",
    definition(t) {
        t.nonNull.string("defaultImage");
        t.string("uploadImageBase64");
    }
});