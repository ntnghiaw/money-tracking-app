import { AuthResponse, AuthState, Category, Response, Transaction } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

export const transactionApi = createApi({
  reducerPath: 'TransactionApi',
  tagTypes: ['Transaction'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api/transactions`,
  }),
  endpoints: (builder) => ({
    // scanImageReceipts: builder.mutation<
    //   Response<ScanImageReceiptsResponse>,
    //   { image: any; auth: HeaderRequest }
    // >({
    //   query: (body) => {
    //     console.log(body.image)
    //     return {
    //       url: '/scanReceipt',
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //         authorization: `${body.auth.accessToken}`,
    //         'x-client-id': `${body.auth.userId}`,
    //       },
    //       body: body.image,
    //     }
    //   },
    // }),
  }),
})

export const { useScanImageReceiptsMutation } = transactionApi
