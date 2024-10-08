import BottomContainer from '@/components/BottomContainer'
import Button from '@/components/buttons/Button'
import Loading from '@/components/Loading'
import Header from '@/components/navigation/Header'
import HeaderButton from '@/components/navigation/HeaderButton'
import { ThemedText } from '@/components/ThemedText'
import WalletItem from '@/components/WalletItem'
import { BackgroundColor, BrandColor, TextColor } from '@/constants/Colors'
import { setDefaultWallet } from '@/features/auth/authSlice'
import { useGetAllWalletsQuery } from '@/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useLocale } from '@/hooks/useLocale'
import { useSettings } from '@/hooks/useSetting'
import { TextType } from '@/types/text'
import { abbrValueFormat } from '@/utils/abbrValueFormat'
import { getCurrencySymbol } from '@/utils/getCurrencySymbol'
import { AntDesign } from '@expo/vector-icons'
import { Href } from 'expo-router'
import { Stack, useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Image } from 'react-native'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatValue } from 'react-native-currency-input-fields'

const Page = () => {
  const router = useRouter()
  const { t } = useLocale()
  const dispatch = useAppDispatch()
  const { walletId } = useAppSelector((state) => state.auth)
  const { currencyCode } = useLocale()
  const { decimalSeparator, groupSeparator, showCurrency, disableDecimal, shortenAmount } =
    useSettings().styleMoneyLabel

  const getAllWallets = useGetAllWalletsQuery()

  const handleSelectWallet = (_id: string) => {
    if (walletId === _id) return
    dispatch(setDefaultWallet(_id))
    router.back()
  }

  const totalBalance = useMemo(
    () => getAllWallets.data?.reduce((pre, cur) => pre + cur.balance, 0),
    [getAllWallets.data]
  )
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('wallets.header'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  type='btn'
                  onPress={() => {
                    router.back()
                  }}
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
              headerRight={() => (
                <HeaderButton
                  type='btn'
                  onPress={() => router.navigate('/wallet/edit-wallets' as Href)}
                  button={() => (
                    <Image
                      source={require('@/assets/icons/edit.png')}
                      style={{ width: 22, height: 22, resizeMode: 'contain' }}
                    />
                  )}
                />
              )}
            />
          ),
        }}
      />
      <Loading isLoading={getAllWallets.isFetching} text='Loading...' />
      <View style={{ marginTop: 20, gap: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={styles.totalBalance}>
            <ThemedText color={TextColor.Primary} type={TextType.CalloutSemibold}>
              {t('home.totalbalance')} {`:`}
            </ThemedText>
          </View>
          <ThemedText color={TextColor.Primary} type={TextType.Title20Semibold}>
            {shortenAmount
              ? abbrValueFormat(Number(totalBalance), showCurrency, currencyCode)
              : formatValue({
                  value: String(totalBalance),
                  decimalSeparator: decimalSeparator,
                  groupSeparator: groupSeparator,
                  suffix: showCurrency ? getCurrencySymbol(currencyCode) : '',
                  decimalScale: disableDecimal ? 0 : 2,
                })}
          </ThemedText>
        </View>
        {getAllWallets.data?.map((wallet) => (
          <TouchableOpacity key={wallet._id} onPress={() => handleSelectWallet(wallet._id)}>
            <WalletItem
              name={wallet.name}
              balance={wallet.balance}
              icon={wallet.icon}
              key={wallet._id}
              isDefault={walletId === wallet._id}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <Button
          state='normal'
          size='large'
          text={t('actions.add')}
          onPress={() => router.navigate('/wallet/create-wallet' as Href)}
          type='primary'
        />
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    paddingHorizontal: 24,
  },
  totalBalance: {
    minWidth: 102,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: BrandColor.Gray[200],
  },
})
