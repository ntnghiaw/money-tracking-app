import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../pages/Home/Home'
import Colors from '../../constants/colors'
import * as Icon from "react-native-feather"
import { useNavigation } from '@react-navigation/native'
import Notification from '../../pages/notification/Notification'
import SettingsNotification from '../../pages/notification/SettingsNotification'
import Login from '../../components/Login'
import { Image } from 'react-native'
import MyWallet from '../../pages/wallet/MyWallet'
import CreateWallet from '../../pages/wallet/CreateWallet'



const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const HomeNavigator = ({navigation, route}) => {
    const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator >
        {/* <HomeStack.Screen name="Login" component={Login} options={{headerShown: false}}/> */}
        <HomeStack.Screen name="Home" component={Home} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
          headerRight: () => {
            return  (

            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>

              <Icon.Bell stroke={Colors.text.title} width={24} height={24} style={{marginRight: screenWidth*0.02}} />
            </TouchableOpacity>
            )

          }
          
        }}  />
        <HomeStack.Screen name="Notification" component={Notification} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
          headerBackTitleVisible: false,
          headerTintColor: Colors.text.title,
          // custom back button for IOS
          // headerBackImageSource: require('../../assets/back.png'),
      
          
          headerRight: () => {
            return  (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Icon.Settings stroke={Colors.text.title} width={24} height={24} style={{marginRight: screenWidth*0.02}} />
            </TouchableOpacity>
            )

          }
        }}/>
        <HomeStack.Screen name="Settings" component={SettingsNotification} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
          headerBackTitleVisible: false,
          headerTintColor: Colors.text.title,
        }} />
         <HomeStack.Screen name="CreateWallet" component={CreateWallet} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
          headerBackTitleVisible: false,
          headerTintColor: Colors.text.title,
        }} />
          <HomeStack.Screen name="Wallet" component={MyWallet}  options={{
            title: 'Wallets',
            headerTitleAlign: 'center', 
            headerTitleStyle: { color: Colors.text.title, fontSize: 18 },
            headerRight: () => {
              return  (
              <TouchableOpacity onPress={() => navigation.navigate('CreateWallet')}>
                <Icon.FolderPlus stroke={Colors.text.title} width={24} height={24} style={{marginRight: screenWidth*0.02}} />
              </TouchableOpacity>
              )

          }
        }} />
    </HomeStack.Navigator>
  )
}

export default HomeNavigator;
