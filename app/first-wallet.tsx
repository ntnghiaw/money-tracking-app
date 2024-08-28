import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Button from '@/components/Button'
import { Colors } from '@/constants/Colors'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { setWallets } from '@/features/wallet/walletSlice'
import { useCreateFirstWalletMutation } from '@/features/wallet/wallet.service'
import { useRouter } from 'expo-router'
import { setAuth } from '@/features/auth/authSlice'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { WalletType } from '@/types/enum'
import { ChevronDown } from 'react-native-feather'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { DefaultTheme } from '@react-navigation/native'
import { Currency } from '@/constants/Currency'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const Page = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState({
    symbol: '',
    name: '',
    code: '',
  })
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const { userId, tokens, isAuthenticated, walletId } = useAppSelector((state) => state.auth)
  const { currentWallet } = useAppSelector((state) => state.wallets)
  const dispatch = useAppDispatch()

  const { showActionSheetWithOptions } = useActionSheet()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['38%'], [])
  const showModal = async () => {
    bottomSheetModalRef.current?.present()
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.3}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior='collapse'
        onPress={() => bottomSheetModalRef.current?.dismiss()}
      />
    ),
    []
  )

  const [createFirstWallet, { data, isSuccess, isError, error, isLoading }] =
    useCreateFirstWalletMutation()

  useEffect(() => {
    if (walletId) {
      router.replace('/(authenticated)/(tabs)/home')
    }
    if (data) {
      dispatch(setWallets({ wallets: [data.metadata._id], currentWallet: data.metadata._id }))
      dispatch(setAuth({ userId, tokens, isAuthenticated, walletId: data.metadata._id }))
    }
  }, [isSuccess])
  const handleCreateWallet = async () => {
    await createFirstWallet({
      wallet: { name, currency: currency.code, type: WalletType.Private },
      auth: { accessToken: tokens.accessToken, userId: userId },
    })
  }

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* {isError && (
          <Text style={{ color: 'red', marginTop: 20 }}>
            {error.data.message ? error.data.message : 'Create Failed! Pls try again'}
          </Text>
        )} */}
        {isLoading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Creating Wallet...</Text>
          </View>
        )}
        <SafeAreaView style={styles.inner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                {!keyboardOpen && (
                  <View>
                    <Image
                      style={styles.image}
                      source={require('@/assets/images/digital-wallet-illustration.png')}
                    />
                  </View>
                )}

                <Text style={styles.header}>Your First Wallet</Text>
                <Text style={styles.description}>
                  Welcome! Set up your first wallet to start tracking your finances easily.
                </Text>
                <View style={styles.inputContainer}>
                  <View style={styles.box_input}>
                    <Image
                      style={{ width: 40, height: 28 }}
                      source={require('@/assets/images/person.png')}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder='Name'
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor={Colors.gray}
                    />
                  </View>
                  <View style={styles.box_input}>
                    <Image
                      style={{ width: 40, height: 28 }}
                      source={require('@/assets/images/balance.png')}
                    />
                    <TouchableOpacity
                      onPress={showModal}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                        paddingRight: 8,
                      }}
                    >
                      <Text style={{ paddingHorizontal: 12, fontSize: 18, color: Colors.gray }}>
                        {currency.name ? currency.name : 'Currency'}
                      </Text>
                      <ChevronDown width={24} height={24} stroke={Colors.gray} />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.button}>
                  <Button title='Create' type='success' handleFn={handleCreateWallet} />
                </View>
                <BottomSheetModal
                  ref={bottomSheetModalRef}
                  index={0}
                  backdropComponent={renderBackdrop}
                  snapPoints={snapPoints}
                  handleComponent={null}
                  enableOverDrag={false}
                  enablePanDownToClose
                >
                  <ScrollView>
                    {Currency.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setCurrency({
                            symbol: item.symbol,
                            name: item.name,
                            code: item.code,
                          })
                          bottomSheetModalRef.current?.dismiss()
                        }}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingVertical: 40,
                          paddingHorizontal: 40,
                        }}
                      >
                        <Text>{item.symbol}</Text>
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        <Text style={{ fontSize: 18 }}>{item.code}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </BottomSheetModal>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.02,
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  header: {
    fontSize: 32,
    color: Colors.primary,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowRadius: 10,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    letterSpacing: 1,
    lineHeight: 24,
  },
  inputContainer: {
    marginTop: 50,
    paddingHorizontal: 16,
  },
  box_input: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.06,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 28,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingLeft: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 12,
    fontSize: 18,
  },

  button: {
    marginTop: 50,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Page
