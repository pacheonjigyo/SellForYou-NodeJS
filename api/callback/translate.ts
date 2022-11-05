import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import * as CryptoJS from "crypto-js";
import { shake256 } from "js-sha3";
import { createContext, prisma } from "../utils/helpers";
import { format } from "date-fns";
import { ITranslate, ITranslateData } from "../translate_types";
import { IFeeInfo, saveTaobaoItemToUser } from "../utils/local/onebound";
import { Product, TaobaoProduct } from "@prisma/client";
import { IOBItem } from "../onebound_api_types";
import { publishUserLogData } from "../utils/local/pubsub";

export const translateCallbackHandler = async (req: Request, res: Response) => {
    // console.log("translate Callback : ", JSON.stringify({ params: req.params, body: req.body, query: req.query, headers: req.headers, files: req.files ? Object.values(req.files).map(v => ({ ...v, buffer: undefined })) : null }));
    const result: ITranslate = req.body;
    try {
        // console.log("translate Callback:", result);
        if (result.requestId > 0) {
            const a = await prisma.taobaoProductTranslateRequest.findUnique({ where: { id: result.requestId } });
            if (a) {
                const userId = a.userId;
                let info: IFeeInfo = {
                    marginRate: 0,
                    cnyRate: 170,
                    defaultShippingFee: 0,
                };
                if (userId) {
                    const userInfo = await prisma.userInfo.findUnique({ where: { userId } });
                    if (!userInfo) {
                        console.log("잘못된 유저 ID");
                        res.sendStatus(400);
                        return;
                    }
                    info.marginRate = userInfo.marginRate;
                    info.cnyRate = userInfo.cnyRate;
                    info.defaultShippingFee = userInfo.defaultShippingFee;
                }
                else {
                    const cnyRateSetting = await prisma.setting.findUnique({ where: { name: "CNY_RATE" } });
                    if (cnyRateSetting) {
                        const cnyRate = parseFloat(cnyRateSetting.value);
                        info.cnyRate = cnyRate;
                    }
                }
                const taobaoProducts = await prisma.taobaoProduct.findMany({ where: { taobaoNumIid: { in: result.data.map(v => v.taobaoNumIid) } } });
                const taobaoProductsData = taobaoProducts.map<(TaobaoProduct & { itemData: IOBItem, translateDataObject: ITranslateData | null })>(v => {
                    const itemData = JSON.parse(v.originalData) as IOBItem;
                    let translateDataObject = result.data.find(v2 => v2.taobaoNumIid === v.taobaoNumIid);
                    if (translateDataObject?.isTranslated && v.translateData) {
                        translateDataObject = JSON.parse(v.translateData) as ITranslateData;
                    }
                    return { ...v, itemData, translateDataObject: translateDataObject ?? null }
                })
                saveTaobaoItemToUser(prisma, taobaoProductsData, userId, info, a.categoryCode, a.siilCode, a.adminId ?? undefined).then(products => {
                    const resultProducts = products.filter((v): v is Product => v !== null);
                    console.log(`콜백 : 상품 ${products.length} 개 중 ${resultProducts.length}개 추가완료 :${resultProducts.map(v => "SFY_" + v.id.toString(36))}`);
                    if (userId) {
                        const ctx = createContext(null);
                        ctx.token = { userId, iat: 0, exp: 0 }
                        publishUserLogData(ctx, { type: "getTaobaoItem", title: `상품 ${products.length} 개 중 ${resultProducts.length}개 추가 완료되었습니다.\n상품 ID : ${resultProducts.map(v => "SFY_" + v.id.toString(36)).join(",")}` });
                    }
                });
                await prisma.taobaoProductTranslateRequest.update({ where: { id: a.id }, data: { isDone: true } });
            }
        }
        result.data.map(async v => {
            await prisma.taobaoProduct.update({ where: { taobaoNumIid: v.taobaoNumIid }, data: { videoUrl: v.video === "" ? null : v.video, translateData: JSON.stringify(v) } });
        })
        res.sendStatus(200);
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
        return;
    }
}