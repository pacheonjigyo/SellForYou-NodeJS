import { hashSync, compareSync } from "bcryptjs";
import { isBefore } from "date-fns";
import { arg, booleanArg, extendType, floatArg, intArg, nonNull, stringArg } from "nexus";
import { getPurchaseInfo } from ".";
import { regexPattern } from "../../utils/constants";
import { throwError, errors } from "../../utils/error";
import { uploadToS3 } from "../../utils/file_manage";
import { generateToken, generateUserToken, validateStringLength } from "../../utils/helpers";

export const mutation_user = extendType({
    type: "Mutation",
    definition(t) {
        t.field("signUpUserByEveryone", {
            type: nonNull("SignInType"),
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                // name: nonNull(stringArg()),
                // gender: nonNull(arg({ type: "UserGender" })),
                // address: nonNull(stringArg()),
                phone: nonNull(stringArg()),
                verificationId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    // if (args.userType === "EMAIL" && !regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                    // if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                    // const phone = args.phone.replace(regexPattern.phone, "0$1$2$3");

                    if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                    const tel = args.phone.replace(regexPattern.phone, "0$1$2$3");
                    const verification = await ctx.prisma.phoneVerification.findUnique({ where: { id: args.verificationId } });
                    if (!verification) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                    if (verification.tel !== tel) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                    // const existingPhoneUser = await ctx.prisma.userInfo.findUnique({ where: { phone: tel } });
                    // if (existingPhoneUser) return throwError(errors.etc("해당 휴대폰 번호로 가입된 회원이 존재합니다."), ctx);
                    await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });

                    if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                    if (await ctx.prisma.user.findUnique({ where: { email: args.email } })) return throwError(errors.etc("해당 이메일이 이미 존재합니다."), ctx);
                    // if (await ctx.prisma.user.findUnique({ where: { phone } })) return throwError(errors.etc("해당 휴대폰 번호가 이미 존재합니다."), ctx);
                    const user = await ctx.prisma.user.create({ data: { email: args.email, password: hashSync(args.password), state: "ACTIVE", userInfo: { create: { phone: tel } } } });
                    return { accessToken: await generateUserToken(ctx.prisma, user.id), refreshToken: generateToken(user.id, "userId", true) };
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("signInUserByEveryone", {
            type: nonNull("SignInType"),
            args: {
                userType: nonNull(arg({ type: "UserSocialType" })),
                email: nonNull(stringArg()),
                password: nonNull(stringArg({ description: "소셜의 경우 그냥 빈 문자열" })),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.userType === "EMAIL" && !regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                    const where = args.userType === "EMAIL" ? { email: args.email } : args.userType === "NAVER" ? { naverId: args.email } : args.userType === "KAKAO" ? { kakaoId: args.email } : {}
                    const user = await ctx.prisma.user.findUnique({ where });
                    if (!user) return throwError(errors.invalidUser, ctx);
                    if (user.state !== 'ACTIVE') return throwError(errors.invalidUser, ctx);
                    if (args.userType === "EMAIL" && !compareSync(args.password, user.password)) return throwError(errors.invalidUser, ctx);
                    return { accessToken: await generateUserToken(ctx.prisma, user.id), refreshToken: generateToken(user.id, "userId", true) };
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("signInUserForImageProgramByEveryone", {
            type: nonNull("String"),
            args: {
                userType: nonNull(arg({ type: "UserLoginType" })),
                email: nonNull(stringArg()),
                password: nonNull(stringArg({ description: "소셜의 경우 그냥 빈 문자열" })),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.userType === 'ADMIN') {
                        if (!regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                        const admin = await ctx.prisma.admin.findUnique({ where: { loginId: args.email } });
                        if (!admin) return throwError(errors.invalidUser, ctx);
                        if (!compareSync(args.password, admin.password)) return throwError(errors.invalidUser, ctx);
                        return generateToken(admin.id, "adminId", false);
                    }
                    else {
                        if (args.userType === "EMAIL" && !regexPattern.email.test(args.email)) return throwError(errors.etc("이메일 형식이 잘못되었습니다."), ctx);
                        const where = args.userType === "EMAIL" ? { email: args.email } : args.userType === "NAVER" ? { naverId: args.email } : args.userType === "KAKAO" ? { kakaoId: args.email } : {}
                        const user = await ctx.prisma.user.findUnique({ where });
                        if (!user) return throwError(errors.invalidUser, ctx);
                        if (user.state !== 'ACTIVE') return throwError(errors.invalidUser, ctx);
                        if (args.userType === "EMAIL" && !compareSync(args.password, user.password)) return throwError(errors.invalidUser, ctx);
                        const purchaseInfo = await getPurchaseInfo(ctx.prisma, user.id);
                        const d = purchaseInfo.additionalInfo.find(v => v.type === 'IMAGE_TRANSLATE');
                        if (!d) return throwError(errors.additionalPermissionRequired, ctx);
                        if (isBefore(d.expiredAt, new Date())) throw errors.additionalPermissionRequired;
                        return await generateUserToken(ctx.prisma, user.id);
                    }
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("connectSocialIdByUser", {
            type: nonNull("User"),
            args: {
                userType: nonNull(arg({ type: "UserSocialType" })),
                socialId: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (args.userType === "EMAIL") return throwError(errors.etc("잘못된 소셜 타입입니다."), ctx);
                    const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
                    if (!user) return throwError(errors.invalidUser, ctx);
                    const data: { naverId?: string, kakaoId?: string } = {};
                    if (args.userType === "KAKAO") {
                        if (user.kakaoId) return throwError(errors.etc("카카오 계정은 이미 연동되어 있습니다."), ctx);
                        const existingUser = await ctx.prisma.user.count({ where: { kakaoId: { equals: args.socialId } } });
                        if (existingUser > 0) return throwError(errors.etc("해당 카카오 계정은 다른 계정과 연동되어 있습니다."), ctx);
                        data.kakaoId = args.socialId;
                    }
                    if (args.userType === "NAVER") {
                        if (user.naverId) return throwError(errors.etc("네이버 계정은 이미 연동되어 있습니다."), ctx);
                        const existingUser = await ctx.prisma.user.count({ where: { naverId: { equals: args.socialId } } });
                        if (existingUser > 0) return throwError(errors.etc("해당 네이버 계정은 다른 계정과 연동되어 있습니다."), ctx);
                        data.naverId = args.socialId;
                    }
                    return await ctx.prisma.user.update({ where: { id: user.id }, data })!;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updatePhoneByUser", {
            type: nonNull("Boolean"),
            args: {
                phone: nonNull(stringArg()),
                verificationId: nonNull(intArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if (!regexPattern.phone.test(args.phone)) return throwError(errors.etc("휴대폰 번호 형식이 잘못되었습니다."), ctx);
                    const tel = args.phone.replace(regexPattern.phone, "0$1$2$3");
                    const verification = await ctx.prisma.phoneVerification.findUnique({ where: { id: args.verificationId } });
                    if (!verification) return throwError(errors.etc("인증 번호가 일치하지 않습니다."), ctx);
                    await ctx.prisma.phoneVerification.delete({ where: { id: verification.id } });
                    await ctx.prisma.userInfo.update({ where: { userId: ctx.token!.userId! }, data: { phone: tel } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("updateMyDataByUser", {
            type: nonNull("Boolean"),
            args: {
                marginRate: floatArg(),
                defaultShippingFee: intArg(),
                refundAccountInfoData: arg({ type: "AccountInfoInput" }),
                fixImageTop: arg({ type: "Upload" }),
                fixImageBottom: arg({ type: "Upload" }),
                isPersonal: booleanArg(),
                companyInfo: arg({ type: "UserCompanyInfoInput" }),
                companyFile: arg({ type: "Upload" }),
                cnyRate: floatArg(),
                additionalShippingFeeJeju: intArg(),
                asTel: stringArg(),
                asInformation: stringArg(),
                refundShippingFee: intArg(),
                exchangeShippingFee: intArg(),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    if ((args.marginRate ?? 1) < 0) return throwError(errors.etc("마진율은 음수일 수 없습니다."), ctx);
                    if ((args.defaultShippingFee ?? 1) < 0) return throwError(errors.etc("기본 해외배송비는 음수일 수 없습니다."), ctx);
                    args.marginRate = args.marginRate ?? undefined;
                    args.defaultShippingFee = args.defaultShippingFee ?? undefined;
                    args.refundAccountInfoData = args.refundAccountInfoData ?? undefined;
                    args.cnyRate = args.cnyRate ?? undefined;
                    let fixImageTop: string | null | undefined = args.fixImageTop ? "" : args.fixImageTop;
                    let fixImageBottom: string | null | undefined = args.fixImageBottom ? "" : args.fixImageBottom;
                    if (args.fixImageTop) {
                        fixImageTop = (await uploadToS3(args.fixImageTop, ["user", ctx.token!.userId!, "info"],)).url;
                    }
                    if (args.fixImageBottom) {
                        fixImageBottom = (await uploadToS3(args.fixImageBottom, ["user", ctx.token!.userId!, "info"])).url;
                    }

                    let companyFile: string | undefined = undefined;
                    if (args.companyFile) {
                        companyFile = (await uploadToS3(args.companyFile, ["cert", ctx.token!.userId!])).url;
                    }
                    const asTel = args.asTel ? args.asTel.trim() : undefined;
                    const asInformation = args.asInformation ? args.asInformation.trim() : undefined;

                    asTel && validateStringLength(ctx, asTel, 20, "A/S 전화번호");
                    asInformation && validateStringLength(ctx, asInformation, 1000, "A/S 안내내용");

                    if (args.isPersonal === true) {
                        const companyInfo = await ctx.prisma.userCompanyInfo.findUnique({ where: { userId: ctx.token!.userId! } });
                        if (companyInfo) await ctx.prisma.userCompanyInfo.delete({ where: { userId: ctx.token!.userId! } });
                    }
                    else if (args.isPersonal === false) {
                        if (!args.companyInfo) return throwError(errors.etc("법인 정보를 입력하세요."), ctx);
                        await ctx.prisma.userCompanyInfo.upsert({
                            where: { userId: ctx.token!.userId! },
                            create: {
                                code: args.companyInfo.code,
                                name: args.companyInfo.name,
                                ownerName: args.companyInfo.ownerName,
                                userId: ctx.token!.userId!
                            },
                            update: {
                                code: args.companyInfo.code,
                                name: args.companyInfo.name,
                                ownerName: args.companyInfo.ownerName,
                            },
                        });
                    }
                    await ctx.prisma.userInfo.update({
                        where: { userId: ctx.token!.userId! },
                        data: {
                            marginRate: args.marginRate,
                            defaultShippingFee: args.defaultShippingFee,
                            fixImageTop,
                            fixImageBottom,
                            refundAccountInfoData: JSON.stringify(args.refundAccountInfoData),
                            cnyRate: args.cnyRate,
                            codeFile: companyFile,
                            asTel,
                            asInformation,
                            additionalShippingFeeJeju: args.additionalShippingFeeJeju ?? undefined,
                            refundShippingFee: args.refundShippingFee ?? undefined,
                            exchangeShippingFee: args.exchangeShippingFee ?? undefined,
                        }
                    });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        });
        t.field("changePasswordByUser", {
            type: nonNull("Boolean"),
            args: {
                currentPassword: nonNull(stringArg()),
                newPassword: nonNull(stringArg()),
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
                    if (!user) return throwError(errors.noSuchData, ctx);
                    if (!compareSync(args.currentPassword, user.password)) return throwError(errors.etc("현재 비밀번호가 다릅니다."), ctx);
                    const password = hashSync(args.newPassword);
                    await ctx.prisma.user.update({ where: { id: ctx.token!.userId! }, data: { password } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("withdrawByUser", {
            type: nonNull("Boolean"),
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.user.findUnique({ where: { id: ctx.token!.userId! } });
                    if (!user) return throwError(errors.noSuchData, ctx);
                    const withdraw = await ctx.prisma.withdraw.create({
                        data: {
                            email: user.email,
                            kakaoId: user.kakaoId,
                            naverId: user.naverId,
                            withdrawAt: new Date(),
                        }
                    });
                    await ctx.prisma.user.update({
                        where: { id: user.id },
                        data: {
                            email: withdraw.id.toString(), naverId: null, kakaoId: null,
                            state: "DELETED",
                        }
                    })
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
        t.field("setMaxProductLimitByAdmin", {
            type: nonNull("Boolean"),
            args: {
                userId: nonNull(intArg()),
                productLimit: intArg({ description: "미설정시 무제한" })
            },
            resolve: async (src, args, ctx, info) => {
                try {
                    const user = await ctx.prisma.userInfo.findUnique({ where: { userId: args.userId } });
                    if (!user) return throwError(errors.etc("해당 유저가 없습니다."), ctx);
                    await ctx.prisma.userInfo.update({ where: { userId: user.userId }, data: { maxProductLimit: args.productLimit ?? null } });
                    return true;
                } catch (e) {
                    return throwError(e, ctx);
                }
            }
        })
    }
});