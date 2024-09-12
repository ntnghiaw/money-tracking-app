import { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
import { Provider } from 'react-redux'
import { persistor } from '@/src/store/store'
const { store } = require('@/src/store/store')
import { PersistGate } from 'redux-persist/integration/react'
import { useSegments } from 'expo-router'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import 'intl-pluralrules'
import '@/src/utils/i18n'
import { LocalizationProvider } from '@/src/contexts/LocalizationContext'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const InitialLayout = () => {
  const router = useRouter()
  const segment = useSegments()
  const { isAuthenticated, walletId, tokens, userId } = useAppSelector((state) => state.auth)
  useEffect(() => {
    if (isAuthenticated && !Boolean(walletId)) {
      router.replace('/(authenticated)/first-wallet')
    } else if (isAuthenticated && Boolean(walletId)) {
      router.replace('/(authenticated)/(tabs)/home')
    } else if (!isAuthenticated) {
      console.log('not authenticated')
      router.replace('/')
    }

  }, [isAuthenticated, walletId])

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='register'
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft width={24} height={24} />
            </TouchableOpacity>
          ),
          title: '',
          headerShadowVisible: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name='login'
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft width={24} height={24} />
            </TouchableOpacity>
          ),
          title: '',
          headerShadowVisible: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name='reset-password'
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft width={24} height={24} />
            </TouchableOpacity>
          ),
          title: '',
          headerShadowVisible: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen name='(authenticated)' options={{ headerShown: false }} />
    </Stack>
  )
}

const RootLayoutNav = () => {
  return (
    <ActionSheetProvider>
        <Provider store={store}>
          {/* <> */}
          <LocalizationProvider>
            <StatusBar style='dark' backgroundColor={'white'} />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PersistGate persistor={persistor}>
                <InitialLayout />
              </PersistGate>
            </GestureHandlerRootView>
            {/* </> */}
          </LocalizationProvider>
        </Provider>
    </ActionSheetProvider>
  )
}

export default RootLayoutNav
