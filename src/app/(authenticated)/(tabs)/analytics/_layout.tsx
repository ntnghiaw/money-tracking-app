import Header from '@/components/navigation/Header'
import HeaderButton from '@/components/navigation/HeaderButton'
import { TextColor } from '@/constants/Colors'
import { useLocale } from '@/hooks/useLocale'
import { AntDesign } from '@expo/vector-icons'
import { Link, Stack, useRouter } from 'expo-router'
import { X } from 'react-native-feather'
const Layout = () => {
  const { t } = useLocale()
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: t('analytics.header'),
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
      <Stack.Screen
        name='type-analytics'
        options={{
          headerTitle: t('analytics.header'),
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
      
    </Stack>
  )
}
export default Layout
