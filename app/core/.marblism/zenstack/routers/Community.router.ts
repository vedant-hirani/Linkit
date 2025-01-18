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

        createMany: procedure.input($Schema.CommunityInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.createMany(input as any))),

        create: procedure.input($Schema.CommunityInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.create(input as any))),

        deleteMany: procedure.input($Schema.CommunityInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.deleteMany(input as any))),

        delete: procedure.input($Schema.CommunityInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.delete(input as any))),

        findFirst: procedure.input($Schema.CommunityInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).community.findFirst(input as any))),

        findMany: procedure.input($Schema.CommunityInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).community.findMany(input as any))),

        findUnique: procedure.input($Schema.CommunityInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).community.findUnique(input as any))),

        updateMany: procedure.input($Schema.CommunityInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.updateMany(input as any))),

        update: procedure.input($Schema.CommunityInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).community.update(input as any))),

        count: procedure.input($Schema.CommunityInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).community.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CommunityCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CommunityCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityGetPayload<T>, Context>) => Promise<Prisma.CommunityGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommunityDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommunityDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityGetPayload<T>, Context>) => Promise<Prisma.CommunityGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CommunityFindFirstArgs, TData = Prisma.CommunityGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunityFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunityFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CommunityFindManyArgs, TData = Array<Prisma.CommunityGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunityFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CommunityGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunityFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CommunityGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommunityGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommunityFindUniqueArgs, TData = Prisma.CommunityGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CommunityFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunityGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommunityFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunityGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunityGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CommunityUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CommunityUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityGetPayload<T>, Context>) => Promise<Prisma.CommunityGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CommunityCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunityCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CommunityCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CommunityCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CommunityCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CommunityCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CommunityCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunityCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
