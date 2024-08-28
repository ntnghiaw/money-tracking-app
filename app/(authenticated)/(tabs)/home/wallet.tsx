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
import { SelectCountry } from 'react-native-element-dropdown'
import { useLocalSearchParams, useRouter } from 'expo-router'
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
import { useCreateNewWalletMutation, useGetWalletByIdQuery, useUpdateWalletMutation } from '@/features/wallet/wallet.service'
import { currencySymbol } from '@/utils/formatAmount'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL

const walletTypes = [
  {
    value: WalletType.Private,
    lable: 'Private',
  },
  {
    value: WalletType.Shared,
    lable: 'Shared',
  },
]

const Page = () => {
  const {bottom} = useSafeAreaInsets()
  const router = useRouter()
  const {walletId: _id} = useLocalSearchParams()
  const dispatch = useAppDispatch()
  
  const [name, setName] = useState('')
  const [walletType, setWalletType] = useState<WalletType>(WalletType.Private)
  const [currency, setCurrency] = useState({
    symbol: '₫',
    name: 'Vietnamese Dong',
    code: 'VND',
  })


  const { userId, tokens, isAuthenticated, walletId } = useAppSelector((state) => state.auth)

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
  const { showActionSheetWithOptions } = useActionSheet()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['38%'], [])
  const [createWallet, {data, isSuccess, isLoading}] = useCreateNewWalletMutation()
  const [updateWallet, {data: updatedData, isSuccess: isUpdatedSuccess, isLoading: isUpdatedLoading}] = useUpdateWalletMutation()
  const {data: fetchedData } = useGetWalletByIdQuery({auth: {userId, accessToken: tokens?.accessToken}, walletId: _id?.toString()})

  useEffect(() => {
    if (fetchedData) {
      setName(fetchedData.metadata.name)
      setWalletType(fetchedData.metadata.type)
      setCurrency({
        symbol: currencySymbol(fetchedData.metadata.currency),
        name: fetchedData.metadata.currency,
        code: fetchedData.metadata.currency,
      })
    }
  }, [fetchedData])
  const showModal = async () => {
    bottomSheetModalRef.current?.present()
  }

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

  const handleChangeType = (e: any) => {
    setWalletType(e.value)
  }

  const handleSubmit = async () => {
    if (!name) {
      Alert.alert('Create Wallet Failed', 'Name is required', [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ])
      return
    }
    const wallet = {
      name,
      currency: currency.code,
      type: walletType,
    }
    try {
      console.log(wallet)
      if(_id) {
        await updateWallet({
          walletId: _id?.toString(),
          wallet,
          auth: { userId, accessToken: tokens?.accessToken },
        })
      }
      else {

        await createWallet({
          wallet,
          auth: { userId, accessToken: tokens?.accessToken },
        })
      }
      router.back()
    } catch (error) {
      console.log(error)
    }
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
        {/* {isLoading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Creating Wallet...</Text>
          </View>
        )} */}
        <SafeAreaView style={styles.inner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
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
                        paddingRight: 14,
                      }}
                    >
                      <Text style={{ paddingHorizontal: 12, fontSize: 18, color: Colors.gray }}>
                        {currency.name ? currency.name : 'Currency'}
                      </Text>
                      <ChevronDown width={24} height={24} stroke={Colors.gray} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.box_input}>
                    <Image
                      style={{ width: 40, height: 28 }}
                      source={require('@/assets/images/person2.png')}
                      resizeMode='contain'
                    />
                    <SelectCountry
                      style={styles.dropdown}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      renderRightIcon={() => (
                        <ChevronDown width={24} height={24} stroke={Colors.gray} />
                      )}
                      imageStyle={{ display: 'none' }}
                      maxHeight={200}
                      value={walletType}
                      data={walletTypes}
                      valueField='value'
                      labelField='lable'
                      imageField='image'
                      onChange={handleChangeType}
                    />
                  </View>
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
          <View style={[styles.button, {marginBottom: bottom}]}>
            <Button title={_id ? 'Save' : 'Create'} type='success' handleFn={handleSubmit} />
          </View>
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
    color: Colors.gray,
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
  dropdown: {
    height: screenHeight * 0.06,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    flex: 1,
    marginTop: 2,
    marginHorizontal: 2,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.25,
    marginBottom: 2,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: Colors.gray,
  },
  iconStyle: {
    width: 28,
    height: 28,
    color: Colors.gray,
  },
})

export default Page
