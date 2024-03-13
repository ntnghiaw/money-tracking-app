import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './navigators/AuthNavigator';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();


const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Auth" component={AuthNavigator} options={{
          headerShown: false
        }}/> */}
        <Stack.Screen name="App" component={AppNavigator} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router