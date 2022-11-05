import { GraphQLResolveInfo } from "graphql";
import { arg, extendType, floatArg, intArg, list, nonNull, stringArg } from "nexus";
import { ArgsValue } from "nexus/dist/core";
import { Context } from "../../types";
import { errors, throwError } from "../../utils/error";
import { uploadToS3AvoidDuplicate, uploadToS3AvoidDuplicateByBuffer, uploadToS3WithEditor } from "../../utils/file_manage";
import { calculatePrice } from "../../utils/local/calculate-product-price";
import { publishUserLogData } from "../../utils/local/pubsub";
import { SiilEncodedSavedData, siilInfo } from "../siil";


const updateProductResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        if (!product) return throwError(errors.noSuchData, ctx);
        if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
        if (args.categoryCode) {
            const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
            if (!category) return throwError(errors.etc("잘못된 카테고리입니다."), ctx);
            // const splitedCode = args.categoryCode.split("_");
            // if (splitedCode.length !== 4 || splitedCode.some(v => v.length !== 2)) return throwError(errors.etc("잘못된 카테고리입니다."), ctx);
            if (product.productStore.find(v => v.storeProductId !== null)) return throwError(errors.etc("스토어에 등록된 상품은 카테고리를 변경할 수 없습니다."), ctx);
        }
        if (args.siilCode) {
            if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
        }
        // if (!!args.siilCode !== !!args.siilData) return throwError(errors.etc("상품고시정보를 모두 입력해주세요."), ctx);
        // if (args.siilData && args.siilCode) {
        //     const siilCodeInfo = siilInfo.find(v => v.infoCode === "01");
        //     if (!siilCodeInfo) return throwError(errors.etc("잘못된 코드입니다."), ctx);
        //     if (siilCodeInfo.data.flatMap(v => v.data).length !== args.siilData.length) return throwError(errors.etc("입력되지 않은 상품고시정보가 있습니다."), ctx);
        // }
        const siil: SiilEncodedSavedData | null = (args.siilCode && args.siilData) ? { c: args.siilCode, d: args.siilData!.map(v => ({ c: v.code, v: v.value })) } : null;
        // if (product.userId !== ctx.token!.userId!) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
        if (args.options.length !== product.productOption.length) return throwError(errors.etc("모든 옵션을 입력하세요."), ctx);
        if (args.optionNames.length !== product.productOptionName.length) return throwError(errors.etc("모든 옵션 범주을 입력하세요."), ctx);
        if (args.optionValues.length !== product.productOptionName.flatMap(v => v.productOptionValue).length) return throwError(errors.etc("모든 옵션 범주별 값을 입력하세요."), ctx);
        const optionIdArray = Array.from(new Set(args.options.map(v => v.id))).sort();
        const productOptionIdArray = Array.from(new Set(product.productOption.map(v => v.id))).sort();
        if (!optionIdArray.reduce((p, c, i) => p && c === productOptionIdArray[i], true)) return throwError(errors.etc("상품의 옵션 id가 매칭되지 않습니다."), ctx);
        //옵션가 검사
        const productPrice = Math.round((args.price ?? product.price) / 10) * 10;
        console.log(productPrice, args.options)
        if (args.options.length > 0 && !args.options.some(v => (Math.round(v.price / 10) * 10) === productPrice)) return throwError(errors.etc("옵션가 중 최소 하나는 상품가와 일치해야 합니다."), ctx);
        await Promise.all(args.options.map(async v => {
            await ctx.prisma.productOption.update({ where: { id: v.id }, data: { price: Math.round(v.price / 10) * 10, isActive: v.isActive } });
        }))
        await Promise.all(args.optionNames.map(async v => {
            await ctx.prisma.productOptionName.update({ where: { id: v.id }, data: { name: v.name.trim(), } });
        }))
        for (let v of args.optionValues) {
            let image = v.image ?? undefined;
            if (v.newImage) {
                image = await uploadToS3AvoidDuplicate(v.newImage, ["product", product.id]);
            }
            await ctx.prisma.productOptionValue.update({ where: { id: v.id }, data: { name: v.name.trim(), image } });
        }
        let imageThumbnailData = product.imageThumbnailData;
        if (args.thumbnails && args.thumbnails.length > 0) {
            let imageArray: string[] = [];
            for (let v of args.thumbnails) {
                let image = v.defaultImage;
                if (v.uploadImage) {
                    image = await uploadToS3AvoidDuplicate(v.uploadImage, ["product", product.id]);
                }
                //썸네일 https 수정
                imageArray.push(image.replace(/^https?:/, "http:"));
            }
            imageThumbnailData = JSON.stringify(imageArray);
        }
        const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
        const result = await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                name: args.name ?? undefined,
                price: args.price ? (Math.round(args.price / 10) * 10) : undefined,
                description: description,
                localShippingFee: args.localShippingFee ? (Math.round(args.localShippingFee / 100) * 100) : undefined,
                categoryCode: args.categoryCode ?? undefined,
                siilData: siil === null ? null : JSON.stringify(siil),
                siilCode: args.siilCode ?? undefined,
                imageThumbnailData
            }
        });
        return result;

    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateProductNameResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductNameByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productOption: true, productOptionName: { include: { productOptionValue: true } } } });
        if (!product) return throwError(errors.noSuchData, ctx);
        if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
        if (args.name.trim().length === 0) return throwError(errors.etc("이름을 입력하세요."), ctx);
        const result = await ctx.prisma.product.update({
            where: { id: product.id }, data: {
                name: args.name.trim(),
            }
        });
        return result;

    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductCategoryResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductCategoryByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const category = await ctx.prisma.category.findUnique({ where: { code: args.categoryCode } });
        if (!category) return throwError(errors.etc("잘못된 카테고리입니다."), ctx);
        // const splitedCode = args.categoryCode.split("_");
        // if (splitedCode.length !== 4 || splitedCode.some(v => v.length !== 2)) return throwError(errors.etc("잘못된 카테고리입니다."), ctx);
        const result = await ctx.prisma.product.updateMany({
            where: { userId: ctx.token!.userId, id: { in: args.productIds }, productStore: { none: { storeProductId: { not: null } } } },
            data: { categoryCode: args.categoryCode }
        });
        return result.count;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateManyProductSiilInfoResolver = async (src: {}, args: ArgsValue<"Mutation", "updateManyProductSiilInfoByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        if (siilInfo.findIndex(v => v.infoCode === args.siilCode) === -1) return throwError(errors.etc("잘못된 상품고시정보입니다."), ctx);
        const result = await ctx.prisma.product.updateMany({ where: { userId: ctx.token!.userId, id: { in: args.productIds } }, data: { siilCode: args.siilCode } });
        return result.count;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const deleteProductResolver = async (src: {}, args: ArgsValue<"Mutation", "deleteProductByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const product = await ctx.prisma.product.findUnique({
            where: { id: args.productId },
            select: { id: true, userId: true, productStore: true, productOptionName: { select: { id: true } } }
        });
        if (!product) return throwError(errors.noSuchData, ctx);
        if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 삭제할 수 없습니다."), ctx);
        // if (product.productStore.length > 0) return throwError(errors.etc("스토어에 등록된 상품은 삭제할 수 없습니다."), ctx);
        { //스토어 등록된 상품 삭제부분
            await ctx.prisma.productStoreLog.deleteMany({ where: { productStoreId: { in: product.productStore.map(v => v.id) } } });
            await ctx.prisma.productStore.deleteMany({ where: { id: { in: product.productStore.map(v => v.id) } } });
        }
        await ctx.prisma.productOption.deleteMany({ where: { productId: product.id } });
        await ctx.prisma.productOptionValue.deleteMany({ where: { productOptionNameId: { in: product.productOptionName.map(v => v.id) } } });
        await ctx.prisma.productOptionName.deleteMany({ where: { productId: product.id } });
        await ctx.prisma.product.delete({ where: { id: product.id } });

        return true;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const updateProductPriceResolver = async (src: {}, args: ArgsValue<"Mutation", "updateProductPriceByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const boundCalculatePrice = (cnyPrice: number) => calculatePrice.bind(null, cnyPrice, args.marginRate, args.cnyRate, args.shippingFee)();
        const products = await ctx.prisma.product.findMany({
            where: { userId: ctx.token!.userId, id: { in: args.productIds } },
            select: { id: true, productOption: { select: { id: true, priceCny: true } }, taobaoProduct: { select: { price: true } } }
        });
        await Promise.all(products.map(async v => {
            // console.log("상품 가격", boundCalculatePrice(v.taobaoProduct.price))
            await ctx.prisma.product.update({
                where: { id: v.id },
                data: {
                    price: boundCalculatePrice(v.taobaoProduct.price),
                    cnyRate: args.cnyRate,
                    marginRate: args.marginRate,
                    shippingFee: args.shippingFee,
                }
            });
            await Promise.all(v.productOption.map(async v => {
                // console.log(boundCalculatePrice(v.priceCny));
                await ctx.prisma.productOption.update({ where: { id: v.id }, data: { price: boundCalculatePrice(v.priceCny) } });
            }))
            return 0;
        }))

        return products.length;
    } catch (e) {
        return throwError(e, ctx);
    }
}

