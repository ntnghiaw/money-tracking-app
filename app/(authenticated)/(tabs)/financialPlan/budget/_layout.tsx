import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='budgetDetails' options={{ title: 'Budget', presentation: 'modal' }} />

      <Stack.Screen name='[id]' options={{ title: 'Budget', presentation: 'modal' }} />
    </Stack>
  )
}
export default Layout