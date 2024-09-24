import {
  Response,
  Wallet,
  WalletResponse,
} from '@/src/types/enum'

import config from '@/src/config'
import { appApi } from '@/src/features/api.service'

interface WalletRequest {
  name: string
  currency?: string
  type: 'shared' | 'private'
}

export const walletApi = appApi.injectEndpoints({
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
