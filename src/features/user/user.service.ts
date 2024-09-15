import { Category, Response, User, UserProfile } from '@/src/types/enum'
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/src/features'


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
  baseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      Response<UserProfile>,
      { userId: string; auth: HeaderRequest; body: UpdateProfileRequest }
    >({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: 'POST',
        body: data.body,
      }),
      invalidatesTags: (result) => [{ type: 'User', id: result?.metadata._id }],
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
     
      }),
      transformResponse: (response: { metadata: UserProfile }) => response.metadata,
      providesTags: (result) => [{ type: 'User', id: result?._id }],
    }),

    createCategory: builder.mutation<Category, CategoryRequest>({
      query: (data) => ({
        url: `/categories`,
        method: 'POST',
        body: data,
      
      }),
      transformResponse: (response: { metadata: Category }) => response.metadata,
      invalidatesTags: [{ type: 'Category', id: 'LIST' }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: `/categories`,
        method: 'GET',
      }),
      transformResponse: (response: { metadata: Category[] }) => response.metadata,
      providesTags: [{ type: 'Category', id: 'LIST' }],
  }),
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery, useCreateCategoryMutation, useGetCategoriesQuery } = userApi
