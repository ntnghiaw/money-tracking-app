import { AuthResponse, AuthState, Category, Response, Transaction } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface HeaderRequest {
  accessToken: string
  userId: string
}
export const transactionApi = createApi({
  reducerPath: 'TransactionApi',
  tagTypes: ['Transaction'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api/transactions`,
  }),
  endpoints: (builder) => ({
    
  }),
})

export const {  } = transactionApi
