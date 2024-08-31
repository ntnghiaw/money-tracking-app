import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useGetPlanByIdQuery } from '@/features/wallet/wallet.service'
import { Colors, IconColor } from '@/constants/Colors'
import { formatter } from '@/utils/formatAmount'
import { FinancialPlanType, Transaction, TransactionType } from '@/types/enum'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ChevronLeft } from 'react-native-feather'
import { FlatList } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { editTransaction } from '@/features/transaction/transactionSlice'
import Loading from '@/components/Loading'


type MaterialCommunityIconProps = {
  MaterialCommunityIconNames: keyof typeof MaterialCommunityIcons.glyphMap
}


const Item = ({ _id, category, amount, createdAt, type, description }: Transaction) => {
 console.log(category, amount, createdAt, type, description)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { currentCurrency: currency } = useAppSelector((state) => state.wallets)
  return (
    <TouchableOpacity
      style={[styles.item, {backgroundColor: 'white', shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.22,
      }]}
      onPress={() => {
        console.log(_id)
        dispatch(editTransaction({ _id }))
        // dispatch(editTransaction(_id))
        router.navigate('/(authenticated)/(tabs)/transaction')
      }}
    >
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={category.icon as MaterialCommunityIconProps['MaterialCommunityIconNames']}
          size={24}
          color={IconColor[category.icon]}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.description}>
          <Text style={styles.category}>{`Food`} </Text>
          <Text style={styles.createAt}>{new Date(createdAt).toDateString()} </Text>
        </View>

        <Text
          style={[
            styles.amount,
            type === TransactionType.Income ? { color: Colors.primary } : { color: 'red' },
          ]}
        >
          {type === 'expense'
            ? `- ${formatter(amount, currency)}`
            : `+ ${formatter(amount, currency)}`}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
const renderItem = ({ item }: { item: Transaction }) => <Item {...item} />

const Page = () => {
 const router = useRouter()
 const { id } = useLocalSearchParams()
 console.log(id)
 const {userId, tokens , walletId } = useAppSelector((state) => state.auth)
const {currentCurrency: currency} = useAppSelector((state) => state.wallets)
 const {data: fetchedPlan, isLoading} = useGetPlanByIdQuery({
   walletId,
   planId: id?.toString() ,
   auth: {
     accessToken: tokens.accessToken,
     userId: userId
   }
 },{ skip: !id })
  const plan = fetchedPlan?.metadata || {}
  console.log(plan?.attributes)
  return (
    <View style={styles.container}>
     {
       isLoading ? (
         <Loading isLoading={isLoading} text='Loading...'/>
       ) : 
       (
        <View style={{flex: 1,
        }}>
      <View style={styles.budget}>
        <View style={[styles.headerItem, { width: '100%' }]}>
          <Image
            source={{
              uri:
                plan?.type === FinancialPlanType.Budget && 'categories' in plan.attributes
                  ? plan.attributes.categories.icon
                  : '',
            }}
            style={{ height: 24, width: 24 }}
          />
          <View>
            <Text style={styles.nameText}>{plan.name}</Text>
            <Text
              style={{
                fontSize: 12,
                color: Colors.gray,
                fontWeight: '500',
                letterSpacing: 1,
              }}
            >{`${new Date(plan.attributes.start_date).toLocaleDateString()} - ${new Date(
              plan.attributes.due_date
            ).toLocaleDateString()}`}</Text>
          </View>
        </View>

        <View style={styles.itemContent}>
          <View style={styles.itemAmount}>
            <Text
              style={{
                color: Colors.black,
                fontSize: 14,
                letterSpacing: 1,
                fontWeight: '500',
              }}
            >
              {' '}
              {formatter(plan.attributes.target_amount, currency)}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.currentAmount,
                {
                  width: `${Number(
                    (plan.attributes.spent_amount * 100) / plan.attributes.target_amount
                  )}%`,
                },
              ]}
            />
          </View>
          <View style={styles.status}>
            <Text style={{ color: Colors.gray, fontWeight: '400' }}>
              {`${Math.round(
                Math.abs(
                  (new Date(plan.attributes.start_date).getTime() -
                    new Date(plan.attributes.due_date).getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              )} days left`}
            </Text>
            <Text style={{ color: Colors.gray, fontWeight: '400' }}>
              {`${Math.round(
                (plan.attributes.spent_amount * 100) / plan.attributes.target_amount
              )} %`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <Text style={{ color: Colors.black, fontSize: 18, letterSpacing: 2, fontWeight: '500' }}>
          All Transactions
        </Text>
      </View>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          
          data={plan?.attributes.records}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      </View>
      )
     }
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  budget: {
    height: 140,
    backgroundColor: 'white',
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowOpacity: 0.05,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  headerItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  nameText: {
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  itemContent: {
    width: '100%',
    gap: 12,
  },
  itemAmount: {
    alignSelf: 'flex-end',
  },
  progressBar: {
    height: 12,
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  currentAmount: {
    height: 12,
    borderRadius: 8,
    backgroundColor: '#49F064',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 7,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    // backgroundColor: 'red'
  },
  details: {
    width: '82%',
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  description: {
    width: '60%',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  category: {
    lineHeight: 40,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.gray,
  },
  createAt: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.gray,
  },
  amount: {
    width: 'auto',
    fontWeight: '400',
    fontSize: 18,
    color: Colors.danger,
  },
  recordHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})