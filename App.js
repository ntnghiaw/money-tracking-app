import React, {useState} from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';

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

import Transaction from './pages/transaction/Transaction';

import Investment from './pages/investment/Investment';
import Budget from './pages/budget/Budget';
import Debt from './pages/debt/Debt';
import Records from './pages/records/Records';
import ExportData from './pages/exportData/ExportData';
import Settings from './pages/settings/Settings';
import Group from './pages/group/Group';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Report from './pages/Report/Report';
import Home from './components/Home';
import Statistics from './pages/statistics/Statistics';

// import { NativeRouter, Route } from 'react-router-native';

import store from './redux/auth/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Provider store={store}>
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
            <Stack.Screen 
              name="Notification" 
              component={Notification} 
              options={({ navigation }) => ({ 
                title: 'Notification', 
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('SettingsNotification')}>
                    <Image
                      source={require('./images/icons/sets_icon.png')}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                ),
              })}

            />
            <Stack.Screen name="SettingsNotification" component={SettingsNotification} options={{title:'SettingNotification'}}/>
            <Stack.Screen name="Report" component={Report} options={{title:'Report'}}/>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={({ navigation }) => ({ 
                title: 'Home', 
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                    <Image
                      source={require('./images/icons/notification_icon.png')}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="More" component={More} options={{ title: 'More', }}/>

            <Stack.Screen name="Transaction" component={Transaction} options={{ title: 'Transaction', }}/>

            <Stack.Screen name="Investment" component={Investment} options={{ title: 'Investment', }}/>
            <Stack.Screen name="Budget" component={Budget} options={{ title: 'Budget', }}/>
            <Stack.Screen name="Debt" component={Debt} options={{ title: 'Debt', }}/>
            <Stack.Screen name="Records" component={Records} options={{ title: 'Records', }}/>
            <Stack.Screen name="Export_Data" component={ExportData} options={{ title: 'Export_Data', }}/>
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings', }}/>
            <Stack.Screen name="Group" component={Group} options={{ title: 'Group', }}/>
            <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', }}/>

          </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;
