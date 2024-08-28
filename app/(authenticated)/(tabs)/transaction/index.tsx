import Button from '@/components/Button'
import { Colors, IconColor } from '@/constants/Colors'
import { SubCategory, Transaction, TransactionType } from '@/types/enum'
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Keyboard,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesgin from 'react-native-vector-icons/AntDesign'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useMemo, useRef } from 'react'
import MaskInput, { Masks } from 'react-native-mask-input'
import { ChevronRight, Key } from 'react-native-feather'
import formatDate from '@/utils/formatDate'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAppSelector, useAppDispatch } from '@/hooks/hooks'
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} from '@/features/wallet/wallet.service'
import {
  Href,
  Tabs,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
  useNavigation,
} from 'expo-router'
import Loading from '@/components/Loading'
import { useGetAllCategoriesQuery } from '@/features/category/category.service'
import { useGetTransactionByIdQuery } from '@/features/wallet/wallet.service'
import Categories from '@/components/Categories'
import { DismissKeyboard } from '@/components/DismissKeyboard'
import { AMOUNT_VND } from '@/constants/Masks'
import { editTransaction } from '@/features/transaction/transactionSlice'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

type AndroidMode = 'date' | 'time'

const initialTransaction = {
  _id: '',
  amount: '0',
  category: {
    _id: '',
    name: 'Select your category',
    icon: 'crown',
    belong_to: '',
  },
  createdAt: new Date().toString(),
  description: '',
  type: TransactionType.Expense,
}

