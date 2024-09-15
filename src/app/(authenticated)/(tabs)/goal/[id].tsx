import InfoButton from '@/src/components/buttons/InfoButton'
import TabButtons, { TabButtonType } from '@/src/components/navigation/TabButtons'
import { ThemedText } from '@/src/components/ThemedText'
import TransactionItem from '@/src/components/TransactionItem'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useCurrency } from '@/src/hooks/useCurrency'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { formatter } from '@/src/utils/formatAmount'
import { Href, Link, Stack, useLocalSearchParams } from 'expo-router'
import { useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Plus } from 'react-native-feather'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomizeModalScrollView from '@/src/components/modals/CustomizedModalScrollView'
import Input from '@/src/components/Input'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useGetPlanByIdQuery } from '@/src/features/plan/plan.service'
import { useGetWalletByIdQuery } from '@/src/features/wallet/wallet.service'
import formatDate from '@/src/utils/formatDate'
import { getImg } from '@/src/utils/getImgFromUri'
import { skipToken } from '@reduxjs/toolkit/query'
import Pie from '@/src/components/charts/PieChart'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { AntDesign, FontAwesome6, Foundation } from '@expo/vector-icons'
import MaskInput, { Masks } from 'react-native-mask-input'
import CustomizedModalScrollView from '@/src/components/modals/CustomizedModalScrollView'
import { useAddAmountToGoalMutation } from '@/src/features/plan/plan.service'
import { AMOUNT_VND } from '@/src/constants/Masks'
import AmountItem from '@/src/components/plan/AmountItem'
import Loading from '@/src/components/Loading'

const screenWidth = Dimensions.get('window').width

