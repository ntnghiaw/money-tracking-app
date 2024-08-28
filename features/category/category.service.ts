import { AuthResponse, AuthState, Category, Response } from '@/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api/categories`,
  }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Response<Category[]>, {accessToken: string, userId: string }>({
      query: (data) => ({
        url: '',
        method: 'GET',
        headers: {
          Authorization: `${data.accessToken}`,
          'x-client-id': `${data.userId}`,
        }
      }),
  
    }),
   
  }),
})

export const { useGetAllCategoriesQuery } = categoryApi
