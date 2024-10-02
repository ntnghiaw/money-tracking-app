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
import { Dimensions, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
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
import Loading from '@/src/components/Loading'
import { formatValue } from 'react-native-currency-input-fields'
import { formartGroupedBarChart } from '@/src/utils/analytics'
import { Transaction } from '@/src/types/enum'
import Bar from '@/src/components/charts/Bar'
import InfoButton from '@/src/components/buttons/InfoButton'
import { Ionicons } from '@expo/vector-icons'
import { Plus } from 'react-native-feather'
import { DefaultTheme } from '@react-navigation/native'
import GroupedBars from '@/src/components/charts/GroupedBars'
import { getCurrencySymbol } from '@/src/utils/getCurrencySymbol'
import { useSettings } from '@/src/hooks/useSetting'

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


const Page = () => {
  const { decimalSeparator, groupSeparator, disableDecimal, showCurrency } =
    useSettings().styleMoneyLabel

  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const [period, setPeriod] = useState('month')
  const [isFocusPeriod, setIsFocusPeriod] = useState(false)

  const { t } = useLocale()
  const { currencyCode } = useLocale()

  const dispatch = useAppDispatch()
  const { walletId } = useAppSelector((state) => state.auth)
const periodOptions = [
  { label: t('period.month'), value: 'month' },
  { label: t('period.quarter'), value: 'quarter' },
  { label: t('period.year'), value: 'year' },
  { label: t('period.all'), value: 'all' },
]

  const { isLoading, data, isError, isFetching } = useGetAllTransactionsQuery({
    walletId: walletId!,
    query: {
      period,
      sort: 'desc',
    },
  })

  const balanceTotal = useMemo(() => {
    return data?.reduce((acc, item) => {
      return item.type === 'expense' ? acc - item.amount : acc + item.amount
    }, 0)
  }, [data])
  const dataChart = useMemo(() => formartGroupedBarChart(data as Transaction[], period), [data])

  return (
    <SafeAreaView style={styles.container}>
      <Loading isLoading={isFetching} text='Loading...' />
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.info}>
          <View>
            <ThemedText type={TextType.Title22Bold} color={TextColor.Primary}>
              {formatValue({
                value: String(balanceTotal ?? 0),
                decimalSeparator: decimalSeparator,
                groupSeparator: groupSeparator,
                suffix: showCurrency ? getCurrencySymbol(currencyCode) : '',
                decimalScale: disableDecimal ? 0 : 2,
              })}
            </ThemedText>
          </View>
          <Dropdown
            style={[styles.dropdown, isFocusPeriod && { borderColor: 'blue' }]}
            selectedTextStyle={styles.selectedTextStyle}
            data={periodOptions}
            maxHeight={100}
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
            onFocus={() => setIsFocusPeriod(true)}
            onBlur={() => setIsFocusPeriod(false)}
            onChange={(item) => {
              setPeriod(item.value)
              setIsFocusPeriod(false)
            }}
          />
        </View>
        <View style={[styles.chartSection]}>
          <GroupedBars data={dataChart} />
        </View>
        <View style={styles.btn100}>
          <InfoButton
            title={t('analytics.seereportbyexpenseincome')}
            icon={() => (
              <Image
                source={require('@/src/assets/icons/circle-chart.png')}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
            )}
            buttonRight={() => (
              <Image
                source={require('@/src/assets/icons/arrow-right.png')}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
            )}
            description={t('analytics.seereportbyexpenseincomedescription')}
            onPress={() => router.navigate('/(authenticated)/(tabs)/analytics/type-analytics')}
          />
        </View>
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
            {data?.length === 0 && (
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t(`home.notransactions`)}
              </ThemedText>
            )}
            {data?.slice(0, 8).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.navigate({
                    pathname: '/(authenticated)/(tabs)/home/[id]',
                    params: { id: item._id },
                  })
                }
              >
                <TransactionItem
                  title={item.title}
                  category={item.category.name}
                  amount={item.amount}
                  icon={item.category.icon}
                  type={item.type}
                  date={item?.createdAt}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() =>
            router.navigate({
              pathname: '/(authenticated)/(tabs)/home/history',
              params: {
                period,
              },
            })
          }
        >
          <Image
            source={require('@/src/assets/icons/arrow-down-blue.png')}
            style={{ width: 24, height: 24, resizeMode: 'contain' }}
          />
          <ThemedText type={TextType.FootnoteRegular} color={BrandColor.Blue[600]}>
            {t('actions.more')}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    minHeight: 270,
    marginVertical: 10,
  },
  historySection: {
    marginTop: 18,
    gap: 6,
    flex: 1,
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
  btn100: {
    width: '100%',
  },
  linkBtn: {
    paddingBottom: 90,
    paddingTop: 20,
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
