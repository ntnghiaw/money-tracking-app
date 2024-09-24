import TabButtons, { TabButtonType } from '@/src/components/navigation/TabButtons'
import { ThemedText } from '@/src/components/ThemedText'
import TransactionItem from '@/src/components/TransactionItem'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { formatter } from '@/src/utils/formatAmount'
import { Href, Link, Stack } from 'expo-router'
import { useRouter } from 'expo-router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Dropdown } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import formatDate from '@/src/utils/formatDate'
import { getImg } from '@/src/utils/getImgFromUri'
import { BarChart } from 'react-native-gifted-charts'
import { useGetAllTransactionsQuery } from '@/src/features/transaction/transaction.service'
import {
  format,
  startOfDay,
  startOfMonth,
  startOfTomorrow,
  startOfWeek,
  startOfYear,
} from 'date-fns'

const screenWidth = Dimensions.get('window').width

export enum CustomTab {
  Tab1,
  Tab2,
}

const dataChart = [
  { value: 250, label: 'Mon' },
  { value: 500, label: 'Tue' },
  { value: 745, label: 'Wed' },
  { value: 320, label: 'Thu' },
  { value: 600, label: 'Fri' },
  { value: 256, label: 'Sat' },
  { value: 300, label: 'Sun' },
]

const filterOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
  // { label: 'All', value: 'all' },
]

