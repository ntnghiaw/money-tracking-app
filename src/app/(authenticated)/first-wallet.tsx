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

import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { setWallets } from '@/src/features/wallet/walletSlice'
import { useCreateFirstWalletMutation } from '@/src/features/wallet/wallet.service'
import { useRouter } from 'expo-router'
import { setAuth } from '@/src/features/auth/authSlice'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { ChevronDown } from 'react-native-feather'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { DefaultTheme } from '@react-navigation/native'
import { Currency } from '@/src/constants/Currency'
import { BrandColor, NeutralColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { ThemedText } from '@/src/components/ThemedText'
import { TextType } from '@/src/types/text'
import Input from '@/src/components/Input'
import Button from '@/src/components/buttons/Button'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


const Page = () => {
  const router = useRouter()
  const { t } = useLocale()
  const [name, setName] = useState('')
  const [currency, setCurrency] = useState({
    symbol: '',
    name: '',
    code: '',
  })
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const { user, tokens, isAuthenticated, walletId } = useAppSelector((state) => state.auth)
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
      dispatch(setWallets({ wallets: [data._id], currentWallet: data._id }))
      dispatch(setAuth({ user, tokens, isAuthenticated, walletId: data._id }))
    }
  }, [isSuccess])
  const handleCreateWallet = async () => {
    await createFirstWallet({
      wallet: { name, currency: currency.code, type: 'private' },
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
            <ActivityIndicator size='large' color={BrandColor.PrimaryColor[500]} />
            <Text style={{ fontSize: 18, padding: 10 }}>Creating Wallet...</Text>
          </View>
        )}
        <SafeAreaView style={styles.inner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                {!keyboardOpen && (
                  <View>
                    <Image style={styles.image} source={require('@/src/assets/icons/logo.png')} />
                  </View>
                )}
                <View >
                  <ThemedText
                    type={TextType.LargeTitleBold}
                    color={TextColor.Primary}
                    style={{ textAlign: 'center' }}
                  >
                    {t('welcome.yourfirstwallet')}
                  </ThemedText>
                  <ThemedText
                    type={TextType.Caption12Regular}
                    color={TextColor.Secondary}
                    style={{ textAlign: 'center', marginTop: 12 }}
                  >
                    {t('welcome.firstwallet')}
                  </ThemedText>
                </View>
                <View style={{marginTop: 48}}>
                  <Input 
                    value={name}
                    onChangeText={setName}
                    placeholder={t('wallet.placeholdername')}
                    validationOptions={
                      {
                        required: [true, 'Name is required'],
                        minLength: [3, 'Name must be at least 3 characters'],
                        pattern: [/^[a-zA-Z0-9\s]+$/, 'Name must be alphanumeric'],
                      }
                    }
                  />
                  <Button
                    type='primary'
                    size='large'
                    state='normal'
                    text={t('wallet.createwallet')}
                    onPress={handleCreateWallet}
                    style={{backgroundColor: BrandColor.Blue[600], marginTop: 24}}
                  />
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
    backgroundColor: '#EBECEF',
    paddingHorizontal: 24,
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
    color: BrandColor.PrimaryColor[500],
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
    color: NeutralColor.GrayMedium[500],
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
