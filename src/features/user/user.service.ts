import { Category, Response, User, UserProfile } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/src/features'
import categories from '@/src/constants/Categories'

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

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User', 'Category'],
  baseQuery,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserProfile, FormData>({
      query: (body) => {
        return {
          url: '/users',
          method: 'PATCH',
          body,
        }
      },
      transformResponse: (response: { metadata: UserProfile }) => response.metadata,

      invalidatesTags: (result) => [{ type: 'User', id: result?._id }],
    }),
    getProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      transformResponse: (response: { metadata: UserProfile }) => response.metadata,
      providesTags: (result) => [{ type: 'User', id: result?._id }],
    }),
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery } = userApi
