import { StyleSheet, Text, View } from 'react-native'
import { BrandColor, NeutralColor, TextColor } from '../constants/Colors'
import React from 'react'
import { Image } from 'react-native'
import { TextType } from '../types/text'
import { ThemedText } from './ThemedText'
import { formatter } from '../utils/formatAmount'
import { useCurrency } from '../hooks/useCurrency'

export type TransactionItemProps = {
  title: string
  category: string
  amount: number
  img: () => React.ReactElement
  date: string
}

const TransactionItem = ({title, category, amount, img, date}: TransactionItemProps) => {
  const {currentCurrency} = useCurrency()
  return (
    <View style={styles.item}>
      <View style={styles.imgCover}>
       {img()}
      </View>
      <View style={styles.info}>
        <ThemedText type={TextType.FootnoteSemibold} color={TextColor.Primary}>
          {title}
        </ThemedText>
        <ThemedText type={TextType.Caption11Regular} color={NeutralColor.Black[300]}>
          {category}
        </ThemedText>
      </View>
      <View style={styles.amount}>
        <ThemedText type={TextType.CalloutSemibold} color={BrandColor.PrimaryColor[400]}>
          {formatter(amount, currentCurrency)}
        </ThemedText>
        <ThemedText type={TextType.Caption11Regular} color={NeutralColor.Black[300]}>
          {date}
        </ThemedText>
      </View>
    </View>
  )
}
export default TransactionItem
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
  },
  amount: {
    gap: 2,
    position: 'absolute',
    right: 0,
  },
})