const Page = () => {
  const router = useRouter()
  const params = useLocalSearchParams()
  const navigation = useNavigation()
  const distpatch = useAppDispatch()
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
  const { bottom } = useSafeAreaInsets()
  const { showActionSheetWithOptions } = useActionSheet()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['33%'], [])
  const [mode, setMode] = useState<AndroidMode>('date')
  const [show, setShow] = useState(false)
  const [transaction, setTransaction] = useState(initialTransaction)
  const [type, setType] = useState<TransactionType>(TransactionType.Expense)
  const { userId, tokens, isAuthenticated, walletId } = useAppSelector((state) => state.auth)
  const { _id } = useAppSelector((state) => state.transaction)
  const {
    data: resData,
    isFetching: isFetchingData,
    isError: isErrorEdit,
  } = useGetTransactionByIdQuery(
    {
      id: _id,
      walletId,
      auth: { accessToken: tokens.accessToken, userId },
    },
    { skip: !_id }
  )
  const [createTransaction, { data, isLoading, isError, isSuccess, error }] =
    useCreateTransactionMutation()

  const [
    updateTransaction,
    {
      data: updateData,
      isLoading: updateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError,
    },
  ] = useUpdateTransactionMutation()

  const [deleteTransaction, {data: deleteRes, isSuccess: isDeleted}] = useDeleteTransactionMutation()

  useEffect(() => {
    if (resData && _id) {
      setTransaction({
        ...resData.metadata,
        amount: resData.metadata.amount.toString(),
      })
    }
  }, [resData])

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     // Do something when the screen blurs
     
  //   })

  //   return unsubscribe
  // }, [navigation])
  useFocusEffect(() => {
    if(params.new === 'true')
      setTransaction(initialTransaction)

  })

  useEffect(() => {
    if (params._id) {
      setTransaction((pre) => ({
        ...pre,
        category: {
          _id: params._id.toString(),
          name: params.name.toString(),
          icon: params.icon.toString(),
          belong_to: params.belong_to.toString(),
        },
      }))
    }
  }, [params._id])

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

  const showModal = async () => {
    bottomSheetModalRef.current?.present()
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date
    setShow(false)
    bottomSheetModalRef.current?.dismiss()
    setTransaction((prev) => ({ ...prev, createdAt: currentDate!.toString() }))
  }

  const showMode = (currentMode: AndroidMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = () => {
    showModal()
    showMode('date')
  }

  const showTimepicker = () => {
    showModal()
    showMode('time')
  }

  const validateTransactionInfo = (transaction: Omit<Transaction, '_id'>) => {
    if (!transaction.amount) return { isValid: false, message: 'Amount is required' }
    if (!transaction.category._id) return { isValid: false, message: 'Category is required' }
    if (transaction.amount <= 0) return { isValid: false, message: 'Amount must be greater than 0' }
    return { isValid: true, message: '' }
  }

  const handleSubmit = async () => {
    const { isValid, message } = validateTransactionInfo({
      amount: parseInt(transaction.amount.replace(/\D/g, '')),
      category: params._id
        ? {
            _id: params._id.toString(),
            name: params.name.toString(),
            icon: params.icon.toString(),
            belong_to: params.belong_to.toString(),
          }
        : transaction.category,
      createdAt: transaction.createdAt.toString(),
      description: transaction.description,
      type,
    })
    if (!isValid) return Alert.alert('Error', message)
    if (_id) {
      await updateTransaction({
        id: _id,
        updatedTransaction: {
          amount: parseInt(transaction.amount.replace(/\D/g, '')),
          category: transaction.category,
          createdAt: transaction.createdAt.toString(),
          description: transaction.description,
          type,
        },
        walletId,
        auth: { accessToken: tokens.accessToken, userId },
      }).unwrap()
    } else {
      await createTransaction({
        transaction: {
          amount: parseInt(transaction.amount.replace(/\D/g, '')),
          category: transaction.category,
          createdAt: transaction.createdAt.toString(),
          description: transaction.description,
          type,
        },
        walletId,
        auth: { accessToken: tokens.accessToken, userId },
      }).unwrap()
    }
    distpatch(editTransaction({ _id: '' }))
    setTransaction(initialTransaction)
    router.back()
  }

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isFetchingData && <Loading isLoading={isFetchingData || isLoading} text='' />}
        <SafeAreaView style={styles.inner}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                style={[
                  styles.formLabel,
                  { borderTopLeftRadius: 12 },
                  type === TransactionType.Expense ? { backgroundColor: 'white' } : null,
                ]}
                onPress={() => {
                  setType(TransactionType.Expense)
                  setTransaction((pre) => ({ ...pre, category: initialTransaction.category }))
                }}
              >
                <Text>Expense</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.formLabel,
                  { borderTopRightRadius: 12 },
                  type === TransactionType.Income ? { backgroundColor: 'white' } : null,
                ]}
                onPress={() => {
                  setType(TransactionType.Income)

                  setTransaction((pre) => ({ ...pre, category: initialTransaction.category }))
                }}
              >
                <Text>Income</Text>
              </Pressable>
            </View>
            <DismissKeyboard>
              <View style={styles.form}>
                <View style={styles.amount}>
                  <Text style={styles.amountLabel}>Amount</Text>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <MaskInput
                      value={transaction.amount}
                      style={[
                        {
                          padding: 12,
                          fontSize: 28,
                        },
                      ]}
                      keyboardType='numeric'
                      autoFocus={false}
                      placeholder='0'
                      maskAutoComplete={true}
                      onChangeText={(masked, unmasked) => {
                        setTransaction((pre) => {
                          return { ...pre, amount: masked }
                        }) // you can use the unmasked value as well
                      }}
                      mask={AMOUNT_VND}
                    />
                    <Text style={{ fontSize: 20 }}>₫</Text>
                  </View>
                </View>
                <View style={styles.detailsContainer}>
                  <View style={styles.item}>
                    <View style={styles.categoryIcon}>
                      <Icon
                        name={transaction.category.icon}
                        size={24}
                        color={
                          transaction.category.icon
                            ? IconColor[transaction.category.icon]
                            : Colors.gray
                        }
                      />
                    </View>
                    <View style={styles.input}>
                      <TouchableOpacity
                        onPress={() =>
                          router.navigate({
                            pathname: '/(authenticated)/(tabs)/transaction/categories',
                            params: { type },
                          })
                        }
                      >
                        <Text style={styles.textInput}>
                          {transaction.category.name
                            ? transaction.category.name
                            : 'Select your category'}
                        </Text>
                        <ChevronRight
                          width={24}
                          height={24}
                          stroke={Colors.gray}
                          style={styles.categoryRightIcon}
                        />
                      </TouchableOpacity>
                      <View style={[styles.separator]} />
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={styles.icon}>
                      <AntDesgin name='exclamationcircle' size={28} color='#559BE6' />
                    </View>
                    <View style={styles.input}>
                      <TextInput
                        style={styles.textInput}
                        placeholder='Description'
                        value={transaction.description}
                        onChange={(e) =>
                          setTransaction((pre) => ({ ...pre, description: e.nativeEvent.text }))
                        }
                      />
                      <View style={styles.separator} />
                    </View>
                  </View>
                  {/* update stick bottom screen */}
                  <View style={[styles.item, { alignItems: 'stretch' }]}>
                    <SafeAreaView style={[styles.calendar]}>
                      <View style={[styles.icon, { position: 'absolute', left: 0, top: 4 }]}>
                        <AntDesgin name='calendar' size={28} color='orange' />
                      </View>
                      <View style={styles.buttonControl}>
                        <TouchableOpacity style={[styles.button]} onPress={showDatepicker}>
                          <Text style={styles.textInput}>
                            {formatDate(new Date(transaction.createdAt), 'dd/mm/yy')}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.button, { paddingLeft: 12 }]}
                          onPress={showTimepicker}
                        >
                          <Text style={styles.textInput}>
                            {formatDate(new Date(transaction.createdAt), 'hh/mm')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </SafeAreaView>
                  </View>
                </View>
              </View>
            </DismissKeyboard>
          </ScrollView>
        </SafeAreaView>
        <View style={{ marginBottom: bottom, gap: 12 }}>
          <Button title={_id ? 'Save' : 'Create'} handleFn={handleSubmit} type='success' />
          {_id && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert('Delete', 'Are you sure you want to delete this transaction?', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteTransaction({ id: _id, walletId, auth: { accessToken: tokens.accessToken, userId } })
                      distpatch(editTransaction({ _id: '' }))
                      router.back()
                    },
                  },
                ])
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#FF0000',
                  fontSize: 16,
                  fontWeight: '500',
                  shadowColor: '#271616',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          )}
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
          <View style={styles.datePicker}>
            {show && (
              <RNDateTimePicker
                testID='dateTimePicker'
                value={new Date(transaction.createdAt)}
                mode={mode}
                display='spinner'
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: screenWidth * 0.04,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.02,
  },
  form: {
    paddingVertical: screenHeight * 0.025,
    // height: screenHeight * 0.66,
    paddingBottom: screenHeight * 0.05,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: screenWidth * 0.04,
    backgroundColor: 'white',
  },
  detailsContainer: {
    marginTop: 20,
    shadowColor: '#ccc',
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: 'white',
  },
  amount: {
    height: screenHeight * 0.16,
    borderRadius: 14,
    backgroundColor: '#E5F2FF',
    width: '100%',
    paddingHorizontal: screenWidth * 0.04,
    paddingVertical: screenHeight * 0.01,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: screenHeight * 0.01,
  },
  amountInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  currency: {
    fontSize: 32,
    lineHeight: 60,
  },
  amountText: {
    fontSize: 32,
    fontWeight: '600',
    paddingVertical: 8,
    paddingRight: screenWidth * 0.03,
  },
  item: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 12,
  },

  input: {
    marginLeft: 12,
    flex: 1,
    position: 'relative',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    opacity: 0.4,
    backgroundColor: Colors.gray,
  },
  textInput: {
    fontSize: 16,
    paddingBottom: 8,
    color: Colors.gray,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  category: {
    marginLeft: 16,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    width: screenWidth * 0.76,
    justifyContent: 'space-between',
  },
  categoryLabel: {
    fontSize: 18,
    color: Colors.gray,
    paddingBottom: 24,
  },
  categoryIcon: {
    marginHorizontal: 5,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
  },
  categoryRightIcon: {
    position: 'absolute',
    right: 0,
  },
  calendar: {
    flex: 1,
    width: '100%',
  },
  buttonControl: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.192)',
  },
  datePicker: {
    maxHeight: screenHeight * 0.15,
  },

  createButton: {
    marginTop: screenHeight * 0.05,
  },
  button: {
    paddingVertical: 12,
  },
  formLabel: {
    backgroundColor: '#fafafa',
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',

    // borderBottomWidth: 0.5,
  },
})
export default Page
