import Loading from '@/src/components/Loading'
import { ThemedText } from '@/src/components/ThemedText'
import TransactionItem from '@/src/components/TransactionItem'
import { BackgroundColor, TextColor } from '@/src/constants/Colors'
import { useGetAllTransactionsQuery } from '@/src/features/transaction/transaction.service'
import { useGetWalletByIdQuery } from '@/src/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import formatDate from '@/src/utils/formatDate'
import { getImg } from '@/src/utils/getImgFromUri'
import { useRouter } from 'expo-router'
import { useMemo } from 'react'
import { Image, SafeAreaView, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'

const history = () => {
  const router = useRouter()
  const { t } = useLocale()
  const dispatch = useAppDispatch()
  const { walletId } = useAppSelector((state) => state.auth)
  const { currencyCode: currency } = useLocale()
  const { isLoading, data, isError } = useGetAllTransactionsQuery({
    walletId,
    query: {}
  })
  const transactions = data ?? []
  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 24,
        backgroundColor: BackgroundColor.LightTheme.Primary,
        flex: 1,
      }}
    >
      {<Loading isLoading={isLoading} text='Loading..' />}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {transactions?.length === 0 && (
          <ThemedText
            type={TextType.FootnoteRegular}
            color={TextColor.Secondary}
            style={{ textAlign: 'center', marginTop: 30 }}
          >
            {t(`home.notransactions`)}
          </ThemedText>
        )}
        {transactions?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: `/(authenticated)/(tabs)/home/[transaction]`,
                params: { id: item._id },
              })
            }
          >
            <TransactionItem
              title={item.title}
              category={item.category.name}
              icon={item.category.icon}
              amount={item.amount}
              type={item.type}
              date={
                formatDate(item?.createdAt ? new Date(item?.createdAt) : new Date(), 'dd/mm/yy')!
              }
             
            />
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default history
const styles = StyleSheet.create({})
