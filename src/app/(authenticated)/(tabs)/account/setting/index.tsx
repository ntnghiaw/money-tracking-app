import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { ThemedText } from '@/src/components/ThemedText'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { Href, Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { abbrValue, formatValue } from 'react-native-currency-input-fields'
import { Switch } from 'react-native-ui-lib'
import { getCurrencySymbol } from '@/src/utils/getCurrencySymbol'

interface SettingProperties {
  shorten: boolean
  showCurrency: boolean
  showDecimal: boolean
  separator:  {
    decimal: '.' | ',',
    group: '.' | ','
  }
}

const initState: SettingProperties = {
  shorten: false,
  showCurrency: true,
  showDecimal: true,
  separator: {
    decimal: '.',
    group: ',',
  },
}


const Page = () => {
  const { t, currencyCode } = useLocale()
  const [setting, setSetting] = useState<SettingProperties>(initState)
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('settings.settings'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  onPress={() => router.back()}
                  type='btn'
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
            />
          ),
        }}
      />
      <View style={[styles.output]}>
        <ThemedText type={TextType.Title20Semibold} color={TextColor.Primary}>
          {setting.shorten
            ? `${abbrValue(10000000)} ${getCurrencySymbol(currencyCode)}`
            : formatValue({
                value: String(10000000),
                intlConfig: {
                  locale: 'de-DE',
                  currency: currencyCode,
                },
                decimalSeparator: '.',
                groupSeparator: ',',
                suffix: '',
              })}
        </ThemedText>
      </View>
      <View style={styles.form}>
        <View style={styles.item}>
          <ThemedText type={TextType.SubheadlineRegular} color={TextColor.Primary}>
            {t('settings.shortenamount')}
          </ThemedText>
          <View style={styles.right}>
            <Switch
              value={setting.shorten}
              onValueChange={(value: boolean) =>
                setSetting((prev) => ({ ...prev, shorten: value }))
              }
              onColor={BrandColor.PrimaryColor[400]}
              offColor={BrandColor.Gray[100]}
            />
          </View>
        </View>
        <View style={styles.item}>
          <ThemedText type={TextType.SubheadlineRegular} color={TextColor.Primary}>
            {t('settings.showcurrency')}
          </ThemedText>
          <View style={styles.right}>
            <Switch
              value={setting.shorten}
              onValueChange={(value: boolean) =>
                setSetting((prev) => ({ ...prev, shorten: value }))
              }
              onColor={BrandColor.PrimaryColor[400]}
              offColor={BrandColor.Gray[100]}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  output: {
    marginTop: 12,
    height: 90,
    borderRadius: 12,
    width: '100%',
    backgroundColor: BackgroundColor.LightTheme.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop: 12,
    borderRadius: 12,
    gap: 1,
    width: '100%',
    overflow: 'hidden',
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    paddingVertical: 14,
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: BackgroundColor.LightTheme.Primary,
  },
  imageIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  right: {
    position: 'absolute',
    right: 12,
  },
})
