import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '@/features/auth/auth.service'
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

import authReducer from '@/features/auth/authSlice'
import walletReducer from '@/features/wallet/walletSlice'
import categoryReducer from '@/features/category/categorySlice'
import transactionReducer from '@/features/transaction/transactionSlice'
import userReducer from '@/features/user/UserSlice'
import { userApi } from '@/features/user/user.service'
import { appApi } from '@/features/api.service'
import { rtkQueryErrorLogger } from '@/services/errorHandling.service'

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  // blacklist: [authApi.reducerPath]
}

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  wallets: walletReducer,
  category: categoryReducer,
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
    }).concat(appApi.middleware, authApi.middleware,  userApi.middleware, rtkQueryErrorLogger),
})

export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
