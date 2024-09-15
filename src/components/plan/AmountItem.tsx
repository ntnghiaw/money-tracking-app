import { StyleSheet, Text, View } from 'react-native'
import { BrandColor, NeutralColor, TextColor } from '@/src/constants/Colors'
import React from 'react'
import { Image } from 'react-native'
import { TextType } from '@/src/types/text'
import { ThemedText } from '@/src/components/ThemedText'
import { formatter } from '@/src/utils/formatAmount'
import { useCurrency } from '@/src/hooks/useCurrency'

export type AmountItemProps = {
  title: string
  amount: number
  date: string
}

const AmountItem = ({ title, amount, date }: AmountItemProps) => {
  const { currentCurrency } = useCurrency()
  return (
    <View style={styles.item}>
      <View style={styles.info}>
        <ThemedText type={TextType.FootnoteSemibold} color={TextColor.Primary}>
          {title}
        </ThemedText>
        <ThemedText type={TextType.Caption11Regular} color={NeutralColor.Black[300]}>
          {date}
        </ThemedText>
      </View>
      <View style={styles.amount}>
        <ThemedText type={TextType.CalloutSemibold} color={BrandColor.PrimaryColor[400]}>
          {formatter(amount, currentCurrency)}
        </ThemedText>
      </View>
    </View>
  )
}
export default AmountItem
const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  amount: {
    gap: 2,
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
  },
})
