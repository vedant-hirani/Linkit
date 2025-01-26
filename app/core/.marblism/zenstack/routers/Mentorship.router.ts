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

        createMany: procedure.input($Schema.MentorshipInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.createMany(input as any))),

        create: procedure.input($Schema.MentorshipInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.create(input as any))),

        deleteMany: procedure.input($Schema.MentorshipInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.deleteMany(input as any))),

        delete: procedure.input($Schema.MentorshipInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.delete(input as any))),

        findFirst: procedure.input($Schema.MentorshipInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).mentorship.findFirst(input as any))),

        findMany: procedure.input($Schema.MentorshipInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).mentorship.findMany(input as any))),

        findUnique: procedure.input($Schema.MentorshipInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).mentorship.findUnique(input as any))),

        updateMany: procedure.input($Schema.MentorshipInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.updateMany(input as any))),

        update: procedure.input($Schema.MentorshipInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).mentorship.update(input as any))),

        count: procedure.input($Schema.MentorshipInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).mentorship.count(input as any))),

    }
    );
}
