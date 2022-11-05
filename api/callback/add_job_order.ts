import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import { IPAJobCallbackDoneResponse, IPAJobCallbackFailedResultJson, IPAJobCallbackResponse, IPAJobCallbackScrapOrderResultJson, PlayAutoDelivMethod, shopDataNameInfo } from "../playauto_api_type";
import { Prisma, PrismaClient, ProductStoreLogUploadState } from "@prisma/client";
import { ProductStoreStateEnum } from "../graphql";
import { isBefore, parse } from "date-fns";
import { publishUserLogData } from "../utils/local/pubsub";
import { pubsub } from "../utils/helpers";
import { getOrderId } from "../utils/local/get-order-id";
import { getPersonalEcmValidity } from "../utils/local/get-personal-ecm-validity";


function isDoneResponse(response: IPAJobCallbackResponse<IPAJobCallbackScrapOrderResultJson>): response is IPAJobCallbackDoneResponse<IPAJobCallbackScrapOrderResultJson> {
    return (<IPAJobCallbackDoneResponse<IPAJobCallbackScrapOrderResultJson>>response).results !== undefined;
}

function isFailedResponse(response: IPAJobCallbackScrapOrderResultJson[] | IPAJobCallbackFailedResultJson): response is IPAJobCallbackFailedResultJson {
    return (<IPAJobCallbackFailedResultJson>response).Result !== undefined;
}

function getOrderProductNumber(data: IPAJobCallbackScrapOrderResultJson) {
    if (data.site_code === 'A077') return data.ocode.split(" ")[1];
    else if (data.site_code === 'B378') return data.ocode.split(" ")[0];
    return data.ocode.split(" ")[0];
}

export const addJobOrderCallbackHandler = async (req: Request, res: Response) => {
    try {
        // console.log("AddJobOrder Callback : ", JSON.stringify({ params: req.params, body: req.body, query: req.query, headers: req.headers, files: req.files ? Object.values(req.files).map(v => ({ ...v, buffer: undefined })) : null }));
        const response: IPAJobCallbackResponse<IPAJobCallbackScrapOrderResultJson> = req.body;
        if (!response.job_id) {
            res.sendStatus(400);
            return;
        }
        if (isDoneResponse(response)) {
            const result = response.results["result.json"];
            const userShopDataId = parseInt(response.title.split("/")[0]);
            if (isNaN(userShopDataId)) {
                console.log("addJobOrderCallbackHandler : userShopDataId parse error", response);
                res.sendStatus(500);
                return;
            }
            if (isFailedResponse(result)) {
                console.log("addJobOrderCallbackHandler : Internal Server Error", response)
                res.sendStatus(400);
                return;
            }
            const prisma = new PrismaClient();
            try {
                const siteInfo = await prisma.userShopData.findUnique({ where: { id: userShopDataId } });
                if (!siteInfo) {
                    console.log("addJobOrderCallbackHandler : userShopDatanot exist", userShopDataId, response);
                    res.sendStatus(500);
                    return;
                }
                // console.log(result);
                const processingResult = await Promise.all(result.map(async v => {
                    const existingOrder = await prisma.order.findUnique({ where: { UQ_order_number_data: { orderProductNumber: v.ocode.split(" ")[1], userShopDataId: siteInfo.id } } });
                    if (existingOrder) return null;
                    let ddate = getDate(v.ddate);
                    let odate = getDate(v.odate);

                    const name = v.pcode2.split('_');
                    let productId: number | null = parseInt(name[1], 36);
                    if (isNaN(productId) || name[0] !== 'SFY') {
                        productId = null;
                    }
                    let isCustomIdValid: boolean | null = null;
                    try {
                        isCustomIdValid = await getPersonalEcmValidity(v.gname, v.gprivate_no);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    const result = await prisma.order.create({
                        data: {
                            id: await getOrderId(prisma, odate),
                            buyerName: v.oname,
                            customId: v.gprivate_no,
                            deliveryExpiredAt: ddate,
                            orderedAt: odate,
                            optionName: v.popt,
                            orderProductNumber: getOrderProductNumber(v),
                            orderState: v.state,
                            originalData: JSON.stringify(v),
                            payPrice: v.price,
                            productName: v.pname,
                            quantity: v.count,
                            shippingFee: v.deliv_price,
                            shippingType: PlayAutoDelivMethod[v.deliv_method],
                            receiverName: v.gname,
                            storeProductId: v.pcode,
                            sellerProductCode: v.pcode2,
                            productId,
                            userShopDataId: siteInfo.id,
                            isCustomIdValid,
                        }
                    }).catch(e => {
                        console.trace("addJobOrderCallbackHandler error :", e);
                        return null;
                    })
                    return !!result;
                }))
                console.log(`주문수집(ShopID:${siteInfo.id}) :${result.length} 개 중 ${processingResult.filter(v => v === true).length} 개 추가완료`)
                await publishUserLogData({ prisma, pubsub, token: { userId: siteInfo.userId } },
                    { type: "scrapOrder", title: `${shopDataNameInfo[siteInfo.siteCode]} 주문수집(${siteInfo.siteUserId}) :${result.length} 개 중 ${processingResult.filter(v => v === true).length} 개의 주문이 수집되었습니다.` })
            }
            catch (e) {
                console.log('addJob Update Error');
                console.log(e);
                console.log({ result, jobId: response.job_id });
                res.sendStatus(500)

            }
            finally {
                prisma.$disconnect();
            }
        }
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        console.log(req.body);
        res.sendStatus(500)
    }
}

function getDate(dateString: string) {
    let ddate = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());
    if (isBefore(ddate, 0)) {
        ddate = new Date(0);
    }
    return ddate;
}