const endProductSellStateResolver = async (src: {}, args: ArgsValue<"Mutation", "endProductSellStateByUser">, ctx: Context, info: GraphQLResolveInfo) => {
    try {
        const products = await ctx.prisma.product.updateMany({ where: { userId: ctx.token!.userId, id: { in: args.productIds } }, data: { state: "SELL_DONE" } });
        return products.count;
    } catch (e) {
        return throwError(e, ctx);
    }
}


export async function copyProductsToUser(targetProductIds: number[], ctx: Context, userId: number) {
    const targetProducts = await ctx.prisma.product.findMany({
        where: { id: { in: targetProductIds } },
        include: {
            productOption: {
                include: { optionValue1: true, optionValue2: true, optionValue3: true }
            },
            productOptionName: { include: { productOptionValue: true } },
            taobaoProduct: { select: { taobaoNumIid: true } }
        }
    });
    return await Promise.all(targetProducts.map(async (product) => {
        const { taobaoProduct, productOption, productOptionName, ...data } = product;
        let newProduct = await ctx.prisma.product.create({
            data: {
                ...data,
                state: 'COLLECTED',
                userId: userId,
                adminId: ctx.token!.adminId!,
                productCode: "",
                id: undefined,
                createdAt: new Date(),
                modifiedAt: new Date(),
                stockUpdatedAt: new Date(),
            }
        });
        newProduct = await ctx.prisma.product.update({ where: { id: newProduct.id }, data: { productCode: "SFY_" + newProduct.id.toString(36) + "_" + taobaoProduct.taobaoNumIid } });

        const newProductOptionName = await Promise.all(productOptionName.map(async (v) => {
            return await ctx.prisma.productOptionName.create({
                data: {
                    productId: newProduct.id,
                    order: v.order,
                    name: v.name,
                    taobaoPid: v.taobaoPid,
                    isNameTranslated: v.isNameTranslated,
                    hasImage: v.hasImage,
                    productOptionValue: {
                        createMany: {
                            data: v.productOptionValue.map(v => {
                                const { id, productOptionNameId, ...etc } = v;
                                return etc;
                            })
                        }
                    }
                },
                include: { productOptionValue: true }
            });
        }));

        await ctx.prisma.productOption.createMany({
            data: product.productOption.map(productOption => {
                const { optionValue1, optionValue2, optionValue3, ...etc } = productOption;
                return {
                    ...etc,
                    id: undefined,
                    productId: newProduct.id,
                    optionValue1Id: newProductOptionName.find(v => v.order === 1)!.productOptionValue.find(v => v.taobaoVid === productOption.optionValue1.taobaoVid)!.id,
                    optionValue2Id: newProductOptionName.find(v => v.order === 2)?.productOptionValue.find(v => v.taobaoVid === productOption.optionValue2?.taobaoVid)?.id ?? null,
                    optionValue3Id: newProductOptionName.find(v => v.order === 3)?.productOptionValue.find(v => v.taobaoVid === productOption.optionValue3?.taobaoVid)?.id ?? null,
                };
            })
        });
        return newProduct;
    }));
}


