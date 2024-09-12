import { ThemedText } from '@/src/components/ThemedText'
import { BackgroundColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { DefaultTheme } from '@react-navigation/native'
import { FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { currencies } from '@/src/constants/Currency'
import { useCallback } from 'react'
import { useCurrency } from '@/src/hooks/useCurrency'
const ICON_SIZE = 28

type CurrencyItemProps = {
  icon: string
  name: string
  code: string
  
}


const Item = ({ icon, name, code }: CurrencyItemProps) => {
  const { currentCurrency, changeCurrency } = useCurrency()
  
  return (
    <TouchableOpacity style={styles.item} onPress={() => changeCurrency(code)}>
      <Image source={icon as ImageSourcePropType} style={styles.imageIcon} />
      <ThemedText type={TextType.SubheadlineRegular} color={TextColor.Primary}>
        {name}
      </ThemedText>
      {currentCurrency === code ? (
        <View style={styles.right}>
          <Image source={require('@/src/assets/icons/checked.jpg')} />
        </View>
      ) : null}
    </TouchableOpacity>
  )
}



const Page = () => {
  const { t, currentLanguage, changeLanguage } = useLocale()

  return (
    <View style={styles.container}>
      <FlatList
        data={currencies}
        renderItem={({ item }) => <Item icon={item.icon} code={item.code} name={item.name} />}
        keyExtractor={(item) => item.code}
      />
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
  form: {
    marginTop: 12,
    gap: 1,
    width: '100%',
    overflow: 'hidden',
    backgroundColor: DefaultTheme.colors.background,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 10,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    // backgroundColor: 'red'
  },
  imageIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: BackgroundColor.LightTheme.Secondary,
    resizeMode: 'contain',
  },
  right: {
    position: 'absolute',
    right: 0,
  },
})
