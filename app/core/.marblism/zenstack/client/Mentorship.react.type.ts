/******************************************************************************
* This file was generated by ZenStack CLI.
******************************************************************************/

/* eslint-disable */
// @ts-nocheck

import type { Prisma } from '@zenstackhq/runtime/models';
import type { TRPCClientErrorLike, TRPCRequestOptions } from '@trpc/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { AnyRouter } from '@trpc/server';

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.MentorshipCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipCreateManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.MentorshipCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MentorshipGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.MentorshipGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MentorshipGetPayload<T>, Context>) => Promise<Prisma.MentorshipGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.MentorshipDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipDeleteManyArgs>(variables?: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.MentorshipDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MentorshipGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.MentorshipGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MentorshipGetPayload<T>, Context>) => Promise<Prisma.MentorshipGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.MentorshipFindFirstArgs, TData = Prisma.MentorshipGetPayload<T> | null>(
            input?: Prisma.SelectSubset<T, Prisma.MentorshipFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MentorshipGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MentorshipFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MentorshipFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MentorshipGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MentorshipGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.MentorshipFindManyArgs, TData = Array<Prisma.MentorshipGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.MentorshipFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.MentorshipGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MentorshipFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.MentorshipFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.MentorshipGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.MentorshipGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.MentorshipFindUniqueArgs, TData = Prisma.MentorshipGetPayload<T> | null>(
            input: Prisma.SelectSubset<T, Prisma.MentorshipFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.MentorshipGetPayload<T> | null, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.MentorshipFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.MentorshipFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.MentorshipGetPayload<T> | null, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.MentorshipGetPayload<T> | null,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.MentorshipUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.MentorshipUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.MentorshipUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.MentorshipGetPayload<T>,
            Context
        >) =>
            Omit<UseTRPCMutationResult<Prisma.MentorshipGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.MentorshipUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.MentorshipUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.MentorshipGetPayload<T>, Context>) => Promise<Prisma.MentorshipGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.MentorshipCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MentorshipCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.MentorshipCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.MentorshipCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.MentorshipCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.MentorshipCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.MentorshipCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.MentorshipCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
