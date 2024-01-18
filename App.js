import React, {useState} from 'react';
import { View, Text } from 'react-native';

import { SafeAreaView } from 'react-native';

import Login from './components/Login';
import Register from './components/Register'
import Initial from './components/Initial'
import Test from './components/Test';


import Welcome from './pages/Welcome/Welcome';
import NewWallet from './pages/Wallet/NewWallet'
import MyWallet from './pages/Wallet/MyWallet';

import Profile from './pages/Profile/Profile';
import Verification from './pages/Verification/Verification';
import Notification from './pages/Notification/Notification';
import SettingsNotification from './pages/Notification/SettingsNotification';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Report from './pages/Report/Report';
import TabNavigator from './routers/AppNavigator';
import Router from './routers/Router';
// import { NativeRouter, Route } from 'react-router-native';


const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    // <NavigationContainer>
    //   <Stack.Navigator >
    //     <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }}  />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Register} />
    //     <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>

    //     <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile', }}/>

    //     <Stack.Screen name="NewWallet" component={NewWallet} options={{ title: 'NewWallet', }}/>
    //     <Stack.Screen name="MyWallet" component={MyWallet} options={{title: 'MyWallet',}}/>
    //     <Stack.Screen name="Verification" component={Verification} options={{ title: 'Verification', }}/>
    //     <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notification', }}/>
    //     <Stack.Screen name="SettingsNotification" component={SettingsNotification} options={{title:'SettingNotification'}}/>
    //     <Stack.Screen name="Report" component={Report} options={{title:'Report'}}/>

    //   </Stack.Navigator>

    // </NavigationContainer>
    <Router/>
  );
}

export default App;

