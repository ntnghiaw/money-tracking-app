import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen
        name='create-wallet'
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name='edit-wallets' />
      <Stack.Screen name='edit-wallet' />
    </Stack>
  )
}
export default Layout