export const mutation_product = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateProductImageBySomeone", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                description: stringArg(),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueImageUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailImageUpdateInput" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    // if (1) return throwError(errors.etc("작업중입니다."), ctx);
                    const product = await ctx.prisma.product.findUnique({ where: { id: args.productId }, include: { productStore: true, productOption: true, productOptionName: { include: { productOptionValue: true } } } });
                    if (!product) return throwError(errors.noSuchData, ctx);
                    if (product.isImageTranslated) return throwError(errors.etc("이미 번역된 상품입니다."), ctx);

                    if (ctx.token?.userId && product.userId !== ctx.token.userId) return throwError(errors.etc("해당 상품을 수정할 수 없습니다."), ctx);
                    const productOptionValues = product.productOptionName.flatMap(v => v.productOptionValue);
                    if (args.optionValues.some(v => productOptionValues.findIndex(v2 => v2.id === v.id) === -1)) return throwError(errors.etc("해당 상품의 옵션이 아닌 옵션값이 있습니다."), ctx);

                    for (let v of args.optionValues) {
                        let image = v.image;
                        if (v.newImageBase64) {
                            const base64str = v.newImageBase64;
                            const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                            if (res) {
                                const [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                                image = await uploadToS3AvoidDuplicateByBuffer(buffer, `option_${v.id}_.${mimetype.slice(mimetype.indexOf("/") + 1, 10)}`, mimetype, ["product", product.id]);
                            }
                            else {
                                image = undefined;
                            }
                        }
                        await ctx.prisma.productOptionValue.update({ where: { id: v.id }, data: { image } });
                    }
                    let imageThumbnailData = product.imageThumbnailData;
                    if (args.thumbnails && args.thumbnails.length > 0) {
                        let imageArray: string[] = [];
                        for (let v of args.thumbnails) {
                            let image: string | undefined = v.defaultImage;
                            if (v.uploadImageBase64) {
                                const base64str = v.uploadImageBase64;
                                const res = base64str.match(/data:(image\/.*?);base64,(.*)/);
                                if (res) {
                                    const [mimetype, buffer] = [res[1], Buffer.from(res[2], "base64")];
                                    image = await uploadToS3AvoidDuplicateByBuffer(buffer, `thumbnail.${mimetype.slice(mimetype.indexOf("/") + 1, 10)}`, mimetype, ["product", product.id]);
                                }
                            }
                            //썸네일 https 수정
                            imageArray.push(image.replace(/^https?:/, "http:"));
                        }
                        imageThumbnailData = JSON.stringify(imageArray);
                    }
                    const description = args.description ? await uploadToS3WithEditor(args.description, ["product", product.id], "description") : undefined;
                    const result = await ctx.prisma.product.update({
                        where: { id: product.id }, data: {
                            isImageTranslated: true,
                            description: description,
                            imageThumbnailData
                        }
                    });
                    if (ctx.token?.userId) {
                        publishUserLogData(ctx, { type: "updateProductImage", title: `상품 ID ${result.productCode}의 정보가 수정되었습니다.` });
                    }
                    return result;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("updateProductByUser", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: stringArg(),
                price: intArg(),
                description: stringArg(),
                localShippingFee: floatArg(),
                options: nonNull(list(nonNull(arg({ type: "ProductOptionUpdateInput" })))),
                optionNames: nonNull(list(nonNull(arg({ type: "ProductOptionNameUpdateInput" })))),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
                categoryCode: stringArg(),
                siilCode: stringArg(),
                siilData: list(nonNull(arg({ type: "SiilInput" }))),
            },
            resolve: updateProductResolver
        })
        t.field("updateProductNameByUser", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            resolve: updateProductNameResolver
        })
        t.field("updateManyProductCategoryByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                categoryCode: nonNull(stringArg()),
            },
            resolve: updateManyProductCategoryResolver
        })
        t.field("updateManyProductSiilInfoByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                siilCode: nonNull(stringArg()),
            },
            resolve: updateManyProductSiilInfoResolver
        })
        t.field("deleteProductByUser", {
            type: nonNull("Boolean"),
            args: {
                productId: nonNull(intArg())
            },
            resolve: deleteProductResolver
        })
        t.field("updateProductPriceByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                cnyRate: nonNull(floatArg()),
                marginRate: nonNull(floatArg()),
                shippingFee: nonNull(intArg()),
            },
            resolve: updateProductPriceResolver
        })
        t.field("endProductSellStateByUser", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg())))
            },
            resolve: endProductSellStateResolver
        })
        ////////////////////////////////////
        t.field("updateProductByAdmin", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: stringArg(),
                price: intArg(),
                description: stringArg(),
                localShippingFee: floatArg(),
                options: nonNull(list(nonNull(arg({ type: "ProductOptionUpdateInput" })))),
                optionNames: nonNull(list(nonNull(arg({ type: "ProductOptionNameUpdateInput" })))),
                optionValues: nonNull(list(nonNull(arg({ type: "ProductOptionValueUpdateInput" })))),
                thumbnails: list(nonNull(arg({ type: "ProductThumbnailUpdateInput" }))),
                categoryCode: stringArg(),
                siilCode: stringArg(),
                siilData: list(nonNull(arg({ type: "SiilInput" }))),
            },
            resolve: updateProductResolver
        })
        t.field("updateProductNameByAdmin", {
            type: nonNull("Product"),
            args: {
                productId: nonNull(intArg()),
                name: nonNull(stringArg()),
            },
            resolve: updateProductNameResolver
        })
        t.field("updateManyProductCategoryByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                categoryCode: nonNull(stringArg()),
            },
            resolve: updateManyProductCategoryResolver
        })
        t.field("updateManyProductSiilInfoByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                siilCode: nonNull(stringArg()),
            },
            resolve: updateManyProductSiilInfoResolver
        })
        t.field("deleteProductByAdmin", {
            type: nonNull("Boolean"),
            args: {
                productId: nonNull(intArg())
            },
            resolve: deleteProductResolver
        })
        t.field("updateProductPriceByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                cnyRate: nonNull(floatArg()),
                marginRate: nonNull(floatArg()),
                shippingFee: nonNull(intArg()),
            },
            resolve: updateProductPriceResolver
        })
        t.field("endProductSellStateByAdmin", {
            type: nonNull("Int"),
            args: {
                productIds: nonNull(list(nonNull(intArg())))
            },
            resolve: endProductSellStateResolver
        })
        t.field("transferProductsToUserByAdmin", {
            type: nonNull("String"),
            args: {
                productIds: nonNull(list(nonNull(intArg()))),
                targetUserId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.findUnique({ where: { id: args.targetUserId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    else if (user.state !== 'ACTIVE') return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    const targetProducts = await ctx.prisma.product.findMany({
                        where: { id: { in: args.productIds }, userId: { equals: null } },
                        select: { id: true, taobaoProductId: true }
                    });
                    const userId = user.id;
                    const existingProducts = await ctx.prisma.product.findMany({
                        where: {
                            userId: { equals: userId },
                            taobaoProductId: { in: targetProducts.map(v => v.taobaoProductId) }
                        },
                        select: { taobaoProductId: true }
                    });
                    const filteredTargetProducts = targetProducts.filter(v => existingProducts.findIndex(v2 => v2.taobaoProductId === v.taobaoProductId) === -1);

                    if (targetProducts.length > 0 && filteredTargetProducts.length === 0) return throwError(errors.etc("모든 상품이 해당 유저에 수집된 상품이거나, 관리자 상품이 아닙니다."), ctx);
                    const newProduct = await copyProductsToUser(filteredTargetProducts.map(v => v.id), ctx, userId)

                    return `${newProduct.length}개의 상품이 ${user.email} 유저 계정에 추가되었습니다.`

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});
