import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import { IPAJobCallbackDoneResponse, IPAJobCallbackResponse, IPAJobCallbackRegistProdResultJson, IPAJobCallbackFailedResultJson } from "../playauto_api_type";
import { Prisma, PrismaClient, ProductStoreLogUploadState } from "@prisma/client";
import { ProductStoreStateEnum } from "../graphql";
import { publishUserLogData } from "../utils/local/pubsub";
import { pubsub } from "../utils/helpers";

function isDoneResponse(response: IPAJobCallbackResponse<IPAJobCallbackRegistProdResultJson>): response is IPAJobCallbackDoneResponse<IPAJobCallbackRegistProdResultJson> {
    return (<IPAJobCallbackDoneResponse<IPAJobCallbackRegistProdResultJson>>response).results !== undefined;
}

function isFailedResponse(response: IPAJobCallbackRegistProdResultJson[] | IPAJobCallbackFailedResultJson): response is IPAJobCallbackFailedResultJson {
    return (<IPAJobCallbackFailedResultJson>response).Result !== undefined;
}
const numberToState: { [key: number]: ProductStoreLogUploadState } = {
    0: 'WAIT',
    1: "SUCCESS",
    2: "FAIL",
    3: "CANCEL",
    4: "ON_PROGRESS"
}

export const addJobCallbackHandler = async (req: Request, res: Response) => {
    try {
        // console.log("AddJob Callback : ", JSON.stringify({ params: req.params, body: req.body, query: req.query, headers: req.headers, files: req.files ? Object.values(req.files).map(v => ({ ...v, buffer: undefined })) : null }));
        const response: IPAJobCallbackResponse<IPAJobCallbackRegistProdResultJson> = req.body;
        // console.log(JSON.stringify(req.headers));
        // console.log(JSON.stringify(req.body));
        if (!response.job_id) {
            res.sendStatus(400);
            return;
        }
        if (isDoneResponse(response)) {
            const result = response.results["result.json"];
            const config = response.results["config.json"];
            if (isFailedResponse(result)) {
                console.log("addJobCallbackHandler : Internal Server Error", response)
                res.sendStatus(400);
                return;
            }
            result.map((v, i, a) => a[i].setdata = '_??????_')
            const prisma = new PrismaClient();
            try {
                const results = await Promise.all(result.map(async v => {
                    if (v.state !== 1) {
                        console.log("?????? ??????", { result: v, config, jobId: response.job_id });
                    }
                    // else console.log("????????????", { result, config, jobId: response.job_id });
                    const name = v.code.split('_');
                    const productId = parseInt(name[1], 36);
                    const product = await prisma.product.findUnique({
                        where: { id: productId },
                        include: {
                            productStore: {
                                orderBy: [{ id: "desc" }],
                                // include: { userSetData: { include: { userShopData: true } } },
                                include: { userShopData: true }
                            }
                        }
                    });
                    if (!product) {
                        console.log("addJob ?????? ?????? : ", v);
                        return;
                    }
                    const productStore = product.productStore.find(v2 =>
                        v2.userShopData.siteCode === v.site_code && v2.userShopData.siteUserId === v.site_id
                    )
                    if (!productStore) {
                        if (response.job_id === 'KOOZA') { //??????????????????
                            const userShopData = await prisma.userShopData.findUnique({ where: { id: v.reg_premium } });
                            if (!userShopData) {
                                console.log("addJob ?????? : ShopData ??????");
                                return;
                            }
                            else if (userShopData.userId !== product.userId) {
                                console.log("addJob ?????? : ?????? ?????? ??????");
                                return;
                            }
                            if (v.state !== 1 && v.state !== 2) {
                                console.log("addJob ?????? : state??? 1,2??? ??????");
                                return;
                            }
                            const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : { connect: { id: ProductStoreStateEnum.REGISTER_FAILED } };
                            const updatedResult = await prisma.productStore.create({
                                data: {
                                    storeProductId: v.slave_reg_code !== '' ? v.slave_reg_code : undefined,
                                    productStoreState,
                                    productStoreLog: {
                                        create: {
                                            jobId: response.job_id,
                                            destState: ProductStoreStateEnum.ON_SELL,
                                            uploadState: numberToState[v.state],
                                            errorMessage: v.msg,
                                        }
                                    },
                                    product: { connect: { id: product.id } },
                                    userShopData: { connect: { id: userShopData.id } },
                                    etcVendorItemId: userShopData.siteCode === 'B378' ? v.slave_reg_code_sub : undefined,
                                }
                            })
                            await prisma.product.update({
                                where: { id: updatedResult.productId }, data: {
                                    state: v.state === 1 ? 'ON_SALE' : v.state === 2 ? 'UPLOAD_FAILED' : undefined,
                                }
                            })
                            return { userId: product.userId, productId: product.id, reason: v.msg };
                        }
                        else {
                            console.log("addJob ?????? ??????(????????? ?????? ??????) : ", JSON.stringify({ result, product: require('util').inspect(product, undefined, 8) }));
                        }
                        return;
                    }
                    else if (productStore.state === ProductStoreStateEnum.REGISTER_REQUESTED) {
                        const productStoreState = v.state === 1 ? { connect: { id: ProductStoreStateEnum.ON_SELL } } : v.state === 2 ? { connect: { id: ProductStoreStateEnum.REGISTER_FAILED } } : undefined;
                        const updatedResult = await prisma.productStore.update({
                            where: { id: productStore.id },
                            data: {
                                storeProductId: v.slave_reg_code !== '' ? v.slave_reg_code : undefined,
                                productStoreState,
                                productStoreLog: {
                                    create: {
                                        jobId: response.job_id,
                                        destState: ProductStoreStateEnum.ON_SELL,
                                        uploadState: numberToState[v.state],
                                        errorMessage: v.msg,
                                    }
                                },
                                product: {
                                    update: {
                                        state: v.state === 1 ? 'ON_SALE' : v.state === 2 ? 'UPLOAD_FAILED' : undefined,
                                    }
                                }
                            }
                        })
                        //enum('COLLECTED','ON_SALE','UPLOAD_WAITING','UPLOAD_FAILED','ON_S')
                        // const product = (await prisma.product.findUnique({ where: { id: productStore.productId }, select: { productStore: true } }));
                    }
                    return { userId: product.userId, productId: product.id, reason: v.msg };
                }))
                const userId = results.find(v => v?.userId)?.userId;
                if (userId) {
                    const successfulMessage = results.filter(v => v && v?.reason === '').map(v => `SFY_${v!.productId.toString(36)} : ??????`).join('\n')
                    const failedMessage = results.filter(v => v && v?.reason !== '').map(v => `SFY_${v!.productId.toString(36)} : ??????(${v!.reason})`).join('\n')
                    await publishUserLogData({ prisma, pubsub, token: { userId } },
                        { type: "registerProduct", title: `????????? ?????? ????????? ${results.length}??? ?????? ??? ${result.filter(v => !!v).length}??? ????????? ????????? ?????????????????????.\n${successfulMessage}\n${failedMessage}` })
                }
            }
            catch (e) {
                console.log('addJob Update Error');
                console.log(e);
                console.log({ result, config, jobId: response.job_id });
                res.sendStatus(500)

            }
            finally {
                prisma.$disconnect();
            }
        }
        else {
            // console.log(response);
        }
        // await uploadToS3ByBuffer(Buffer.from(JSON.stringify(req.body)), "set_info.json", "application/json", ["test", "ex", 1])
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
    }
}