import { AuthResponse, AuthState, Response } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
}


export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/v1/api/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Response<AuthResponse>, LoginRequest>({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<Response<AuthResponse>, RegisterRequest>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<Response<AuthResponse>, AuthState>({
      query: (data) => ({
        url: '/logout',
        method: 'POST',
        headers: {
          Authorization: `${data?.tokens.accessToken}`,
          'x-client-id': `${data?.userId}`,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
