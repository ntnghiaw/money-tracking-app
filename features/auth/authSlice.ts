import AsyncStorage  from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, Tokens, User } from '@/types/enum'
const initialState: AuthState = {
  tokens: {
    accessToken: '',
    refreshToken: '',
  },
  userId:'',
  isAuthenticated: false,
  walletId: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
     const {tokens, userId, walletId} = action.payload
      state.tokens = tokens
      state.userId = userId
      state.isAuthenticated = true
      state.walletId = walletId
    },
    setDefaultWallet (state, action: PayloadAction<string>) {
      state.walletId = action.payload
    },
    clearAuth(state) {
      state.tokens = {
        accessToken: '',
        refreshToken: '',
      }
      state.userId = ''
      state.isAuthenticated = false
    },
  },
 
})



export const { setAuth, clearAuth, setDefaultWallet } = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer


