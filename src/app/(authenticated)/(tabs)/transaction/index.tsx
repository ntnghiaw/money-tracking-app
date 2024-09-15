import { BackgroundColor, BrandColor, NeutralColor, TextColor } from '@/src/constants/Colors'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { CustomTab } from '@/src/app/(authenticated)/(tabs)/analytics/index'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocale } from '@/src/hooks/useLocale'
import { useCurrency } from '@/src/hooks/useCurrency'
import TabButtons, { TabButtonType } from '@/src/components/navigation/TabButtons'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import Input from '@/src/components/Input'
import MaskInput from 'react-native-mask-input'
import { AMOUNT_VND } from '@/src/constants/Masks'
import { formatter } from '@/src/utils/formatAmount'
import formatDate from '@/src/utils/formatDate'
import { SafeAreaView } from 'react-native'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { ChevronDown } from 'react-native-feather'
import { ThemedText } from '@/src/components/ThemedText'
import { TextType } from '@/src/types/text'
import { Dimensions } from 'react-native'
import { getImg } from '@/src/utils/getImgFromUri'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useGetAllCategoriesQuery } from '@/src/features/category/category.service'
import Button from '@/src/components/buttons/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Category, Transaction } from '@/src/types/enum'
import { AntDesign, Entypo, Fontisto } from '@expo/vector-icons'



import {
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
} from '@/src/features/transaction/transaction.service'

import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { editTransaction } from '@/src/features/transaction/transactionSlice'
import * as MediaLibrary from 'expo-media-library'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'

type AndroidMode = 'date' | 'time'
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const initialTransaction = {
  _id: '',
  amount: '0',
  title: '',
  category: {
    _id: '',
    name: 'Select your category',
    icon: 'crown',
    type: 'expense',
  } as Category,
  createdAt: new Date().toString(),
  description: '',
  type: 'expense',
}

