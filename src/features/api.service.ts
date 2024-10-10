import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/features'
import config from '@/config'

export const appApi = createApi({
  reducerPath: 'appApi',
  tagTypes: ['Wallet', 'Transaction', 'Plan', 'Category', 'User'],
  baseQuery,
  endpoints: (builder) => ({
}),
})


