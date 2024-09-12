import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Link, router, Tabs, useRouter } from 'expo-router'
import {
  User,
  BarChart2,
  List,
  PlusCircle,
  Home,
  ChevronLeft,
  PlusSquare,
} from 'react-native-feather'
import { BrandColor, Colors, NeutralColor, TextColor } from '@/src/constants/Colors'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TabBar from '@/src/components/navigation/TabBar'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { useLocale } from '@/src/hooks/useLocale'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

const Layout = () => {
  const router = useRouter()
  const { bottom } = useSafeAreaInsets()
  const {t} = useLocale()
  return (
    <BottomSheetModalProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ tabBarHideOnKeyboard: true }}>
        <Tabs.Screen
          name='home'
          options={{
            tabBarLabel: t('tabLabel.home'),
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              if (focused) {
                return <Image source={require('@/src/assets/icons/home-active.jpg')} />
              }
              return <Image source={require('@/src/assets/icons/home.jpg')} />
            },
          }}
        />
        <Tabs.Screen
          name='analytics'
          options={{
            headerShown: false,
            tabBarLabel: t('tabLabel.analytics'),
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({ size, focused, color }) => {
              if (focused) {
                return <Image source={require('@/src/assets/icons/analytics-active.jpg')} />
              }
              return <Image source={require('@/src/assets/icons/analytics.jpg')} />
            },
          }}
        />
        <Tabs.Screen
          name='transaction'
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Image
                  source={require('@/src/assets/icons/plus-circle.jpg')}
                  style={{ paddingTop: 12 }}
                />
              )
            },
            headerTitle: t('transaction.newtransaction'),
            header: (props) => (
              <Header
                {...props}
                headerLeft={() => (
                  <HeaderButton
                    type='btn'
                    onPress={() => router.back()}
                    button={() => (
                      <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />
                    )}
                  />
                )}
                headerRight={() => (
                  <HeaderButton
                    type='text'
                    onPress={() => console.log(1)}
                    text={t('transaction.continue')}
                  />
                )}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='goal/index'
          options={{
            tabBarLabel: t('tabLabel.goals'),
            headerTitleAlign: 'center',
            title: 'Statistics',
            tabBarIcon: ({ size, focused, color }) => {
              if (focused) {
                return <Image source={require('@/src/assets/icons/goals-active.jpg')} />
              }
              return <Image source={require('@/src/assets/icons/goals.jpg')} />
            },
          }}
        />
        <Tabs.Screen
          name='account'
          options={{
            tabBarLabel: t('tabLabel.settings'),
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              if (focused) {
                return <Image source={require('@/src/assets/icons/settings-active.jpg')} />
              }
              return <Image source={require('@/src/assets/icons/settings.jpg')} />
            },
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  )
}
export default Layout
