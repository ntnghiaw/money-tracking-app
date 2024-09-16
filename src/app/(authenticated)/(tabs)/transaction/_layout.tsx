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
      
     
    </Stack>
  )
}
export default Layout
