import { View, Text, Pressable } from 'react-native'
import { Link, router, Tabs } from 'expo-router'
import { User, BarChart2, List, PlusCircle, Home, ChevronLeft } from 'react-native-feather'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import CustomHeader from '@/components/CustomHeader'

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name='home'
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => (
            <Home width={size} height={size} stroke={color} />
          ),
          tabBarItemStyle: {
            paddingTop: 10,
          },
        }}
      />
      <Tabs.Screen
        name='history/history'
        options={{
          title: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({ size, focused, color }) => (
            <List width={size} height={size} stroke={color} />
          ),
          tabBarItemStyle: {
            paddingTop: 10,
          },
        }}
      />
      <Tabs.Screen
        name='transaction'
        options={{
          title: 'Transaction',
          tabBarLabel: 'New',
          tabBarIcon: ({ size, focused, color }) => (
            <Pressable onPress={() => {
              router.navigate('/(authenticated)/(tabs)/transaction')
            }}>

              <PlusCircle width={size + 20} height={size + 20} stroke={color} />
            </Pressable>
          ),
          tabBarItemStyle: {
            paddingTop: 10,
          },
          headerRight: () => (
            <Pressable
              style={{ marginRight: 12 }}
              onPress={() => router.navigate('/(authenticated)/(tabs)/transaction/camera')}
            >
              <Ionicons name='qr-code-outline' size={24} color={Colors.black} />
            </Pressable>
          ),
          
        }}
      />
      <Tabs.Screen
        name='statistic/statistic'
        options={{
          tabBarLabel: 'Statistics',
          title: 'Statistics',
          tabBarIcon: ({ size, focused, color }) => (
            <BarChart2 width={size} height={size} stroke={color} />
          ),
          tabBarItemStyle: {
            paddingTop: 10,
          },
        }}
      />
      <Tabs.Screen
        name='account'
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => (
            <User width={size} height={size} stroke={color} />
          ),
          tabBarItemStyle: {
            paddingTop: 10,
          },
        }}
      />
    </Tabs>
  )
}
export default Layout
