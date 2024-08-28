import CustomHeader from '@/components/CustomHeader'
import { Colors } from '@/constants/Colors'
import { Link, Stack, useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'
import { ChevronLeft } from 'react-native-feather'
const Layout = () => {
  const router = useRouter()
 return (
   <Stack>
     <Stack.Screen name='index' options={{}} />
     <Stack.Screen
       name='profile'
       options={{
         title: 'Profile',
         presentation: 'modal',
         headerBackVisible: true,
         headerLeft: () => (
             <Pressable onPress={() => router.back()}>
               <ChevronLeft width={24} height={24} color={Colors.black} />
             </Pressable>
         ),
       }}
     />
     <Stack.Screen name='settings' options={{ presentation: 'modal' }} />
   </Stack>
 )
}
export default Layout