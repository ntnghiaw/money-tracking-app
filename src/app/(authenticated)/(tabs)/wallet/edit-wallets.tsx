import Button from '@/components/buttons/Button'
import Loading from '@/components/Loading'
import Header from '@/components/navigation/Header'
import HeaderButton from '@/components/navigation/HeaderButton'
import WalletItem from '@/components/WalletItem'
import { BackgroundColor, TextColor } from '@/constants/Colors'
import { useGetAllWalletsQuery } from '@/features/wallet/wallet.service'
import { useAppSelector } from '@/hooks/hooks'
import { useLocale } from '@/hooks/useLocale'
import { AntDesign } from '@expo/vector-icons'
import { Href, Stack } from 'expo-router'
import { useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const Page = () => {
  const router = useRouter()
  const { t } = useLocale()

  const { walletId } = useAppSelector((state) => state.auth)
  const getAllWallets = useGetAllWalletsQuery()

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('wallets.editwallets'),
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
              // headerRight={() => (
              //   <HeaderButton
              //     type='text'
              //     onPress={() =>
              //       router.navigate('/wallet/create-wallet' as Href)
              //     }
              //     text={t('actions.add')}
              //   />
              // )}
            />
          ),
        }}
      />
      <Loading isLoading={getAllWallets.isLoading} text='Loading...' />
      <View style={{ marginTop: 40, gap: 20 }}>
        {getAllWallets.data?.map((wallet) => (
          <TouchableOpacity
            key={wallet._id}
            onPress={() =>
              router.navigate({
                pathname: '/wallet/edit-wallet',
                params: { id: wallet._id },
              })
            }
          >
            <WalletItem
              name={wallet.name}
              balance={wallet.balance}
              icon={wallet.icon}
              key={wallet._id}
              isDefault={false}
            />
          </TouchableOpacity>
        ))}
      </View>
      {/* <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <Button
          state='normal'
          size='large'
          text={t('actions.add')}
          onPress={() => router.navigate('/wallet/create-wallet' as Href)}
          type='primary'
        />
      </View> */}
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
})
