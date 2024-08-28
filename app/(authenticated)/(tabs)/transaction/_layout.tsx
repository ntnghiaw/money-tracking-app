import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
const Layout = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='categories'
        options={{
          title: 'Categories',
          presentation: 'modal',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <ChevronLeft />
            </Pressable>
          ),
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
