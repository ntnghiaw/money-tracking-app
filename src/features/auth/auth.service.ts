import { AuthResponse, AuthState, Response } from '@/src/types/enum'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseQuery} from '@/src/features'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  email: string
  password: string
}


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body,
        }
      },
      transformResponse: (response: { metadata: AuthResponse }) => response.metadata,
    }),
    register: builder.mutation<Response<AuthResponse>, RegisterRequest>({
      query: (body) => ({
        url: '/auth/signup',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<Response<AuthResponse>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
