import { RootState } from '@/src/store/store'
import {
  AuthState,
  Budget,
  FinancialPlan,
  Goal,
  Response,
  Transaction,
  Wallet,
  WalletResponse,
} from '@/src/types/enum'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/src/features'
import config from '@/src/config'

interface WalletRequest {
  name: string
  currency: string
  type: 'shared' | 'private'
}

interface HeaderRequest {
  accessToken: string
  userId: string
}



export const walletApi = createApi({
  reducerPath: 'walletApi',
  tagTypes: ['Wallet', 'Transaction', 'Plan'],
  baseQuery,
  endpoints: (builder) => ({
    createFirstWallet: builder.mutation<
      WalletResponse,
      {
        wallet: WalletRequest
      }
    >({
      query: (body) => ({
        
        url: config.api.endpoints.wallets,
        method: 'POST',
        body: body.wallet,
      }),
      transformResponse: (response: { metadata: WalletResponse }) => response.metadata,
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),
    createNewWallet: builder.mutation<
      Response<WalletResponse>,
      {
        wallet: WalletRequest
      }
    >({
      query: (body) => ({
        url: config.api.endpoints.wallets,
        method: 'POST',
        body: body.wallet,
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),

    updateWallet: builder.mutation<
      Response<WalletResponse>,
      {
        walletId: string
        wallet: Pick<Wallet, 'name' | 'currency'>
      }
    >({
      query: (body) => ({
        url: `${config.api.endpoints.wallets}/${body.walletId}`,
        method: 'POST',
        body: body.wallet,
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),

    deleteWallet: builder.mutation<
      Response<WalletResponse>,
      {
        walletId: string
      }
    >({
      query: (body) => ({
        url: `${config.api.endpoints.wallets}/${body.walletId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Wallet', id: 'LIST' }],
    }),

    getAllWallets: builder.query<Response<Wallet[]>, {}>({
      query: (body) => ({
        url: config.api.endpoints.wallets,
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.metadata
          ? [
              ...result.metadata.map(({ _id }) => ({ type: 'Wallet' as const, id: _id })),
              { type: 'Wallet', id: 'LIST' },
            ]
          : [{ type: 'Wallet' as const, id: 'LIST' }],
    }),

    getWalletById: builder.query<Response<WalletResponse>, { walletId: string }>({
      query: (payload) => ({
        url: `${config.api.endpoints.wallets}/${payload.walletId}`,
        method: 'GET',
      }),

      providesTags: (result) =>
        result?.metadata
          ? [
              { type: 'Wallet', id: result.metadata._id },
              { type: 'Wallet' as const, id: 'LIST' },
            ]
          : [{ type: 'Wallet', id: 'LIST' }],
    }),

    // createTransaction: builder.mutation<
    //   Response<Transaction>,
    //   {
    //     transaction: Omit<Transaction, '_id'>
    //     walletId: string
    //   }
    // >({
    //   query: (body) => ({
    //     url: `/transactions/${body.walletId}`,
    //     method: 'POST',
    //     body: body.transaction,
    //   }),

    //   invalidatesTags: (result, error, body) => [
    //     { type: 'Wallet', id: 'LIST' },
    //     { type: 'Plan', id: 'LIST' },
    //   ],
    // }),

    /* Budget  & Goal */
  }),
})

export const {
  useCreateFirstWalletMutation,
  useCreateNewWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
  useGetWalletByIdQuery,
  useGetAllWalletsQuery,
} = walletApi
