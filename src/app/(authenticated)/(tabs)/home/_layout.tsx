import { View, Text, Pressable } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { ChevronLeft, FolderPlus } from 'react-native-feather'
import { Colors, NeutralColor } from '@/src/constants/Colors'
const Layout = () => {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Home' }} />
      <Stack.Screen
        name='wallets'
        options={{
          title: 'Wallets',
          headerBackTitleVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallet')}>
              <FolderPlus width={24} height={24} color={NeutralColor.Black[800]} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name='wallet' options={{ title: 'Wallet', presentation: 'modal' }} />
      <Stack.Screen name='history' options={{ title: 'History', headerBackTitleVisible: false }} />
    </Stack>
  )
}
export default Layout
