import BottomContainer from '@/src/components/BottomContainer'
import Button from '@/src/components/buttons/Button'
import Loading from '@/src/components/Loading'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import WalletItem from '@/src/components/WalletItem'
import { BackgroundColor, TextColor } from '@/src/constants/Colors'
import { setDefaultWallet } from '@/src/features/auth/authSlice'
import { useGetAllWalletsQuery } from '@/src/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useLocale } from '@/src/hooks/useLocale'
import { AntDesign } from '@expo/vector-icons'
import { Href } from 'expo-router'
import { Stack, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'



const Page = () => {
  const router = useRouter()
  const {t} = useLocale()
  const dispatch  = useAppDispatch()
  const {walletId} = useAppSelector((state) => state.auth)
  const getAllWallets = useGetAllWalletsQuery()

  

  const handleSelectWallet = (_id: string) => {
    if(walletId === _id) return
    dispatch(setDefaultWallet(_id))
    router.back()
  }
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
                  type='text'
                  onPress={() =>
                    router.navigate('/(authenticated)/(tabs)/wallet/edit-wallets' as Href)
                  }
                  text={t('actions.edit')}
                />
              )}
            />
          ),
        }}
      />
      <Loading isLoading={getAllWallets.isLoading} text='Loading...' />
      <View style={{ marginTop: 40, gap: 20 }}>
        {getAllWallets.data?.map((wallet) => (
          <TouchableOpacity key={wallet._id} onPress={() => handleSelectWallet(wallet._id)}>
            <WalletItem
              name={wallet.name}
              balance={wallet.balance}
              icon='credit-card'
              key={wallet._id}
              isDefault={walletId === wallet._id}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={{position: 'absolute', bottom: 100, alignSelf: 'center'}}>
        <Button
          state='normal'
          size='large'
          text={t('actions.add')}
          onPress={() => router.navigate('/(authenticated)/(tabs)/wallet/create-wallet' as Href)}
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

})