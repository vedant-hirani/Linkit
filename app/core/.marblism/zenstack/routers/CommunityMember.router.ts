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

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.CommunityMemberCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.CommunityMemberCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityMemberGetPayload<T>, Context>) => Promise<Prisma.CommunityMemberGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.CommunityMemberDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.CommunityMemberDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityMemberGetPayload<T>, Context>) => Promise<Prisma.CommunityMemberGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.CommunityMemberFindFirstArgs, TData = Prisma.CommunityMemberGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunityMemberFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunityMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityMemberFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunityMemberFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunityMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunityMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.CommunityMemberFindManyArgs, TData = Array<Prisma.CommunityMemberGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.CommunityMemberFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.CommunityMemberGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityMemberFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.CommunityMemberFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.CommunityMemberGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.CommunityMemberGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.CommunityMemberFindUniqueArgs, TData = Prisma.CommunityMemberGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.CommunityMemberFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.CommunityMemberGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.CommunityMemberFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.CommunityMemberFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.CommunityMemberGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.CommunityMemberGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.CommunityMemberUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.CommunityMemberUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.CommunityMemberUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.CommunityMemberGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.CommunityMemberGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.CommunityMemberUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.CommunityMemberUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.CommunityMemberGetPayload<T>, Context>) => Promise<Prisma.CommunityMemberGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.CommunityMemberCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunityMemberCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.CommunityMemberCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.CommunityMemberCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.CommunityMemberCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.CommunityMemberCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.CommunityMemberCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.CommunityMemberCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
