import { Category, Response, User, UserProfile } from '@/src/types/enum'
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'



interface HeaderRequest {
  accessToken: string
  userId: string
}

interface UpdateProfileRequest {
  name: string
  dob?: string
  gender?: string
  avatar_url?: string
}


interface CategoryRequest {
  name: string
  icon: string
  type: 'expense' | 'income'
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'Category'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api`,
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      Response<UserProfile>,
      { userId: string; auth: HeaderRequest; body: UpdateProfileRequest }
    >({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: 'POST',
        body: data.body,
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.metadata._id }],
    }),
    getProfile: builder.query<Response<UserProfile>, { auth: HeaderRequest }>({
      query: (data) => ({
        url: `/users`,
        method: 'GET',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      providesTags: (result) => [{ type: 'User', id: result?.metadata._id }],
    }),

    createCategory: builder.mutation<Response<Category>, { auth: HeaderRequest; body: CategoryRequest }>({
      query: (data) => ({
        url: `/categories`,
        method: 'POST',
        body: data.body,
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    getCategories: builder.query<Response<Category[]>, { auth: HeaderRequest }>({
      query: (data) => ({
        url: `/categories`,
        method: 'GET',
        headers: {
          Authorization: `${data.auth.accessToken}`,
          'x-client-id': `${data.auth.userId}`,
        },
      }),
      providesTags: [{ type: 'Category', id: 'LIST' }],
  }),
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery, useCreateCategoryMutation, useGetCategoriesQuery } = userApi