const Page = () => {
  const { user, tokens, isAuthenticated, walletId } = useAppSelector((state) => state.auth)
  const { bottom } = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1)
  const [transaction, setTransaction] = useState(initialTransaction)
  const [mode, setMode] = useState<AndroidMode>('date')
  const [show, setShow] = useState(false)
  const { t } = useLocale()
  const { currentCurrency } = useCurrency()
  const buttons: TabButtonType[] = [
    { title: t('transaction.income') },
    { title: t('transaction.expense') },
  ]
  const bottomSheetCategoryModalRef = useRef<BottomSheetModal>(null)
  const snapPointsCategory = useMemo(() => ['85%'], [])

  const { data: categoriesRes } = useGetAllCategoriesQuery()
  const categoriesFilteredByType = useMemo(
    () =>
      categoriesRes?.filter((category) =>
        selectedTab === 0 ? category.type === 'income' : category.type === 'expense'
      ),
    [categoriesRes, selectedTab]
  )
  const renderBackdropCategoryModal = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.3}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior='collapse'
        onPress={() => bottomSheetCategoryModalRef.current?.dismiss()}
      />
    ),
    []
  )

  const showCategoryModal = async () => {
    bottomSheetCategoryModalRef.current?.present()
  }

  const chooseCategoryHandler = (category: Category) => {
    setTransaction((pre) => ({
      ...pre,
      category: {
        _id: category._id,
        name: category.name,
        icon: category.icon,
        type: category.type,
      },
    }))
    bottomSheetCategoryModalRef.current?.dismiss()
  }

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date
    setShow(false)
    setTransaction((prev) => ({ ...prev, createdAt: currentDate!.toString() }))
  }

  const showMode = (currentMode: AndroidMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  const router = useRouter()
  const { img_url, total, title, createdAt } = useLocalSearchParams()
  const distpatch = useAppDispatch()
  const { _id } = useAppSelector((state) => state.transaction)
  const {
    data: resData,
    isFetching: isFetchingData,
    isError: isErrorEdit,
  } = useGetTransactionByIdQuery(
    {
      id: _id,
      walletId,
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
  const { data: categories } = useGetAllCategoriesQuery()

  useEffect(() => {
    console.log(img_url, total, title, createdAt)
    if (img_url && total && title && createdAt) {
      setTransaction((pre) => ({
        ...pre,
        amount: total.toString(),
        title: title.toString(),
        createdAt: createdAt.toString(),
      }))
    }
    if (data && isSuccess) {
      Alert.alert('Success', 'Transaction has been created successfully')
      setTransaction(initialTransaction)
    }
  }, [isSuccess, img_url, total, title, createdAt])

  const validateTransactionInfo = (transaction: Omit<Transaction, '_id'>) => {
    if (!transaction.amount) return { isValid: false, message: 'Amount is required' }
    if (!transaction.title) return { isValid: false, message: 'Title is required' }

    if (!transaction.category._id) return { isValid: false, message: 'Category is required' }
    if (transaction.amount <= 0) return { isValid: false, message: 'Amount must be greater than 0' }
    return { isValid: true, message: '' }
  }

  const handleSubmit = async () => {
    const { isValid, message } = validateTransactionInfo({
      amount: parseInt(transaction.amount.replace(/\D/g, '')),
      title: transaction.title,
      category: {
        _id: transaction.category._id,
        name: transaction.category.name,
        icon: transaction.category.icon,
        type: selectedTab === 0 ? 'income' : 'expense',
      },
      createdAt: transaction.createdAt.toString(),
      description: transaction.description,
      type: selectedTab === 0 ? 'income' : 'expense',
    })
    if (!isValid) return Alert.alert('Error', message)
    if (_id) {
      await updateTransaction({
        id: _id,
        updatedTransaction: {
          amount: parseInt(transaction.amount.replace(/\D/g, '')),
          title: transaction.title,
          category: transaction.category,
          createdAt: transaction.createdAt.toString(),
          description: transaction.description,
          type: selectedTab === 0 ? 'income' : 'expense',
        },
        walletId,
      }).unwrap()
    } else {
      await createTransaction({
        transaction: {
          amount: parseInt(transaction.amount.replace(/\D/g, '')),
          title: transaction.title,
          category: transaction.category,
          createdAt: transaction.createdAt.toString(),
          description: transaction.description,
          type: selectedTab === 0 ? 'income' : 'expense',
        },
        walletId,
      }).unwrap()
    }
    distpatch(editTransaction({ _id: '' }))
    setTransaction(initialTransaction)
    router.back()
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('transaction.newtransaction'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  type='btn'
                  onPress={() => router.back()}
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
              headerRight={() => (
                <HeaderButton
                  type='text'
                  onPress={() => router.navigate('/(authenticated)/(tabs)/transaction/camera')}
                  text={t('transaction.scan')}
                />
              )}
            />
          ),
        }}
      />
      <SafeAreaView style={styles.inner}>
        <View style={{ paddingVertical: 32, gap: 24 }}>
          <TabButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>
        <View>
          <View style={{ marginVertical: 12, marginBottom: 30 }}>
            <MaskInput
              value={transaction.amount}
              style={[
                {
                  fontSize: 46,
                  fontWeight: '700',
                  lineHeight: 41,
                  letterSpacing: -0.4,
                  color: TextColor.Primary,
                  textAlign: 'center',
                },
              ]}
              keyboardType='numeric'
              autoFocus={false}
              placeholder={formatter(0, currentCurrency)}
              placeholderTextColor={TextColor.Placeholder}
              maskAutoComplete={true}
              onChangeText={(masked, unmasked) => {
                setTransaction((pre) => {
                  return { ...pre, amount: masked }
                }) // you can use the unmasked value as well
              }}
              mask={AMOUNT_VND}
            />
          </View>

          <Input
            placeholder={t('transaction.addtitle')}
            value={transaction.title}
            buttonLeft={() => <Image source={require('@/src/assets/icons/note.png')} />}
            onChangeText={(text) => {
              setTransaction((pre) => {
                return { ...pre, title: text }
              })
            }}
          />
          <Pressable onPress={showCategoryModal} style={styles.button}>
            <Image
              source={
                transaction.category._id
                  ? getImg(transaction.category.icon)
                  : require('@/src/assets/icons/grid2.png')
              }
              style={styles.iconCategory}
            />
            <View style={{ flex: 8 }}>
              <ThemedText type={TextType.FootnoteRegular} color={TextColor.Secondary}>
                {transaction.category._id ? transaction.category.name : t('transaction.categories')}
              </ThemedText>
            </View>
            <ChevronDown width={24} height={24} color={TextColor.Placeholder} />
          </Pressable>

          <SafeAreaView>
            <View style={{ position: 'absolute', left: 0, top: 4 }}></View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Pressable onPress={showDatepicker} style={[styles.button, { width: '49%' }]}>
                <Fontisto name='date' size={20} color={BrandColor.PrimaryColor[400]} />
                <View style={{ flex: 3 }}>
                  <Text>{formatDate(new Date(transaction.createdAt), 'dd/mm/yy')}</Text>
                </View>
                <ChevronDown width={24} height={24} color={TextColor.Placeholder} />
              </Pressable>
              <TouchableOpacity style={[styles.button, { width: '49%' }]} onPress={showTimepicker}>
                <Entypo name='clock' size={22} color={BrandColor.PrimaryColor[400]} />
                <View style={{ flex: 3 }}>
                  <Text>{formatDate(new Date(transaction.createdAt), 'hh/mm')}</Text>
                </View>
                <ChevronDown width={24} height={24} color={TextColor.Placeholder} />
              </TouchableOpacity>
            </View>
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
          </SafeAreaView>
        </View>
      </SafeAreaView>
      <View style={{ marginBottom: bottom + 100 }}>
        <Button
          type={'primary'}
          text={t('transaction.create')}
          size={'large'}
          state={'normal'}
          onPress={handleSubmit}
          isLoading={isLoading || updateLoading}
        />
      </View>

      <BottomSheetModal
        ref={bottomSheetCategoryModalRef}
        index={0}
        backdropComponent={renderBackdropCategoryModal}
        snapPoints={snapPointsCategory}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <BottomSheetScrollView style={styles.bottomSheetModal}>
          <View style={styles.header}>
            <View style={styles.horizontalBar}></View>
            <ThemedText type={TextType.CalloutSemibold} color={TextColor.Primary}>
              {t('transaction.categories')}
            </ThemedText>
          </View>
          <View style={{ borderRadius: 14, marginTop: 24, overflow: 'hidden' }}>
            <ScrollView
              style={{
                width: screenWidth - 48,
                borderColor: BrandColor.Gray[100],
              }}
            >
              {categoriesFilteredByType?.map((category) => (
                <TouchableOpacity
                  key={category._id}
                  style={styles.item}
                  onPress={() => chooseCategoryHandler(category)}
                >
                  <View style={styles.iconCover}>
                    <Image source={getImg(category.icon)} style={styles.iconCategory} />
                  </View>
                  <ThemedText type={TextType.SubheadlineRegular} color={TextColor.Primary}>
                    {category.name}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeutralColor.White[50],
    paddingHorizontal: 24,
  },
  item: {
    width: '100%',
    backgroundColor: BrandColor.Gray[50],
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomColor: BrandColor.Gray[100],
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCover: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BrandColor.Gray[200],
    backgroundColor: BackgroundColor.LightTheme.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCategory: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  bottomSheetModal: {
    width: screenWidth,
    paddingHorizontal: 24,
    borderStartStartRadius: 24,
    flex: 1,
  },
  header: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 12,
    borderBottomColor: NeutralColor.GrayLight[100],
    borderBottomWidth: 1,
  },
  horizontalBar: {
    width: '20%',
    height: 6,
    backgroundColor: NeutralColor.GrayLight[50],
    borderRadius: 18,
  },
  datePicker: {
    maxHeight: screenHeight * 0.15,
  },
  button: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: screenWidth - 48,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColor.Gray[300],
  },
  inner: {
    flex: 1,
  },
})
