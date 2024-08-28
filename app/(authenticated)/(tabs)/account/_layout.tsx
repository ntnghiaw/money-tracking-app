import CustomHeader from '@/components/CustomHeader'
import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
const Layout = () => {
 return (
   <Stack>
     <Stack.Screen name='index' options={{}} />
     <Stack.Screen name='profile' options={{title: 'Profile', presentation: 'modal' }} />
     <Stack.Screen name='settings' options={{ presentation: 'modal' }} />
   </Stack>
 )
}
export default Layout