const Page = () => {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1)
  const [selectedIndex, setSelectedIndex] = useState<number>()
  const [filter, setFilter] = useState('daily')
  const [isFocusFilter, setIsFocusFilter] = useState(false)

  const { t } = useLocale()
  const { currencyCode } = useLocale()
  const buttons: TabButtonType[] = [
    { title: t('analytics.expense') },
    { title: t('analytics.income') },
  ]
  const dispatch = useAppDispatch()
  const { walletId } = useAppSelector((state) => state.auth)
  const { isLoading, data, isError } = useGetAllTransactionsQuery({
    walletId: walletId!,
    query: {},
  })

  const transactions = useMemo(
    () =>
      data?.filter((transaction) => {
        return selectedTab === CustomTab.Tab1
          ? transaction.type === 'expense'
          : transaction.type === 'income'
      }),
    [data, selectedTab]
  )
  const filteredTransactions = useMemo(() => {
    if (filter === 'all') return transactions
    const now = new Date()
    const filterDate = new Date()
    switch (filter) {
      case 'daily':
        filterDate.setDate(now.getDate() - 1)
        break
      case 'weekly':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'monthly':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'quarterly':
        filterDate.setMonth(now.getMonth() - 3)
        break
      case 'yearly':
        filterDate.setFullYear(now.getFullYear() - 1)
        break
    }
    return transactions?.filter((transaction) => {
      const date = new Date(transaction.createdAt)
      return date >= filterDate
    })
  }, [transactions, filter])

  const total = useMemo(() => {
    return filteredTransactions?.reduce((acc, cur) => acc + Number(cur.amount), 0)
  }, [filteredTransactions])

  const barChartData = useMemo(() => {
    if (filter === 'daily') {
      const result = []
      const startDate = startOfDay(new Date())
      for (let i = 0; i < 12; i++) {
        const hours = new Date(startDate).setHours(i * 2)
        const amount = filteredTransactions
          ?.filter((transaction) => {
            const date = new Date(transaction.createdAt)
            return date >= new Date(hours) && date < new Date(hours + 2 * 1000 * 60 * 60)
          })
          .reduce((acc, cur) => acc + Number(cur.amount), 0)
        result.push({ value: amount, label: `${i * 2}h`, frontColor: BrandColor.PrimaryColor[200] })
      }
      return result
    } else if (filter === 'weekly') {
      const result = []
      const startDate = startOfWeek(new Date())
      for (let i = 0; i < 7; i++) {
        const currentDay = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + i
        )
        const labelString = format(new Date(currentDay), 'ccc')
        const amount = filteredTransactions
          ?.filter((transaction) => {
            const date = new Date(transaction.createdAt)
            return (
              date >= new Date(currentDay) &&
              date < new Date(currentDay.setDate(currentDay.getDate() + 1))
            )
          })
          .reduce((acc, cur) => acc + Number(cur.amount), 0)

        result.push({
          value: amount,
          label: labelString,
          frontColor: BrandColor.PrimaryColor[200],
        })
      }
      return result
    } else if (filter === 'yearly') {
      const result = []
      const startDate = startOfYear(new Date())
      for (let i = 0; i < 12; i++) {
        const currentMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1)

        const labelString = format(new Date(currentMonth), 'MMM')

        const amount = filteredTransactions
          ?.filter((transaction) => {
            const date = new Date(transaction.createdAt)
            return (
              date >= new Date(currentMonth) &&
              date < new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            )
          })
          .reduce((acc, cur) => acc + Number(cur.amount), 0)
        result.push({
          value: amount,
          label: labelString,
          frontColor: BrandColor.PrimaryColor[200],
        })
      }
      return result
    }
  }, [filteredTransactions, filter])
  const barWith = 150
  //   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  //   const bottomSheetChooseIconModalRef = useRef<BottomSheetModal>(null)

  //   const snapPoints = useMemo(() => ['50%'], [])
  //   const snapPointsChooseIcon = useMemo(() => ['45%'], [])

  //   const renderBackdrop = useCallback(
  //     (props: any) => (
  //       <BottomSheetBackdrop
  //         {...props}
  //         opacity={0.3}
  //         appearsOnIndex={0}
  //         disappearsOnIndex={-1}
  //         pressBehavior='collapse'
  //         onPress={() => bottomSheetModalRef.current?.dismiss()}
  //       />
  //     ),
  //     []
  //   )
  //    const renderBackdropChooseIcon = useCallback(
  //      (props: any) => (
  //        <BottomSheetBackdrop
  //          {...props}
  //          opacity={0.3}
  //          appearsOnIndex={0}
  //          disappearsOnIndex={-1}
  //          pressBehavior='collapse'
  //          onPress={() => bottomSheetModalRef.current?.dismiss()}
  //        />
  //      ),
  //      []
  //    )
  // const showChooseIconModal = async () => {
  //   bottomSheetChooseIconModalRef.current?.present()
  // }
  //   const showModal = async () => {
  //     bottomSheetModalRef.current?.present()
  //   }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ marginTop: 14 }}>
          <TabButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </View>
        <View style={styles.info}>
          <View>
            <ThemedText type={TextType.Title22Bold} color={TextColor.Primary}>
              {formatter(total ?? 0, currencyCode)}
            </ThemedText>
          </View>
          <Dropdown
            style={[styles.dropdown, isFocusFilter && { borderColor: 'blue' }]}
            selectedTextStyle={styles.selectedTextStyle}
            data={filterOptions}
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
            value={filter}
            onFocus={() => setIsFocusFilter(true)}
            onBlur={() => setIsFocusFilter(false)}
            onChange={(item) => {
              setFilter(item.value)
              setIsFocusFilter(false)
            }}
          />
        </View>
        <View style={[styles.chartSection]}>
          <BarChart
            barWidth={barChartData?.length <= 7 ? 22 : 16}
            noOfSections={3}
            barBorderRadius={4}
            data={barChartData}
            yAxisThickness={0}
            xAxisThickness={0}
            // yAxisLabelPrefix='$'
            yAxisTextStyle={{ color: BrandColor.Gray[600], fontSize: 12 }}
            xAxisLabelTextStyle={{ color: BrandColor.Gray[600], fontSize: 12 }}
            isAnimated
            hideRules
            showReferenceLine1={selectedIndex !== undefined}
            referenceLine1Position={barChartData[selectedIndex ?? 0].value}
            referenceLine1Config={{
              color: BrandColor.PrimaryColor[400],
              dashWidth: 6,
              dashGap: 10,
              labelText: `${barChartData[selectedIndex ?? 0].value}`,
              labelTextStyle: {
                top: -20,
                right: 40,
                color: BrandColor.PrimaryColor[400],
              },
            }}
            renderTooltip={(item, index) => {
              setSelectedIndex(index)
            }}
          />
        </View>
        <View></View>
        <View style={styles.historySection}>
          <View style={styles.headerSection}>
            <ThemedText type={TextType.CalloutSemibold} color={TextColor.Primary}>
              {t('home.history')}
            </ThemedText>
            <Link href='/(authenticated)/(tabs)/home/history' asChild>
              <Text style={styles.link}>{t('home.seeall')}</Text>
            </Link>
          </View>
          <View>
            {filteredTransactions?.length === 0 && (
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t(`home.notransactions`)}
              </ThemedText>
            )}
            {filteredTransactions?.map((item, index) => (
              <TouchableOpacity key={index}>
                <TransactionItem
                  title={item.title}
                  category={item.category.name}
                  amount={item.amount}
                  icon={item.category.icon}
                  type={item.type}
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
    // height: 250,
    marginVertical: 20,
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
  info: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
})
