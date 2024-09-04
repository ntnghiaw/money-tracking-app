import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type {  WalletResponse, Wallet } from '@/src/types/enum'

interface EditTransaction {
  _id: string
}

const initialState: EditTransaction = {
  _id: '',
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    editTransaction: (state, action: PayloadAction<EditTransaction>) => {
     state._id = action.payload._id
  },
  }
})

export const { editTransaction } = transactionSlice.actions

const transactionReducer = transactionSlice.reducer
export default transactionReducer
