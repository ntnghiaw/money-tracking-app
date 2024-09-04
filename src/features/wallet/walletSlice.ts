import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { WalletResponse, Wallet, WalletsState } from '@/src/types/enum'

const initialState: WalletsState = {
  wallets: [],
  currentWallet: '',
  currentCurrency: 'VND',
}

const walletSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<WalletsState>) {
      state.currentWallet = action.payload.currentWallet
      state.wallets = action.payload.wallets
    },
    setCurrentCurrency(state, action: PayloadAction<string>) {
      state.currentCurrency = action.payload
    }
  },
})

export const { setWallets, setCurrentCurrency } = walletSlice.actions

const walletReducer = walletSlice.reducer
export default walletReducer
