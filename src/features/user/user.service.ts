import { Response, User, UserProfile } from '@/src/types/enum'
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


export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
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
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery } = userApi
