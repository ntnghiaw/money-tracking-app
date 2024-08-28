import { CategorieColors, Colors, IconColor } from '@/constants/Colors'
import React, { useEffect, useMemo } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  Pressable,
} from 'react-native'

import {
  RefreshCcw,
  Users,
  PlayCircle,
  Grid,
  Home,
  ShoppingCart,
  User,
  MoreVertical,
  PlusCircle,
  ChevronRight,
} from 'react-native-feather'
import { PieChart } from 'react-native-gifted-charts'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useGetWalletByIdQuery } from '@/features/wallet/wallet.service'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import Loading from '@/components/Loading'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { formatter } from '@/utils/formatAmount'
import { Transaction, TransactionType } from '@/types/enum'
import { handleStatistic } from '@/utils/handleStatistic'
import { useRouter } from 'expo-router'
import { editTransaction } from '@/features/transaction/transactionSlice'
import { setCurrentCurrency } from '@/features/wallet/walletSlice'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
// percentage of each category
const pieDataInit = [
  {
    value: 100,
    color: Colors.firstCategory,
  },
]

const HomePage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userId, tokens, walletId } = useAppSelector((state) => state.auth)
  const { currentCurrency: currency } = useAppSelector((state) => state.wallets)
  const { isLoading, isSuccess, data } = useGetWalletByIdQuery({
    walletId: walletId,
    auth: {
      userId: userId,
      accessToken: tokens.accessToken,
    },
  })
  useEffect(() => {
    if (data) {
      dispatch(setCurrentCurrency(data.metadata.currency))
    }
  }, [data])

  const wallet = data?.metadata
  const transactions = wallet?.transactions
  console.log(wallet)
  const recentTransactions = transactions?.slice(0, 3) // get 3 recent transactions
  const expenseTransactions = transactions?.filter(
    (transaction) => transaction.type === TransactionType.Expense)
  const { data: categories, total } = useMemo(
    () => handleStatistic(expenseTransactions!),
    [transactions]
  )
  const pieData = useMemo(
    () =>
      categories.map((category, index) => ({
        value: category.percentage,
        color: CategorieColors[index],
      })),
    [categories]
  )

 
  return (
    <SafeAreaView style={[styles.container]}>
      <Loading isLoading={isLoading} text='Loading...' />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.welcome}>
          <View style={styles.form_welcome}>
            <Text style={{ color: '#7D8895' }}>Your wallet name</Text>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'green', minWidth: 100 }}>{wallet?.name}</Text>
              <TouchableOpacity
                onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallets')}
              >
                <RefreshCcw width={20} height={20} stroke={Colors.gray} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.form_balance}>
            <Text style={{ color: '#7D8895' }}>Your Balance</Text>
            {/* ₫ */}
            <Text style={{ fontSize: 20 }}>{formatter(wallet?.balance ?? 0, currency)}</Text>
          </View>
        </View>
        <View style={styles.expense_structure}>
          <View style={styles.expense_text}>
            <Text style={styles.titleText}>Expense structure</Text>
            <Text>Last 30 Days</Text>
          </View>
          <View style={styles.expense_form}>
            <View style={styles.expense_cirle}>
              <PieChart
                data={pieData.length > 0 ? pieData : pieDataInit}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={70}
                innerCircleColor={'#fafafa'}
                centerLabelComponent={() => {
                  return (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, color: Colors.gray, fontWeight: '500' }}>
                        ALL
                      </Text>
                      <Text style={{ fontSize: 14, color: Colors.gray }}>
                        {formatter(total, currency)}
                      </Text>
                    </View>
                  )
                }}
              />
            </View>
            <View style={styles.expense_categories}>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <View style={styles.expense_notation} key={index}>
                    <View
                      style={[styles.small_circle, { backgroundColor: CategorieColors[index] }]}
                    />
                    <Text>
                      {category.name}: {category.percentage}%
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ textAlign: 'center' }}>No transactions</Text>
              )}
              {/* <View style={styles.expense_notation}>
                <View style={[styles.small_circle, { backgroundColor: Colors.firstCategory }]} />
                <Text>Shopping: 47%</Text>
              </View>
              <View style={styles.expense_notation}>
                <View style={[styles.small_circle, { backgroundColor: Colors.secondCategory }]} />
                <Text>Bank Loans: 40%</Text>
              </View>
              <View style={styles.expense_notation}>
                <View style={[styles.small_circle, { backgroundColor: Colors.thirdCategory }]} />
                <Text>Saving: 16%</Text>
              </View>
              <View style={styles.expense_notation}>
                <View style={[styles.small_circle, { backgroundColor: Colors.fourthCategory }]} />
                <Text>Education: 3%</Text>
              </View> */}
            </View>
          </View>
          <Text style={styles.show_more}>Show more</Text>
        </View>
        <View style={styles.operationSection}>
          <View style={styles.operationHeading}>
            <Text style={styles.titleText}>Easy Operations</Text>
            <MoreVertical width={24} height={24} stroke={Colors.gray} />
          </View>
          <View style={styles.operationList}>
            <View style={styles.operation}>
              <TouchableOpacity
                style={styles.opbutton}
                onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallets')}
              >
                <RefreshCcw width={24} height={24} stroke={Colors.gray} />
              </TouchableOpacity>
              <Text style={styles.opText}>Transfer</Text>
            </View>
            <View style={styles.operation}>
              <TouchableOpacity
                style={styles.opbutton}
                onPress={() => router.navigate('/(authenticated)/(tabs)/transaction')}
              >
                <PlusCircle width={32} height={32} stroke={Colors.gray} />
              </TouchableOpacity>
              <Text style={styles.opText}>Add</Text>
            </View>
            <View style={styles.operation}>
              <TouchableOpacity style={styles.opbutton}>
                <Users width={24} height={24} stroke={Colors.gray} />
              </TouchableOpacity>
              <Text style={styles.opText}>Shared</Text>
            </View>
            <View style={styles.operation}>
              <TouchableOpacity style={styles.opbutton}>
                <Grid width={24} height={24} stroke={Colors.gray} />
              </TouchableOpacity>
              <Text style={styles.opText}>More</Text>
            </View>
          </View>
        </View>
        <View style={styles.recent_transactions}>
          <TouchableOpacity onPress={() => router.navigate('/(authenticated)/(tabs)/home/history')}>
            <Text style={styles.titleText}>Recent Transations</Text>
            <ChevronRight
              width={24}
              height={24}
              color={Colors.gray}
              style={{ position: 'absolute', right: 12, top: 8 }}
            />
          </TouchableOpacity>

          {recentTransactions?.map((transaction, index) => (
            <TouchableOpacity
              style={styles.list_transations}
              key={index}
              onPress={() => {
                dispatch(editTransaction({ _id: transaction._id }))
                router.navigate('/(authenticated)/(tabs)/transaction')
              }}
            >
              <View style={styles.transation_icon_container}>
                <Icons
                  name={transaction?.category?.icon}
                  size={32}
                  color={IconColor[transaction.category.icon]}
                />
              </View>
              <View style={styles.transation_title_container}>
                <Text style={styles.transactionCategoryText}>{transaction?.category?.name}</Text>
                <Text style={styles.transactionCreatedAtText}>
                  {new Date(transaction?.createdAt).toDateString()}
                </Text>
              </View>
              <View style={styles.transation_money}>
                {transaction.type === 'income' ? (
                  <Text style={[styles.transactionAmountText, { color: '#50C474' }]}>
                    {formatter(transaction.amount, currency)}
                  </Text>
                ) : (
                  <Text style={[{ color: '#FF5B5B' }, styles.transactionAmountText]}>
                    - {formatter(transaction.amount, currency)}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
          {recentTransactions?.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No transactions</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  welcome: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    // backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  form_welcome: {
    display: 'flex',
    flexDirection: 'column',
    width: screenWidth * 0.45,
    height: screenHeight * 0.1,
    justifyContent: 'space-around',
  },
  form_balance: {
    display: 'flex',
    flexDirection: 'column',
    width: screenWidth * 0.45,
    height: screenHeight * 0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  expense_structure: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.3,
    // backgroundColor: 'white',
    display: 'flex',
  },
  expense_text: {
    width: '100%',
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontWeight: 'bold',
  },
  expense_form: {
    width: '100%',
    height: '75%',
    display: 'flex',
    flexDirection: 'row',
  },
  expense_cirle: {
    width: '50%',
    height: screenHeight * 0.2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  expense_categories: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 30,
  },
  expense_notation: {
    width: '100%',
    height: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  small_circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginRight: 10,
  },
  operationSection: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
  },

  operationHeading: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.05,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opText: {
    fontWeight: '500',
    fontSize: 16,
    color: Colors.gray,
  },
  operationList: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    gap: 8,
  },
  operation: {
    height: screenHeight * 0.06,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  opbutton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  show_more: {
    width: screenWidth * 0.9,
    // backgroundColor:'white',
    textAlign: 'right',
    paddingRight: 30,
    paddingTop: 10,
  },

  recent_transactions: {
    marginTop: 40,
    width: screenWidth * 0.9,
    display: 'flex',

    //  backgroundColor:'white',
  },
  titleText: {
    width: screenWidth * 0.9,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 15,
  },
  list_transations: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.09,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transation_icon_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    backgroundColor: '#F7F7F7',
  },
  transaction_icon: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
  },
  transation_title_container: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.1,
    justifyContent: 'space-between',
  },
  transation_money: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionAmountText: {
    fontSize: 18,
  },
  transactionCategoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionCreatedAtText: {
    fontSize: 14,
  },
})

export default HomePage
