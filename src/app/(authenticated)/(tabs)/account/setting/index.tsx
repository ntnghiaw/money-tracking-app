import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { ThemedText } from '@/src/components/ThemedText'
import { BackgroundColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Href, Stack, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
const Page = () => {
  const { t } = useLocale()
  const router = useRouter()
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
      <View style={styles.form}>
        <Link href={'/(authenticated)/(tabs)/account/setting/money-label' as Href} asChild>
          <TouchableOpacity style={styles.item}>
            <ThemedText type={TextType.SubheadlineRegular} color={TextColor.Primary}>
              {t('settings.styleformoneylabel')}
            </ThemedText>
            <View style={styles.right}>
              <Entypo name='chevron-thin-right' size={20} color={TextColor.Placeholder} />
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: BackgroundColor.LightTheme.Primary,
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
