import { Response, User, UserProfile } from '@/types/enum'
import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'



interface HeaderRequest {
  accessToken: string
  userId: string
}


export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api`,
  }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation<Response<UserProfile>, { userId: string; body: UserProfile }>({
      query: (data) => ({
        url: `/users/${data.userId}`,
        method: 'POST',
        body: data.body,
      }),
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
    }),
  }),
})

export const { useUpdateProfileMutation, useGetProfileQuery } = userApi
