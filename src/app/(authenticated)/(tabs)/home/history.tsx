import Loading from '@/src/components/Loading'
import { ThemedText } from '@/src/components/ThemedText'
import TransactionItem from '@/src/components/TransactionItem'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useGetAllTransactionsQuery } from '@/src/features/transaction/transaction.service'
import { useGetWalletByIdQuery } from '@/src/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useLocale } from '@/src/hooks/useLocale'
import { Transaction } from '@/src/types/enum'
import { TextType } from '@/src/types/text'
import { getImg } from '@/src/utils/getImgFromUri'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, SectionList } from 'react-native'
import { FlatList, Image, SafeAreaView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { format, getWeekOfMonth, isYesterday, isToday } from 'date-fns'
import { Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { AntDesign } from '@expo/vector-icons'
import ListHeader from '@/src/components/ListHeader'
import { Dropdown } from 'react-native-element-dropdown'
import { formatValue } from 'react-native-currency-input-fields'
import { skipToken } from '@reduxjs/toolkit/query'

const DEFAULT_LIMIT = 20

const periodOptions = [
  { label: 'Daily', value: 'day' },
  { label: 'Weekly', value: 'week' },
  { label: 'Monthly', value: 'month' },
  { label: 'Yearly', value: 'year' },
  { label: 'All', value: 'all' },
]

interface SectionItem {
  [key: string]: Transaction[]
}

const history = () => {
  const router = useRouter()
  const { t } = useLocale()
  const {period: periodParam, categoryId} = useLocalSearchParams() as {period: string, categoryId: string}
  
  const { height } = Dimensions.get('window')
  const { bottom } = useSafeAreaInsets()
  const dispatch = useAppDispatch()
  const { currencyCode } = useLocale()
  const { walletId } = useAppSelector((state) => state.auth)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [offset, setOffset] = useState('')
  const [period, setPeriod] = useState('day')


  useEffect(() => {
    if (periodParam) {
      setPeriod(periodParam)
    }
  }, [periodParam])
  // const query = useMemo(() => ({
  //   offset,
  //   sort: 'asc',
  //   limit: String(DEFAULT_LIMIT),
  //   period,
  // }), [offset, period])

  const { isFetching, data, isError, isLoading, isSuccess, currentData } =
    useGetAllTransactionsQuery({
      walletId,
      query: {
        period,
      },
    })

  const handleOnChange = useCallback((item: { value: string; label: string }) => {
    setPeriod(item.value)
  }, [])

  const sections = useMemo(() => {
    if (data && data.length > 0) {
      if (period === 'day') {
        return [
          {
            title: format(new Date(), 'PP'),
            data: data,
          },
        ]
      } else if (period === 'week') {
        const grouped = data.reduce((acc: { [key: string]: Transaction[] }, item) => {
          const key = format(new Date(item.createdAt), "EEEE', 'dd/MM/yyyy")
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {} as SectionItem)
        return Object.entries(grouped).map(([key, value]) => ({
          title: key,
          data: value,
        }))
      } else if (period === 'month') {
        const grouped = data.reduce((acc, item) => {
          const key = format(new Date(item.createdAt), 'PP')
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {} as SectionItem)
        return Object.entries(grouped).map(([key, value]) => ({
          title: key,
          data: value,
        }))
      } else if (period === 'year') {
        const grouped = data.reduce((acc, item) => {
          const key = format(new Date(item.createdAt), 'MMMM')
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {} as SectionItem)
        return Object.entries(grouped).map(([key, value]) => ({
          title: key,
          data: value,
        }))
      } else if (period === 'all') {
        const grouped = data.reduce((acc, item) => {
          const key = format(new Date(item.createdAt), 'yyyy')
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(item)
          return acc
        }, {} as SectionItem)
        return Object.entries(grouped).map(([key, value]) => ({
          title: key,
          data: value,
        }))
      }
    }
    return [
      {
        title: '',
        data: [],
      },
    ]
  }, [data])
  console.log(data)
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BackgroundColor.LightTheme.Primary,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: t('home.history'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  onPress={() => router.back()}
                  type='btn'
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
            />
          ),
        }}
      />
      <SafeAreaView
        style={{
          marginTop: 12,
          paddingHorizontal: 24,
          backgroundColor: BackgroundColor.LightTheme.Primary,
          height: height * 0.84,
        }}
      >
        <Loading isLoading={isFetching} text='Loading...' />
        <View style={styles.summary}></View>
        <SectionList
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item._id}
              onPress={() =>
                router.push({
                  pathname: '/(authenticated)/(tabs)/home/[id]',
                  params: { id: item._id },
                })
              }
            >
              <TransactionItem
                amount={item.amount}
                type={item.type}
                date={item.createdAt}
                category={item.category.name}
                icon={item.category.icon}
                title={item.title}
              />
            </TouchableOpacity>
          )}
          sections={sections}
          renderSectionHeader={({ section: { title, data } }) => {
            const totalAmount = data.reduce((acc, item) => {
              return item.type === 'income' ? acc + item.amount : acc - item.amount
            }, 0)
            const flag = data.length && period !== 'year' && period !== 'all' 
            return (
              <View style={styles.sectionHeader}>
                <View>
                  <ThemedText type={TextType.FootnoteSemibold} color={TextColor.Primary}>
                    {title}
                  </ThemedText>
                  {flag
                    ? (isToday(new Date(data[0].createdAt)) ||
                        isYesterday(new Date(data[0].createdAt))) && (
                        <ThemedText type={TextType.FootnoteSemibold} color={TextColor.Secondary}>
                          {isToday(new Date(data[0].createdAt))
                            ? t('period.today')
                            : t('period.yesterday')}
                        </ThemedText>
                      )
                    : undefined}
                </View>
                <ThemedText
                  type={TextType.CalloutSemibold}
                  color={
                    Number(totalAmount) < 0 ? BrandColor.Red[300] : BrandColor.PrimaryColor[400]
                  }
                >
                  {data.length !== 0 &&
                    formatValue({
                      value: Math.abs(totalAmount).toString(),
                      intlConfig: {
                        locale: 'de-DE',
                        currency: currencyCode,
                      },
                    })}
                </ThemedText>
              </View>
            )
          }}
          ListHeaderComponent={
            <ListHeader
              title={t('home.alltransactions')}
              rightComponent={
                <Dropdown
                  style={[styles.dropdown]}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={periodOptions}
                  maxHeight={300}
                  labelField='label'
                  valueField='value'
                  renderRightIcon={() => (
                    <AntDesign
                      name='down'
                      size={12}
                      color={BrandColor.PrimaryColor[400]}
                      style={styles.icon}
                    />
                  )}
                  itemTextStyle={{ fontSize: 12 }}
                  value={period}
                  onChange={handleOnChange}
                />
              }
            />
          }
          // ListFooterComponent={
          //   isFetching ? <ActivityIndicator size='large' color={BrandColor.Blue[600]} /> : null
          // }
          // onEndReached={({ distanceFromEnd }) => {
          //   console.log(data)
          //   if (distanceFromEnd < 0) return
          //   if (data && data.length !== 0 && !isFetching) {
          //     setOffset(data[data.length - 1]._id)
          //   }
          // }}
          stickySectionHeadersEnabled={true}
        />
        <View style={{ height: bottom }}></View>
      </SafeAreaView>
    </View>
  )
}
export default history
const styles = StyleSheet.create({
  dropdown: {
    width: 100,
    height: 44,
    borderColor: BrandColor.Gray[300],
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: TextColor.Primary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 4,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    paddingVertical: 12,
  },
  summary: {},
})
