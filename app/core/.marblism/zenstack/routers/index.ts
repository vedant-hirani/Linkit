/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createEventRouter from "./Event.router";
import createCommunityRouter from "./Community.router";
import createEventRegistrationRouter from "./EventRegistration.router";
import createCommunityMemberRouter from "./CommunityMember.router";
import createDiscussionRouter from "./Discussion.router";
import createNotificationRouter from "./Notification.router";
import createMentorshipRouter from "./Mentorship.router";
import createAchievementRouter from "./Achievement.router";
import createPwaSubscriptionRouter from "./PwaSubscription.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as EventClientType } from "./Event.router";
import { ClientType as CommunityClientType } from "./Community.router";
import { ClientType as EventRegistrationClientType } from "./EventRegistration.router";
import { ClientType as CommunityMemberClientType } from "./CommunityMember.router";
import { ClientType as DiscussionClientType } from "./Discussion.router";
import { ClientType as NotificationClientType } from "./Notification.router";
import { ClientType as MentorshipClientType } from "./Mentorship.router";
import { ClientType as AchievementClientType } from "./Achievement.router";
import { ClientType as PwaSubscriptionClientType } from "./PwaSubscription.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        event: createEventRouter(router, procedure),
        community: createCommunityRouter(router, procedure),
        eventRegistration: createEventRegistrationRouter(router, procedure),
        communityMember: createCommunityMemberRouter(router, procedure),
        discussion: createDiscussionRouter(router, procedure),
        notification: createNotificationRouter(router, procedure),
        mentorship: createMentorshipRouter(router, procedure),
        achievement: createAchievementRouter(router, procedure),
        pwaSubscription: createPwaSubscriptionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    event: EventClientType<AppRouter>;
    community: CommunityClientType<AppRouter>;
    eventRegistration: EventRegistrationClientType<AppRouter>;
    communityMember: CommunityMemberClientType<AppRouter>;
    discussion: DiscussionClientType<AppRouter>;
    notification: NotificationClientType<AppRouter>;
    mentorship: MentorshipClientType<AppRouter>;
    achievement: AchievementClientType<AppRouter>;
    pwaSubscription: PwaSubscriptionClientType<AppRouter>;
}
