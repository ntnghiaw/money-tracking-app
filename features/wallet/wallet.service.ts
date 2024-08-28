import { AuthState, Response, Transaction, Wallet, WalletResponse, WalletType } from '@/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface WalletRequest {
  name: string
  currency: string
  type: WalletType.Private
}

interface HeaderRequest {
  accessToken: string
  userId: string
}

export const walletApi = createApi({
  reducerPath: 'walletApi',
  tagTypes: ['Wallet', 'Transaction'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api`,
  }),
  endpoints: (builder) => ({
    createFirstWallet: builder.mutation<
      Response<WalletResponse>,
      {
        wallet: WalletRequest
        auth: HeaderRequest
      }
    >({
      query: (body) => ({
        url: '/wallets',
        method: 'POST',
        headers: {
          Authorization: `${body.auth.accessToken}`,
          'x-client-id': `${body.auth.userId}`,
        },
        body: body.wallet,
      }),
    }),
    getWalletById: builder.query<
      Response<WalletResponse>,
      { walletId: string; auth: HeaderRequest }
    >({
      query: (payload) => ({
        url: `/wallets/${payload.walletId}`,
        method: 'GET',
        headers: {
          Authorization: `${payload.auth.accessToken}`,
          'x-client-id': `${payload.auth.userId}`,
        },
      }),

      providesTags: (result) =>
        result?.metadata
          ? [
              { type: 'Wallet', id: result.metadata._id },
              { type: 'Wallet' as const, id: 'LIST' },
            ]
          : [{ type: 'Wallet' as const, id: 'LIST' }],
    }),
    getTransactionById: builder.query<
      Response<Transaction>,
      { id: string; walletId: string; auth: HeaderRequest }
    >({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'GET',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      providesTags: (result) => [{ type: 'Transaction', id: result!.metadata._id }],
    }),

    createTransaction: builder.mutation<
      Response<Transaction>,
      {
        transaction: Omit<Transaction, '_id'>
        walletId: string
        auth: HeaderRequest
      }
    >({
      query: (body) => ({
        url: `/transactions/${body.walletId}`,
        method: 'POST',
        headers: {
          Authorization: `${body.auth.accessToken}`,
          'x-client-id': `${body.auth.userId}`,
        },
        body: body.transaction,
      }),

      invalidatesTags: (result, error, body) => [{ type: 'Wallet', id: 'LIST' }],
    }),

    updateTransaction: builder.mutation<
      Response<Transaction>,
      {
        id: string
        walletId: string
        auth: HeaderRequest
        updatedTransaction: Omit<Transaction, '_id'>
      }
    >({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'POST',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
        body: data.updatedTransaction,
      }),
      invalidatesTags: (result, error, data) => [
        { type: 'Transaction', id: data.id },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),

    deleteTransaction: builder.mutation<
      Response<Transaction>,
      {
        id: string
        walletId: string
        auth: HeaderRequest
      }
    >({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      invalidatesTags: (result, error, data) => [
        { type: 'Transaction', id: data.id },
        { type: 'Wallet', id: 'LIST' },
      ],
    }),

    getAllWallets: builder.query<
      Response<Wallet[]>,
      {
        auth: HeaderRequest
      }
    >({
      query: (body) => ({
        url: `/wallets`,
        method: 'GET',
        headers: {
          Authorization: `${body.auth.accessToken}`,
          'x-client-id': `${body.auth.userId}`,
        },
      }),
    }),
  }),
})

export const {
  useCreateFirstWalletMutation,
  useGetWalletByIdQuery,
  useCreateTransactionMutation,
  useGetAllWalletsQuery,
  useUpdateTransactionMutation,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} = walletApi
