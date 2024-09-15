import AsyncStorage  from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, Tokens, User } from '@/src/types/enum'
import { authApi } from '@/src/features/auth/auth.service';
const initialState: AuthState = {
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  user: {} as User,
  isAuthenticated: false,
  walletId: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      const { tokens, user, walletId } = action.payload
      state.tokens = tokens
      state.user = user
      state.isAuthenticated = true
      state.walletId = walletId
    },
    setDefaultWallet(state, action: PayloadAction<string>) {
      state.walletId = action.payload
    },
    clearAuth(state) {
      state.tokens = {
        accessToken: '',
        refreshToken: '',
      }
      state.user = {} as User
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const {tokens, user} = payload
      state.tokens = tokens
      state.user = user
      state.isAuthenticated = true
      state.walletId = user.wallets[0]
    })
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
       state.tokens = {
         accessToken: '',
         refreshToken: '',
       }
       state.user = {} as User
       state.isAuthenticated = false
       state.walletId = ''
    })
  },
})



export const { setAuth, clearAuth, setDefaultWallet } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer


