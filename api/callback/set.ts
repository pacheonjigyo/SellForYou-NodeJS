import { Request, Response } from "express"
import { join } from 'path'
import * as fs from 'fs';
import { uploadToS3AvoidDuplicateByBuffer, uploadToS3ByBuffer } from "../utils/file_manage";
import * as CryptoJS from "crypto-js";
import { shake256 } from "js-sha3";
import { prisma } from "../utils/helpers";
import { format } from "date-fns";

export const setCallbackHandler = async (req: Request, res: Response) => {
    let returnUrl = "";
    console.log("RERERE", req.params['0'].length, typeof req.params['0']);
    if (typeof req.params['0'] !== "string") {
        res.sendStatus(400);
        return;
    }
    try {
        if (req.params['0'].length !== 0) returnUrl = Buffer.from(req.params['0'], "base64").toString("utf8");
    }
    catch (e) {
        res.sendStatus(400);
        return;
    }
    if (!req.query["number"]) {
        res.sendStatus(400);
        return;
    }
    const key = Buffer.from(shake256(process.env.CODE_SECRET, 192), "hex").toString("base64");
    let isModify = false;
    // console.log(process.env.CODE_SECRET, key);
    try {
        // console.log("number:", req.query["number"]);
        const queryData = <{ userId: number, userSetDataId?: number, userShopDataId: number }>JSON.parse(CryptoJS.AES.decrypt((req.query["number"] as string).slice(1), key).toString(CryptoJS.enc.Utf8));
        let filename = `${format(new Date(), "yyMMdd_hhmmss_SSS")}.json`;
        let isFileNameReceived = false;
        if (queryData.userSetDataId) {
            const setData = await prisma.userSetData.findUnique({ where: { id: queryData.userSetDataId }, include: { userShopData: { select: { userId: true } } } });
            if (!setData || setData.userShopData.userId !== queryData.userId) {
                res.status(400).send("잘못된 요청입니다.");
                return;
            }
            filename = setData.setFilePath;
            isFileNameReceived = true;
            isModify = true;
        }
        //상품고시정보 덮어쓰기
        req.body["b64_NoRefundReason"] = '상세설명참조';
        req.body["b64_QualityAssuranceStandard"] = '상세설명참조';
        req.body["b64_CompensationProcedure"] = '상세설명참조';
        req.body["b64_TroubleShootingContents"] = '상세설명참조';
        req.body["b64_ReturnCostReason"] = '상세설명참조';
        // req.body["b64_NoRefundReason"] = '전자상거래 등에서의 소비자보호에 관한 법률 등에 의한 청약철회 제한 사유에 해당하는 경우 및 기타 객관적으로 이에 준하는 것으로 인정되는 경우 청약철회가 제한될 수 있습니다.';
        // req.body["b64_QualityAssuranceStandard"] = '소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.';
        // req.body["b64_CompensationProcedure"] = '주문취소 및 대금의 환불은 네이버페이 마이페이지에서 신청할 수 있으며, 전자상거래 등에서의 소비자보호에 관한 법률에 따라 소비자의 청약철회 후 판매자가 재화 등을 반환 받은 날로부터 3영업일 이내에 지급받은 대금의 환급을 정당한 사유 없이 지연하는 때에는 소비자는 지연기간에 대해서 연 20%의 지연배상금을 판매자에게 청구할 수 있습니다.';
        // req.body["b64_TroubleShootingContents"] = '소비자분쟁해결기준(공정거래위원회 고시) 및 관계법령에 따릅니다.';
        // req.body["b64_ReturnCostReason"] = '전자상거래등에서의소비자보호에관한법률 등에 의한 제품의 하자 또는 오배송 등으로 인한 청약철회의 경우에는 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내에 청약철회를 할 수 있으며, 반품 비용은 통신판매업자가 부담합니다.';
        const result = await uploadToS3ByBuffer(Buffer.from(JSON.stringify(req.body)), filename, "application/json", isFileNameReceived ? [] : ["user", queryData.userId, "set_data"]);
        await prisma.userSetData.upsert({
            where: { id: queryData.userSetDataId ?? 0 },
            create: { userShopDataId: queryData.userShopDataId, setFilePath: result.url, name: req.body['name'] ?? "" },
            update: { setFilePath: result.url, name: req.body['name'] ?? "" }
        });
    }
    catch (e) {
        console.log(e);
        res.sendStatus(400);
        return;
    }


    // console.log("callback : ", JSON.stringify({ params: req.params, body: req.body, query: req.query, headers: req.headers, files: Object.values(req.files).map(v => ({ ...v, buffer: undefined })) }));
    // await uploadToS3ByBuffer(Buffer.from(JSON.stringify(req.body)), "set_info.json", "application/json", ["test", "ex", 1])
    try {
        console.log(returnUrl);
        if (returnUrl === "") res.send(`<script>alert("세트 정보가 ${isModify ? "수정" : "생성"}되었습니다.");window.close();</script > `);
        else res.redirect(returnUrl);
    }
    catch (e) {
        res.sendStatus(404)
    }
}