import { arg, booleanArg, extendType, intArg, list, nonNull, stringArg } from "nexus";
import { errors, throwError } from "../../utils/error";
import { uploadToS3, uploadToS3AvoidDuplicate, uploadToS3WithEditor } from "../../utils/file_manage";

export const mutation_site_manage = extendType({
    type: "Mutation",
    definition(t) {
        t.field("createNoticeByAdmin", {
            type: nonNull("Boolean"),
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                attachment: arg({ type: "Upload" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {

                    args.title = args.title.trim();

                    if (args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);

                    const notice = await ctx.prisma.notice.create({
                        data: {
                            content: args.content,
                            title: args.title,
                            attachmentFile: null,
                        }
                    })
                    const content = await uploadToS3WithEditor(args.content, ["notice", notice.id], null);
                    const attachmentFile = args.attachment ? (await uploadToS3(args.attachment, ["notice", notice.id])).url : null;
                    await ctx.prisma.notice.update({
                        where: { id: notice.id },
                        data: {
                            content,
                            attachmentFile,
                        }
                    })

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateNoticeByAdmin", {
            type: nonNull("Boolean"),
            args: {
                noticeId: nonNull(intArg()),
                title: stringArg(),
                content: stringArg(),
                attachment: arg({ type: "Upload" }),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const notice = await ctx.prisma.notice.findUnique({ where: { id: args.noticeId } });
                    if (!notice) return throwError(errors.etc("잘못된 공지사항 ID입니다."), ctx);

                    args.title = args.title ? args.title.trim() : undefined;

                    if (args.title && args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title && args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);

                    let attachmentFile: string | undefined = undefined;
                    if (args.attachment) {
                        attachmentFile = (await uploadToS3(args.attachment, ["notice", notice.id])).url;
                    }
                    const content = args.content ? await uploadToS3WithEditor(args.content, ["notice", notice.id], null) : undefined;
                    await ctx.prisma.notice.update({
                        where: { id: notice.id },
                        data: {
                            title: args.title,
                            content,
                            attachmentFile,
                        }
                    })

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("deleteNoticeByAdmin", {
            type: nonNull("Int"),
            args: {
                noticeIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const notice = await ctx.prisma.notice.deleteMany({ where: { id: { in: args.noticeIds } } });

                    return notice.count;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("createFaqCategoryByAdmin", {
            type: nonNull("FaqCategory"),
            args: {
                name: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const categoryCount = await ctx.prisma.faqCategory.count();
                    const category = await ctx.prisma.faqCategory.create({
                        data: {
                            name: args.name,
                            order: categoryCount + 1,
                        }
                    });
                    return category;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("modifyFaqCategoryByAdmin", {
            type: nonNull("FaqCategory"),
            args: {
                faqCategoryId: nonNull(intArg()),
                name: stringArg(),
                isActive: booleanArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const category = await ctx.prisma.faqCategory.update({
                        where: { id: args.faqCategoryId },
                        data: {
                            name: args.name ?? undefined,
                            isActive: args.isActive ?? undefined,
                        }
                    });
                    return category;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("sortFaqCategoryByAdmin", {
            type: nonNull("Boolean"),
            args: {
                faqCategoryIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const categoryCount = await ctx.prisma.faqCategory.count();
                    if (categoryCount !== args.faqCategoryIds.length) return throwError(errors.etc("모든 카테고리 입력바랍니다."), ctx);
                    const categoryUpdates = args.faqCategoryIds.map((v, i) => ctx.prisma.faqCategory.update({ where: { id: v }, data: { order: i + 1 } }));
                    await ctx.prisma.$transaction(categoryUpdates);

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("deleteFaqCategoryByAdmin", {
            type: nonNull("Boolean"),
            args: {
                faqCategoryId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const category = await ctx.prisma.faqCategory.findUnique({
                        where: { id: args.faqCategoryId }, select: {
                            id: true,
                            faq: true,
                        }
                    });
                    if (!category) return throwError(errors.noSuchData, ctx);
                    if (category.faq.length !== 0) return throwError(errors.etc("해당 카테고리 내의 FAQ 글이 있습니다."), ctx);
                    await ctx.prisma.faqCategory.delete({ where: { id: category.id } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });

        t.field("createFaqByAdmin", {
            type: nonNull("Boolean"),
            args: {
                faqCategoryId: nonNull(intArg()),
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {

                    args.title = args.title.trim();

                    if (args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);
                    const faqCategory = await ctx.prisma.faqCategory.findUnique({ where: { id: args.faqCategoryId } });
                    if (!faqCategory) return throwError(errors.noSuchData, ctx);

                    const faq = await ctx.prisma.faq.create({
                        data: {
                            categoryId: faqCategory.id,
                            content: args.content,
                            title: args.title,
                        }
                    })
                    const content = await uploadToS3WithEditor(args.content, ["faq", faq.id], null);
                    await ctx.prisma.faq.update({
                        where: { id: faq.id },
                        data: {
                            content,
                        }
                    })

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateFaqByAdmin", {
            type: nonNull("Boolean"),
            args: {
                faqId: nonNull(intArg()),
                faqCategoryId: intArg(),
                title: stringArg(),
                content: stringArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const faq = await ctx.prisma.faq.findUnique({ where: { id: args.faqId } });
                    if (!faq) return throwError(errors.etc("잘못된 공지사항 ID입니다."), ctx);
                    if (args.faqCategoryId) {
                        const faqCategory = await ctx.prisma.faqCategory.findUnique({ where: { id: args.faqCategoryId } });
                        if (!faqCategory) return throwError(errors.noSuchData, ctx);
                    }

                    args.title = args.title ? args.title.trim() : undefined;

                    if (args.title && args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title && args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);

                    const content = args.content ? await uploadToS3WithEditor(args.content, ["faq", faq.id], null) : undefined;
                    await ctx.prisma.faq.update({
                        where: { id: faq.id },
                        data: {
                            categoryId: args.faqCategoryId ?? undefined,
                            title: args.title,
                            content,
                        }
                    })

                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("deleteFaqByAdmin", {
            type: nonNull("Int"),
            args: {
                faqIds: nonNull(list(nonNull(intArg()))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const faq = await ctx.prisma.faq.deleteMany({ where: { id: { in: args.faqIds } } });

                    return faq.count;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });

        t.field("createUserQuestionByUser", {
            type: nonNull("Boolean"),
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
                attachment: list(nonNull(arg({ type: "Upload" }))),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    args.title = args.title.trim();

                    if (args.title.length === 0) return throwError(errors.etc("제목을 입력하세요."), ctx);
                    if (args.title.length > 200) return throwError(errors.etc("제목은 200자 이하로 입력해주세요."), ctx);
                    if (args.attachment && args.attachment.length > 5) return throwError(errors.etc("첨부파일은 5개 이하만 업로드 가능합니다."), ctx);

                    const userQuestion = await ctx.prisma.userQuestion.create({
                        data: {
                            userId: ctx.token!.userId!,
                            content: args.content,
                            title: args.title,
                            attachmentFile: null,
                        }
                    })

                    /// content 내 이미지를 s3 업로드된 이미지 경로로 치환
                    const content = await uploadToS3WithEditor(args.content, ["user_question", userQuestion.id], null);

                    /// 기타 첨부파일 S3에 업로드 후 경로 반환
                    const attachmentFile: string[] = [];
                    if (args.attachment) {
                        for (let element of args.attachment) {
                            attachmentFile.push(await uploadToS3AvoidDuplicate(element, ["user_question", userQuestion.id]));
                        }
                    }
                    // const attachmentFile = args.attachment ?
                    //     (await uploadToS3(args.attachment, ["userQuestion", userQuestion.id])).url : null;

                    await ctx.prisma.userQuestion.update({
                        where: { id: userQuestion.id },
                        data: {
                            content,
                            attachmentFile: JSON.stringify(attachmentFile),
                        }
                    })
                    return true;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });

        t.field("updateUserQuestionByAdmin", {
            type: nonNull("Boolean"),
            args: {
                userQuestionId: nonNull(intArg()),
                answer: nonNull(stringArg())
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const userQuestion = await ctx.prisma.userQuestion.findUnique({ where: { id: args.userQuestionId } });

                    if (!userQuestion) {
                        return throwError(errors.etc("잘못된 1대1 문의 ID입니다."), ctx);
                    }

                    const content = args.answer ? await uploadToS3WithEditor(args.answer, ["userQuestion", userQuestion.id], null) : undefined;

                    if (!content) {
                        return throwError(errors.etc("답변 내용이 없습니다."), ctx);
                    }

                    await ctx.prisma.userQuestion.update({
                        where: {
                            id: userQuestion.id
                        },
                        data: {
                            answer: content,
                            answeredAt: new Date(),
                        }
                    })
                    return true;

                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
    }
});