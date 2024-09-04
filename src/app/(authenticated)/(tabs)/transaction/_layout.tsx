import { Colors, NeutralColor } from '@/src/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { DefaultTheme } from '@react-navigation/native'
import { Stack, useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { ChevronLeft, X } from 'react-native-feather'
const Layout = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
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
      <Stack.Screen
        name='camera'
        options={{ headerShown: false, presentation: 'fullScreenModal' }}
      />
    </Stack>
  )
}
export default Layout
