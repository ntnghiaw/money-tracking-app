import { AuthResponse, AuthState, Category, Response, Transaction } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { walletApi } from '@/src/features/wallet/wallet.service'

interface ScanImageReceiptsResponse {
  img_url: string
  title: string
  currency_code: string
  date: string
  total: number
}

export const transactionApi = walletApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation<
      Response<Transaction>,
      {
        transaction: Omit<Transaction, '_id'>
        walletId: string
      }
    >({
      query: (body) => ({
        url: `/transactions/${body.walletId}`,
        method: 'POST',
        body: body.transaction,
      }),

      invalidatesTags: (result, error, body) => [
        { type: 'Wallet', id: 'LIST' },
        { type: 'Plan', id: 'LIST' },
      ],
    }),

    getTransactionById: builder.query<Response<Transaction>, { id: string; walletId: string }>({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'GET',
      }),
      providesTags: (result, error, data) => [{ type: 'Transaction', id: data.id }],
    }),
    updateTransaction: builder.mutation<
      Response<Transaction>,
      {
        id: string
        walletId: string
        updatedTransaction: Omit<Transaction, '_id'>
      }
    >({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'POST',
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
      }
    >({
      query: (data) => ({
        url: `/transactions/${data.walletId}/${data.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, data) => [
        { type: 'Transaction', id: data.id },
        { type: 'Wallet', id: 'LIST' },
        { type: 'Plan', id: 'LIST' },
      ],
    }),

    scanImageReceipts: builder.mutation<ScanImageReceiptsResponse, { image: any }>({
      query: (body) => {
        const formData = new FormData()
        formData.append('file', body.image)
        return {
          url: '/transactions/scanReceipt',
          method: 'POST',
          body: formData,
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useCreateTransactionMutation, useDeleteTransactionMutation, useUpdateTransactionMutation, useGetTransactionByIdQuery, useScanImageReceiptsMutation } = transactionApi
