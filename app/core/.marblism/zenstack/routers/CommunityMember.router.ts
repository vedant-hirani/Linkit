/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.CommunityMemberInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.createMany(input as any))),

        create: procedure.input($Schema.CommunityMemberInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.create(input as any))),

        deleteMany: procedure.input($Schema.CommunityMemberInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.deleteMany(input as any))),

        delete: procedure.input($Schema.CommunityMemberInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.delete(input as any))),

        findFirst: procedure.input($Schema.CommunityMemberInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).communityMember.findFirst(input as any))),

        findMany: procedure.input($Schema.CommunityMemberInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).communityMember.findMany(input as any))),

        findUnique: procedure.input($Schema.CommunityMemberInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).communityMember.findUnique(input as any))),

        updateMany: procedure.input($Schema.CommunityMemberInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.updateMany(input as any))),

        update: procedure.input($Schema.CommunityMemberInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).communityMember.update(input as any))),

        count: procedure.input($Schema.CommunityMemberInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).communityMember.count(input as any))),

    }
    );
}
