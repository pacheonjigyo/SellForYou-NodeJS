import { enumType, intArg, nonNull, objectType, list } from "nexus";
import { throwError } from "../../utils/error";


export const t_sitemanage_form_file = enumType({
    name: "ExcelSampleEnum",
    members: ["COLLECT_PRODUCT", "REPLACE_WORD", "DENY_WORD"]
})

export const t_Faq = objectType({
    name: "Faq",
    definition(t) {
        t.model.id();
        t.model.categoryId();
        t.model.title();
        t.model.content();
        t.field("contentSummary", {
            type: nonNull("String"),
            args: {
                wordCount: intArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const summary = src.content.replace(/<script.*?<\/script>/sg, "").replace(/<style.*?<\/style>/sg, "").replace(/&nbsp;/g, "").replace(/<[^>]*>/sg, "").replace(/\n/gs, "").replace(/ +/gs, " ").trim()
                    // console.log(src);
                    return summary.slice(0, args.wordCount ?? undefined);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.createdAt();
        t.model.FaqCategory();
    }
});

export const t_FaqCategory = objectType({
    name: "FaqCategory",
    definition(t) {
        t.model.id();
        t.model.name();
        t.model.order();
        t.model.isActive();
        t.model.faq();
    }
});

export const t_Notice = objectType({
    name: "Notice",
    definition(t) {
        t.model.id();
        t.model.title();
        t.model.content();
        t.field("contentSummary", {
            type: nonNull("String"),
            args: {
                wordCount: intArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const summary = src.content.replace(/<script.*?<\/script>/sg, "").replace(/<style.*?<\/style>/sg, "").replace(/&nbsp;/g, "").replace(/<[^>]*>/sg, "").replace(/\n/gs, "").replace(/ +/gs, " ").trim()
                    // console.log(src);
                    return summary.slice(0, args.wordCount ?? undefined);
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.model.attachmentFile();
        t.model.isVisible();
        t.model.viewCount();
        t.model.createdAt();
    }
});

export const t_UserQuestion = objectType({
    name: "UserQuestion",
    definition(t) {
        t.model.id();
        t.model.userId();
        t.model.title();
        t.model.content();
        t.model.attachmentFile();
        t.field("attachmentFiles", {
            type: nonNull(list(nonNull("String"))),
            resolve: async (src, args, ctx, info) => {
                try {
                    return await JSON.parse(src.attachmentFile ?? "[]")
                } catch (e) {
                    return [];
                }
            }
        })
        t.model.answer();
        t.model.isActive();
        t.model.answeredAt();
        t.model.createdAt();
        t.model.user();
    }
});