import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { RootState } from "@/src/store/store"
import config from "@/src/config"


export const baseQuery = fetchBaseQuery({
  baseUrl: config.api.baseUrl,
  timeout: config.api.timeout,
  
  prepareHeaders: (headers, { getState }) => {
    const { user, tokens } = (getState() as RootState).auth

    // If we have a token set in state, let's assume that we should be passing it.
    if (tokens) {
      headers.set('authorization', `${tokens.accessToken}`)
    }
    if (user._id) {
      headers.set('x-client-id', `${user._id}`)
    }
    return headers
  },
})
