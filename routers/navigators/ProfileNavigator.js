import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../../pages/Profile/Profile'
import Color from '../../constants/colors'


const ProfileStack = createNativeStackNavigator()


const ProfileNavigator = ({navigation, route}) => {
  const user = route.params

  return (
    <ProfileStack.Navigator >
        <ProfileStack.Screen name="Profile" component={Profile} initialParams={user} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
        }} />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator