import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../../pages/profile/Profile'
import MyWallet from '../../pages/wallet/MyWallet'
import Color from '../../constants/colors'
import CreateWallet from '../../pages/wallet/CreateWallet'
import * as Icon from 'react-native-feather'

const ProfileStack = createNativeStackNavigator()

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ProfileNavigator = ({navigation, route}) => {
  const user = route.params

  return (
    <ProfileStack.Navigator >
        <ProfileStack.Screen name="Profile" component={Profile} initialParams={user} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
        }} />
         <ProfileStack.Screen name="Wallet" component={MyWallet} initialParams={user} options={{
         title: 'Wallets',
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
          headerRight:  () => {
            return  (
            <TouchableOpacity onPress={() => navigation.navigate('CreateWallet')}>
              <Icon.FolderPlus stroke={Colors.text.title} width={24} height={24} style={{marginRight: screenWidth*0.02}} />
            </TouchableOpacity>
            )

          }
        }} />
         <ProfileStack.Screen name="CreateWallet" component={CreateWallet} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
          headerBackTitleVisible: false,
          headerTintColor: Colors.text.title,
        }} />
    </ProfileStack.Navigator>
  )
}

export default ProfileNavigator
