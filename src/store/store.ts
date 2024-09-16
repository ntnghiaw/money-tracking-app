import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@/src/features/auth/auth.service'
import storage from '@react-native-async-storage/async-storage'
import { combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import authReducer from '@/src/features/auth/authSlice'
import walletReducer from '@/src/features/wallet/walletSlice'
import { walletApi } from '@/src/features/wallet/wallet.service'
import { categoryApi } from '@/src/features/category/category.service'
import categoryReducer from '@/src/features/category/categorySlice'
import transactionReducer from '@/src/features/transaction/transactionSlice'
import { transactionApi } from '@/src/features/transaction/transaction.service'
import userReducer from '@/src/features/user/UserSlice'
import { userApi } from '@/src/features/user/user.service'

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  // blacklist: [authApi.reducerPath]
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),

  [authApi.reducerPath]: authApi.reducer,
  wallets: walletReducer,
  [walletApi.reducerPath]: walletApi.reducer,
  category: categoryReducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  transaction: transactionReducer,
  user: userReducer,
  [userApi.reducerPath]: userApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  // Add the authApi middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, walletApi.middleware, categoryApi.middleware, transactionApi.middleware, userApi.middleware),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
