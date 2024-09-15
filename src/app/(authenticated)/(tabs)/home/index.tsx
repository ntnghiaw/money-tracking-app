import { Link, Stack, useRouter } from 'expo-router'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import { BackgroundColor, BrandColor, NeutralColor, TextColor } from '@/src/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemedText } from '@/src/components/ThemedText'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useGetWalletByIdQuery } from '@/src/features/wallet/wallet.service'
import { editTransaction } from '@/src/features/transaction/transactionSlice'
import { useEffect } from 'react'
import { formatter } from '@/src/utils/formatAmount'
import { Plus } from 'react-native-feather'
import InfoButton from '@/src/components/buttons/InfoButton'
import TransactionItem from '@/src/components/TransactionItem'
import { useCurrency } from '@/src/hooks/useCurrency'
import { getImg } from '@/src/utils/getImgFromUri'
import formatDate from '@/src/utils/formatDate'
import Loading from '@/src/components/Loading'

const Home = () => {
  const router = useRouter()
  const { top } = useSafeAreaInsets()
  const { t } = useLocale()
  const { currentCurrency } = useCurrency()
  const dispatch = useAppDispatch()
  const { walletId } = useAppSelector((state) => state.auth)
  const { isLoading, isSuccess, data, isError, error, isFetching,  } = useGetWalletByIdQuery({
    walletId: walletId,
  })
  
  useEffect(() => {

    if(!isFetching) {
      console.log('isFetching', isFetching)
      if (isError) {
        Alert.alert('Error', error.message)
      }
    }

  }, [isError, isFetching])
  const wallet = data?.metadata
  const transactions = wallet?.transactions
  const recentTransactions = transactions?.slice(0, 6) // get 6 recent transactions
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <View style={[styles.header, { paddingTop: top }]}>
              <View style={styles.logo}>
                <Image source={require('@/src/assets/icons/logo.png')} style={styles.logoImg} />
                <ThemedText color={TextColor.Primary} type={TextType.Title22Bold}>
                  {t('welcome.brand')}
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.notification}>
                <Image
                  source={require('@/src/assets/icons/bell.jpg')}
                  style={styles.notificationIcon}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      {<Loading isLoading={isLoading} text='Loading..' />}

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.balanceSection}>
          <View style={styles.totalBalance}>
            <ThemedText color={TextColor.Secondary} type={TextType.FootnoteRegular}>
              {t('home.totalbalance')}
            </ThemedText>
          </View>
          <ThemedText color={TextColor.Primary} type={TextType.Title28Bold}>
            {formatter(wallet?.balance ?? 0, currentCurrency)}
          </ThemedText>
          {/* <View style={styles.summary}>
            <Entypo name='triangle-up' size={16} color={BrandColor.PrimaryColor[400]} />
            <ThemedText color={BrandColor.PrimaryColor[400]} type={TextType.CaptionSemibold}>
              {`25% `}
            </ThemedText>
            <ThemedText color={TextColor.Secondary} type={TextType.Caption11Regular}>
              {t('home.morethan')}
            </ThemedText>
          </View> */}
          <View style={styles.summary}>
            <Entypo name='triangle-down' size={16} color={BrandColor.Red[500]} />
            <ThemedText color={BrandColor.Red[500]} type={TextType.CaptionSemibold}>
              {`25% `}
            </ThemedText>
            <ThemedText color={BrandColor.Gray[600]} type={TextType.Caption11Regular}>
              {t('home.lessthan')}
            </ThemedText>
          </View>
        </View>
        <View style={styles.operationSection}>
          <TouchableOpacity style={[styles.btn50, { backgroundColor: BrandColor.Red[50] }]}>
            <View style={[styles.icon, { backgroundColor: BrandColor.Red[500] }]}>
              <Ionicons name='chevron-down' size={12} color={BrandColor.Red[500]} />
            </View>

            <ThemedText color={BrandColor.Red[500]} type={TextType.FootnoteSemibold}>
              {t('home.expense')}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn50, { backgroundColor: BrandColor.Blue[50] }]}>
            <View style={[styles.icon, { backgroundColor: BrandColor.PrimaryColor[400] }]}>
              <Ionicons name='chevron-up' size={12} color={BrandColor.PrimaryColor[400]} />
            </View>
            <ThemedText color={BrandColor.PrimaryColor[400]} type={TextType.FootnoteSemibold}>
              {t('home.income')}
            </ThemedText>
          </TouchableOpacity>
          <View style={styles.btn100}>
            <InfoButton
              title={t('home.setyourwallets')}
              icon={() => <Ionicons name='card' size={24} color={BrandColor.PrimaryColor[400]} />}
              buttonRight={() => (
                <Plus width={20} height={20} color={BrandColor.PrimaryColor[400]} />
              )}
              description={t('home.walletdescription')}
              onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallets')}
            />
          </View>
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
            {recentTransactions?.length === 0 && (
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t(`home.notransactions`)}
              </ThemedText>
            )}
            {recentTransactions?.map((item, index) => (
              <TouchableOpacity key={index}>
                <TransactionItem
                  title={item.title}
                  category={item.category.name}
                  amount={item.amount}
                  date={
                    formatDate(
                      item?.createdAt ? new Date(item?.createdAt) : new Date(),
                      'dd/mm/yy'
                    )!
                  }
                  img={() => (
                    <Image
                      source={getImg(item.category.icon)}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  )}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: NeutralColor.GrayLight[100],
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImg: {
    width: 36,
    height: 36,
    borderRadius: 9,
    resizeMode: 'contain',
  },
  notification: {
    height: 38,
    width: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NeutralColor.GrayLight[100],
  },
  notificationIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: BackgroundColor.LightTheme.Primary,
  },
  balanceSection: {
    marginTop: 26,
    alignItems: 'center',
    gap: 8,
  },
  totalBalance: {
    minWidth: 102,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: BrandColor.Gray[200],
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operationSection: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  icon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn50: {
    height: 54,
    width: '49%',
    flexDirection: 'row',
    gap: 4,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    borderColor: BrandColor.Gray[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn100: {
    marginTop: 18,
    width: '100%',
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
  item: {
    minHeight: 64,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: BrandColor.Gray[100],
    borderBottomWidth: 1,
  },
  imgCover: {
    width: 33,
    height: 33,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BrandColor.Gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    gap: 2,
  },
  amount: {
    gap: 2,
    position: 'absolute',
    right: 0,
  },
})
