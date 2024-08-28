import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthState, SubCategory, Tokens, User, TransactionType } from '@/types/enum'
const initialState: SubCategory = {
  _id: '',
  name: 'Select your category',
  icon: 'https://storage.googleapis.com/my-app-8bc86.appspot.com/icons/file.png',
  belong_to: '',
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<SubCategory>) => {
      state._id = action.payload._id
      state.name = action.payload.name
      state.icon = action.payload.icon
      state.belong_to = action.payload.belong_to
    },
  },
})

export const { setCategory } = categorySlice.actions

const categoryReducer = categorySlice.reducer
export default categoryReducer