const Page = () => {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const { id } = useLocalSearchParams()
  const { t } = useLocale()
  const { currentCurrency } = useCurrency()
  const [amount, setAmount] = useState('')
  const [name, setName] = useState('')
  const [index, setIndex] = useState(0)
  const buttons: TabButtonType[] = [
    { title: t('analytics.income') },
    { title: t('analytics.expense') },
  ]
  const { walletId } = useAppSelector((state) => state.auth)
  const { currentCurrency: currency } = useCurrency()

  const { data: goal, isLoading } = useGetPlanByIdQuery({
    walletId,
    planId: id.toString() ?? skipToken,
  })

  const [addAmountToGoal, { data: resultAddAmount, isSuccess }] = useAddAmountToGoalMutation()

  
  useEffect(() => {
    if (resultAddAmount) {
      setAmount('')
      setName('')
      bottomSheetModalRef.current?.dismiss()
    }
  }, [isSuccess])


  
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['70%'], [])

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

  const showModal = () => {
    bottomSheetModalRef.current?.present()
  }

  const transactions = useMemo(() => goal?.attributes.records, [goal]) || []
  const pieChartData = useMemo((): Array<{ value: number; color: string }> => {
    const percent = Math.round(
      ((goal?.attributes.current_amount || 0) / (goal?.attributes.target_amount || 1)) * 100
    )
    return [
      {
        value: percent >= 100 ? 100 : percent,
        color: BrandColor.PrimaryColor[400],
      },
      {
        value: 100 - percent < 0 ? 0 : 100 - percent,
        color: BrandColor.PrimaryColor[50],
      },
    ]
  }, [goal])

  const onAddAmount = async () => {
    await addAmountToGoal({
      walletId,
      planId: id.toString(),
      record: {
        amount: Number(amount),
        title: name,
        createdAt: new Date().toISOString(),
      },
    })
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('goals.goaldetails'),
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
                  onPress={() =>
                    router.navigate(`/(authenticated)/(tabs)/goal/edit-goal?id=${goal?._id}`)
                  }
                  text={t('goals.edit')}
                />
              )}
            />
          ),
        }}
      />
      {<Loading isLoading={isLoading} text='Loading..' />}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.chartSection]}>
          <Pie
            data={pieChartData}
            innerRadius={90}
            centerComponent={() => (
              <View
                style={{
                  flex: 1,
                  padding: 24,
                  gap: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={styles.name}>
                  <ThemedText type={TextType.Caption12Regular} color={TextColor.Secondary}>
                    {goal?.name}
                  </ThemedText>
                </View>
                <ThemedText type={TextType.Title22Bold} color={TextColor.Primary}>
                  {formatter(Number(goal?.attributes.target_amount) || 0, currentCurrency)}
                </ThemedText>
                <ThemedText type={TextType.Caption11Regular} color={TextColor.Secondary}>
                  {`${Math.round(
                    ((goal?.attributes.current_amount || 0) /
                      (goal?.attributes.target_amount || 1)) *
                      100
                  )}% ${t('goals.totalsavings')}`}
                </ThemedText>
              </View>
            )}
          />
        </View>
        <View>
          <InfoButton
            title={t('goals.addamount')}
            icon={() => (
              <Foundation name='dollar-bill' color={BrandColor.PrimaryColor[400]} size={24} />
            )}
            buttonRight={() => <Plus width={20} height={20} color={BrandColor.PrimaryColor[400]} />}
            description={t('goals.amountdescription')}
            onPress={() => showModal()}
          />
        </View>
        <View style={styles.historySection}>
          <View style={styles.headerSection}>
            <ThemedText type={TextType.CalloutSemibold} color={TextColor.Primary}>
              {t('home.history')}
            </ThemedText>
            <Link href={`/(authenticated)/(tabs)/goal/amount-history?id=${goal?._id}`} asChild>
              <Text style={styles.link}>{t('home.seeall')}</Text>
            </Link>
          </View>
          <View>
            {transactions?.length === 0 && (
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t(`home.notransactions`)}
              </ThemedText>
            )}
            {transactions?.map((item, index) => (
              <TouchableOpacity key={index}>
                <AmountItem
                  title={item.title}
                  // category={item.category.name}
                  amount={item.amount}
                  date={
                    formatDate(
                      item?.createdAt ? new Date(item?.createdAt) : new Date(),
                      'dd/mm/yy'
                    )!
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={index}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          handleComponent={null}
          enableOverDrag={false}
          enablePanDownToClose
        >
          <CustomizedModalScrollView
            headerLabel={t('goals.addamount')}
            buttonText={t('goals.add')}
            onPress={onAddAmount}
          >
            <View style={{ paddingVertical: 14, gap: 24 }}>
              <Input
                placeholder={t('goals.titleamount')}
                validationOptions={{
                  required: [true, 'Title is required'],
                  minLength: [3, 'Name must be at least 3 characters'],
                  pattern: [/^[a-zA-Z0-9\s]+$/, 'Name must be alphanumeric'],
                }}
                value={name}
                onChangeText={setName}
              />
              <View style={styles.goalCard}>
                <View style={styles.name}>
                  <ThemedText color={TextColor.Secondary} type={TextType.FootnoteRegular}>
                    {t('goals.amount')}
                  </ThemedText>
                </View>
                <MaskInput
                  value={amount}
                  style={styles.amountText}
                  keyboardType='numeric'
                  autoFocus={false}
                  placeholder={formatter(0, currentCurrency)}
                  placeholderTextColor={TextColor.Placeholder}
                  maskAutoComplete={true}
                  onChangeText={(masked, unmasked) => {
                    setAmount(masked) // you can use the unmasked value as well
                  }}
                  mask={AMOUNT_VND}
                />
              </View>
            </View>
          </CustomizedModalScrollView>
        </BottomSheetModal>
      </ScrollView>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: BackgroundColor.LightTheme.Primary,
  },
  chartSection: {
    width: '100%',
    height: 250,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historySection: {
    marginTop: 18,
    gap: 6,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#2A85FF',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
    textTransform: 'capitalize',
  },
  name: {
    minWidth: 102,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BrandColor.Gray[200],
  },
  goalCard: {
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: screenWidth - 48,
    height: 150,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColor.Gray[300],
  },
  amountText: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.4,
    color: TextColor.Primary,
    textAlign: 'center',
  },
})
