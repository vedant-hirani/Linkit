/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@zenstackhq/runtime/models';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.DiscussionInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.createMany(input as any))),

        create: procedure.input($Schema.DiscussionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.create(input as any))),

        deleteMany: procedure.input($Schema.DiscussionInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.deleteMany(input as any))),

        delete: procedure.input($Schema.DiscussionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.delete(input as any))),

        findFirst: procedure.input($Schema.DiscussionInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).discussion.findFirst(input as any))),

        findMany: procedure.input($Schema.DiscussionInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).discussion.findMany(input as any))),

        findUnique: procedure.input($Schema.DiscussionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).discussion.findUnique(input as any))),

        updateMany: procedure.input($Schema.DiscussionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.updateMany(input as any))),

        update: procedure.input($Schema.DiscussionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).discussion.update(input as any))),

        count: procedure.input($Schema.DiscussionInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).discussion.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DiscussionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DiscussionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscussionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscussionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscussionGetPayload<T>, Context>) => Promise<Prisma.DiscussionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DiscussionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DiscussionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscussionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscussionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscussionGetPayload<T>, Context>) => Promise<Prisma.DiscussionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DiscussionFindFirstArgs, TData = Prisma.DiscussionGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DiscussionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DiscussionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscussionFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DiscussionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DiscussionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DiscussionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DiscussionFindManyArgs, TData = Array<Prisma.DiscussionGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DiscussionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DiscussionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscussionFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DiscussionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DiscussionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DiscussionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DiscussionFindUniqueArgs, TData = Prisma.DiscussionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DiscussionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DiscussionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DiscussionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DiscussionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DiscussionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DiscussionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DiscussionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DiscussionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DiscussionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DiscussionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DiscussionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DiscussionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DiscussionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DiscussionGetPayload<T>, Context>) => Promise<Prisma.DiscussionGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DiscussionCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DiscussionCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DiscussionCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DiscussionCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DiscussionCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DiscussionCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DiscussionCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DiscussionCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
