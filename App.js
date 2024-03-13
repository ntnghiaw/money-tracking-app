import React, {useState} from 'react';
import { View, Text } from 'react-native';

import { SafeAreaView } from 'react-native';

import Login from './components/Login';
import Register from './components/Register'
import Initial from './components/Initial'
import Test from './components/Test';


import Welcome from './pages/welcome/Welcome';
import NewWallet from './pages/wallet/NewWallet'
import MyWallet from './pages/wallet/MyWallet';

import Profile from './pages/profile/Profile';
import Verification from './pages/verification/Verification';
import Notification from './pages/notification/Notification';
import SettingsNotification from './pages/notification/SettingsNotification';
import More from './pages/more/More';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Report from './pages/Report/Report';
import Home from './components/Home';
// import { NativeRouter, Route } from 'react-router-native';


const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }}  />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>

          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile', }}/>

          <Stack.Screen name="NewWallet" component={NewWallet} options={{ title: 'NewWallet', }}/>
          <Stack.Screen name="MyWallet" component={MyWallet} options={{title: 'MyWallet',}}/>
          <Stack.Screen name="Verification" component={Verification} options={{ title: 'Verification', }}/>
          <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notification', }}/>
          <Stack.Screen name="SettingsNotification" component={SettingsNotification} options={{title:'SettingNotification'}}/>
          <Stack.Screen name="Report" component={Report} options={{title:'Report'}}/>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home', }}/>
          <Stack.Screen name="More" component={More} options={{ title: 'More', }}/>

        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
