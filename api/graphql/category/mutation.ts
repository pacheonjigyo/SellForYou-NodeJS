import { extendType, nonNull } from "nexus";
import fetch from "node-fetch";
import { IPACategoryResponse, IPACategoryResult, IPACategoryStoreResult } from "../../playauto_api_type";
import { errors, throwError } from "../../utils/error";

export const mutation_category = extendType({
    type: "Mutation",
    definition(t) {
        t.field("updateCategoryStoreDataByAdmin", {
            type: nonNull("Boolean"),
            resolve: async (src, args, ctx, info) => {
                try {
                    return false;
                    const prisma = ctx.prisma;
                    new Promise(async (resolve, reject) => {
                        const cate = await fetch('https://playapi.api.plto.com/restApi/api/getMatchCate', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: `{"domain":"playauto.co.kr","sol_type":"TEST"}`
                        }).then(result => result.json() as Promise<IPACategoryResponse>).catch(e => { reject(e); return null; });
                        if (cate) {
                            await Promise.all((cate.result.result as IPACategoryResult[]).map(async v => {
                                await prisma.category.upsert({
                                    where: { code: v.code },
                                    create: {
                                        id: v.number,
                                        code: v.code,
                                        c1: v.c1,
                                        c1Name: v.c1_nm,
                                        c2: v.c2,
                                        c2Name: v.c2_nm,
                                        c3: v.c3,
                                        c3Name: v.c3_nm,
                                        c4: v.c4,
                                        c4Name: v.c4_nm,
                                        a077Code: "",
                                        siilCode: "",
                                    },
                                    update: {
                                        id: v.number,
                                        code: v.code,
                                        c1: v.c1,
                                        c1Name: v.c1_nm,
                                        c2: v.c2,
                                        c2Name: v.c2_nm,
                                        c3: v.c3,
                                        c3Name: v.c3_nm,
                                        c4: v.c4,
                                        c4Name: v.c4_nm,
                                    }
                                })
                            }))
                            resolve("성공");
                        }
                        resolve("실패");
                    }).then(res => {
                        console.log("공통 카테고리 업데이트 결과 : ", res);
                    }).catch(e => {
                        console.log("공통 카테고리 업데이트 에러 : ", e);
                    })
                    new Promise(async (resolve, reject) => {
                        const cate_store = await fetch('https://playapi.api.plto.com/restApi/api/getMatchShopCate', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: `{"domain":"playauto.co.kr","sol_type":"TEST"}`
                        }).then(result => result.json() as Promise<IPACategoryResponse>).catch(e => { reject(e); return null; });
                        if (cate_store) {
                            await Promise.all((cate_store.result.result as IPACategoryStoreResult[]).map(async v => {
                                await prisma.categoryStore.upsert({
                                    where: { number: v.number },
                                    create: {
                                        number: v.number,
                                        acode: v.acode,
                                        pcode: v.pcode,
                                        dc1: v.dc1,
                                        dc1Name: v.dc1_nm,
                                        dc2: v.dc2,
                                        dc2Name: v.dc2_nm,
                                        dc3: v.dc3,
                                        dc3Name: v.dc3_nm,
                                        dc4: v.dc4,
                                        dc4Name: v.dc4_nm,
                                        ccode: v.ccode,
                                        state: v.state === '정상' ? "NORMAL" : v.state === '삭제' ? "DELETE" : "CHANGE",
                                        cateStateCdate: v.cate_state_cdate ? new Date(v.cate_state_cdate * 1000) : null,
                                        cateStatePdate: v.cate_state_pdate ? new Date(v.cate_state_pdate * 1000) : null,
                                    },
                                    update: {
                                        number: v.number,
                                        acode: v.acode,
                                        pcode: v.pcode,
                                        dc1: v.dc1,
                                        dc1Name: v.dc1_nm,
                                        dc2: v.dc2,
                                        dc2Name: v.dc2_nm,
                                        dc3: v.dc3,
                                        dc3Name: v.dc3_nm,
                                        dc4: v.dc4,
                                        dc4Name: v.dc4_nm,
                                        ccode: v.ccode,
                                        state: v.state === '정상' ? "NORMAL" : v.state === '삭제' ? "DELETE" : "CHANGE",
                                        cateStateCdate: v.cate_state_cdate ? new Date(v.cate_state_cdate * 1000) : null,
                                        cateStatePdate: v.cate_state_pdate ? new Date(v.cate_state_pdate * 1000) : null,
                                    }
                                }).catch(e => reject({ v, e }))
                            })).catch(e => reject(e));
                            resolve("성공");
                        }
                        resolve("실패");
                    }).then(res => {
                        console.log("쇼핑몰별 카테고리 업데이트 결과 : ", res);
                    }).catch(e => {
                        console.log("쇼핑몰별 카테고리 업데이트 에러 : ", e);
                    })
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});