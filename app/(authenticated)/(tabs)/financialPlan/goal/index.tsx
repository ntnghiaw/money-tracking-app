import { StyleSheet, Text, View } from 'react-native'
import { useGetAllPlansQuery } from '@/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import Button from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Page = () => {
  const { bottom } = useSafeAreaInsets()
  const { tokens, userId, walletId } = useAppSelector((state) => state.auth)

  const { data: plans } = useGetAllPlansQuery({
    walletId,
    auth: {
      accessToken: tokens.accessToken,
      userId: userId,
    },
  })

  return (
    <View style={styles.container}>
      {plans?.metadata.length === 0 && (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16 }}>No goals </Text>
        </View>
      )}
      <View style={[styles.button, { bottom: bottom }]}>
        <Button title='New goal' type='success' handleFn={() => console.log(1)} />
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
  },
})
