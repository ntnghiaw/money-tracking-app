import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Initial from '../../components/Initial'
import Login from '../../components/Login'
import Register from '../../components/Register'
import NewWallet from '../../pages/wallet/NewWallet'

const AuthNavigator = () => {
    const AuthStack = createNativeStackNavigator()
  return (
    <AuthStack.Navigator >
      <AuthStack.Screen name="Initial" component={Initial} options={{
        headerShown:false
        
        }}/>
      <AuthStack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <AuthStack.Screen name="Register" component={Register} options={{headerShown: false}}/>
      <AuthStack.Screen name="Welcome" component={NewWallet} options={{headerShown: false}}/>
    </AuthStack.Navigator>
  )
}

export default AuthNavigator;
