import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { Colors, NeutralColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { DefaultTheme } from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { ChevronLeft, X } from 'react-native-feather'
const Layout = () => {
  const router = useRouter()
  const {t} = useLocale()
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen
        name='categories'
        options={{
          title: 'Choose Category',
          presentation: 'modal',
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              <X width={24} height={24} color={NeutralColor.Black[800]} />
            </Pressable>
          ),
          headerStyle: { backgroundColor: DefaultTheme.colors.background },
          headerShadowVisible: false,
        }}
      />
     
    </Stack>
  )
}
export default Layout
