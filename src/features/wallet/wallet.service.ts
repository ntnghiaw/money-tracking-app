import {
  AuthState,
  Budget,
  FinancialPlan,
  Goal,
  Response,
  Transaction,
  Wallet,
  WalletResponse,
  WalletType,
} from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface WalletRequest {
  name: string
  currency: string
  type: WalletType
}

interface HeaderRequest {
  accessToken: string
  userId: string
}


interface ScanImageReceiptsResponse {
  img_url: string
  title: string
  currency_code: string
  date: string
  total: number
}

export const walletApi = createApi({
  reducerPath: 'walletApi',
  tagTypes: ['Wallet', 'Transaction', 'Plan'],
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
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),
    createNewWallet: builder.mutation<
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
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),

    updateWallet: builder.mutation<
      Response<WalletResponse>,
      {
        walletId: string
        wallet: Pick<Wallet, 'name' | 'currency'>
        auth: HeaderRequest
      }
    >({
      query: (body) => ({
        url: `/wallets/${body.walletId}`,
        method: 'POST',
        headers: {
          Authorization: `${body.auth.accessToken}`,
          'x-client-id': `${body.auth.userId}`,
        },
        body: body.wallet,
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),

    deleteWallet: builder.mutation<
      Response<WalletResponse>,
      {
        walletId: string
        auth: HeaderRequest
      }
    >({
      query: (body) => ({
        url: `/wallets/${body.walletId}`,
        method: 'DELETE',
        headers: {
          Authorization: `${body.auth.accessToken}`,
          'x-client-id': `${body.auth.userId}`,
        },
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
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
      providesTags: (result) =>
        result?.metadata
          ? [
              { type: 'Wallet', id: 'LIST' },
              { type: 'Wallet' as const, id: 'LIST' },
            ]
          : [{ type: 'Wallet' as const, id: 'LIST' }],
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
      providesTags: (result, error, data) => [{ type: 'Transaction', id: data.id }],
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

      invalidatesTags: (result, error, body) => [
        { type: 'Wallet', id: 'LIST' },
        { type: 'Plan', id: 'LIST' },
      ],
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
        { type: 'Plan', id: 'LIST' },
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
        { type: 'Plan', id: 'LIST' },
      ],
    }),

    /* Budget  & Goal */
    getAllPlans: builder.query<
      Response<FinancialPlan<Goal | Budget>[]>,
      { walletId: string; auth: HeaderRequest }
    >({
      query: (data) => ({
        url: `/financialPlans/${data.walletId}`,
        method: 'GET',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      providesTags: (result) =>
        result?.metadata
          ? [
              { type: 'Plan', id: 'LIST' },
              { type: 'Plan' as const, id: 'LIST' },
            ]
          : [{ type: 'Plan' as const, id: 'LIST' }],
    }),
    getPlanById: builder.query<
      Response<FinancialPlan<Goal | Budget>>,
      { walletId: string; planId: string; auth: HeaderRequest }
    >({
      query: (data) => ({
        url: `/financialPlans/${data.walletId}/${data.planId}`,
        method: 'GET',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      providesTags: (result) =>
        result?.metadata
          ? [
              { type: 'Plan', id: result.metadata._id },
              { type: 'Plan' as const, id: result.metadata._id },
            ]
          : [{ type: 'Plan' as const, id: 'id' }],
    }),

    createPlan: builder.mutation<
      Response<FinancialPlan<Goal | Budget>>,
      { walletId: string; auth: HeaderRequest; body: Omit<FinancialPlan<Goal | Budget>, '_id'> }
    >({
      query: (data) => ({
        url: `/financialPlans/${data.walletId}`,
        method: 'POST',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
        body: data.body,
      }),
      invalidatesTags: (result, error, data) => [{ type: 'Plan', id: 'LIST' }],
    }),

    updatePlan: builder.mutation<
      Response<FinancialPlan<Goal | Budget>[]>,
      {
        walletId: string
        planId: string
        auth: HeaderRequest
        body: Omit<FinancialPlan<Goal | Budget>, '_id'>
      }
    >({
      query: (data) => ({
        url: `/financialPlans/${data.walletId}/${data.planId}`,
        method: 'POST',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
        body: data.body,
      }),
      invalidatesTags: (result, error, data) => [{ type: 'Plan', id: data.planId }],
    }),
    deletePlan: builder.mutation<
      Response<FinancialPlan<Goal | Budget>[]>,
      {
        walletId: string
        planId: string
        auth: HeaderRequest
      }
    >({
      query: (data) => ({
        url: `/financialPlans/${data.walletId}/${data.planId}`,
        method: 'DELETE',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      invalidatesTags: (result, error, data) => [{ type: 'Plan', id: 'LIST' }],
    }),
    scanImageReceipts: builder.mutation<
      Response<ScanImageReceiptsResponse>,
      { image: any; auth: HeaderRequest }
    >({
      query: (body) => {
        const formData = new FormData()
        formData.append('file', body.image)
        return {
          url: '/transactions/scanReceipt',
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data;',
            Authorization: `${body.auth.accessToken}`,
            'x-client-id': `${body.auth.userId}`,
          },
          body: formData,
        }
      },
    }),
  }),
})

export const {
  useCreateFirstWalletMutation,
  useCreateNewWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
  useGetWalletByIdQuery,
  useGetAllWalletsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
  useGetAllPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useScanImageReceiptsMutation
} = walletApi
