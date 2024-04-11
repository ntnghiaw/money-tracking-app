import React, {useState} from 'react';
import { View, Text, Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Plus, Check, Edit3, ArrowLeft, Clock } from 'react-native-feather';

import Login from './components/Login';
import Register from './components/Register'
import Initial from './components/Initial'
import Test from './components/Test';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SelectCountry } from 'react-native-element-dropdown';
import Welcome from './screens/welcome/Welcome';
import NewWallet from './screens/wallet/NewWallet'
import MyWallet from './screens/wallet/MyWallet';

import Profile from './screens/profile/Profile';
import Verification from './screens/verification/Verification';
import Notification from './screens/notification/Notification';
import SettingsNotification from './screens/notification/SettingsNotification';
import More from './screens/more/More';
import Investment from './screens/investment/Investment';
import FinancialPlans from './screens/plan/FinancialPlans';
import Debt from './screens/debt/Debt';
import Records from './screens/records/Records';
import ExportData from './screens/exportData/ExportData';
import Settings from './screens/settings/Settings';
import Group from './screens/group/Group';


import Report from './screens/Report/Report';
import Home from './components/Home';
import Statistics from './screens/statistics/Statistics';
import Colors from './constants/colors';
import History from './screens/records/History';
import Categories from './screens/records/Categories';
import Camera from './screens/records/Camera';
import FinancialPlan from './screens/plan/FinancialPlan';
import Periods from './components/Periods';
import GoalDetails from './screens/plan/GoalDetails';
import Amount from './screens/plan/Amount';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { NativeRouter, Route } from 'react-router-native';

import store from './redux/store';
import CustomizedHeader from './components/CustomizedHeader';
import { changeType } from './redux/transaction/transactionAction';
import { type } from './redux/plan/planAction';


const Stack = createNativeStackNavigator();


const types = [
  {
    value: 'expense',
    lable: 'Expense',
  },
  {
    value: 'income',
    lable: 'Income',
  },
  {
    value: 'others',
    lable: 'Others',
  },

];

const planTypes = [
  {
    value: 'budget',
    lable: 'Budget',
  },
  {
    value: 'goal',
    lable: 'Goal',
  },
];



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Provider store={store}>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
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


            <Stack.Screen name="Investment" component={Investment} options={{ title: 'Investment', }}/>
            <Stack.Screen name="FinancialPlan" component={FinancialPlans} options={({ navigation }) => ({ 
                title: 'Financial Plans', 
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('NewPlan')}>
                    <Plus width={24} height={24} stroke={Colors.text.title}/>
                  </TouchableOpacity>
                ),

              })}/>
            <Stack.Screen name='NewPlan' component={FinancialPlan} options={({navigation}) => ({
                title: 'New Financial Plan', 
                header: () => (
                  
                  <CustomizedHeader 
                  dispatchFunction={type}
                  headerLeft= {() => (
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                      <ArrowLeft width={24} height={24} stroke={Colors.text.title}  />
                    </TouchableOpacity>
                  )}
                  headerRight=  {() => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Check width={24} height={24} stroke={Colors.text.title}  />
                    </TouchableOpacity>
                    ) }
                  types={planTypes}
                  reducer={'plan'}
                  />
                )
               
              })}/>
            <Stack.Screen name='GoalDetails' component={GoalDetails} options={{ 
              title: 'Goal Details',
              headerRight: () => (
                <TouchableOpacity>
                    <Edit3 width={20} height={20} stroke={Colors.text.title}/>
                </TouchableOpacity>
              )
              }}/>

            <Stack.Screen name="Debt" component={Debt} options={{ title: 'Debt', }}/>
            <Stack.Screen name="Records" component={Records} options={ ({navigation}) => ({
               title: 'Records', 
               header: (props) => <CustomizedHeader 
                dispatchFunction = {changeType}
                headerLeft= {() => (            
                  <TouchableOpacity onPress={() => navigation.navigate('History')}>
                    <Clock width={24} height={24} stroke={Colors.text.title}  />
                  </TouchableOpacity>
                )} 
                headerRight= { () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
                    <MaterialCommunityIcons name="qrcode" size={28} color={Colors.text.title} />
                  </TouchableOpacity>
                ) }
                types = {types}
                reducer = 'transaction'

               />
              })
               }/>
            <Stack.Screen name="Categories" component={Categories} options={{
                title: 'Categories',
                headerRight: () => (
                  <TouchableOpacity>
                    <Check width={24} height={24} stroke={Colors.text.title}/>
                  </TouchableOpacity>          
                )
                
                }}/>
            <Stack.Screen name="Camera" component={Camera} options={{title: 'Scanner'}}/>
            <Stack.Screen  name="History" component={History} options={{title: 'Transactions'}}/>   

            <Stack.Screen name="Export_Data" component={ExportData} options={{ title: 'Export_Data', }}/>
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings', }}/>
            <Stack.Screen name="Group" component={Group} options={{ title: 'Group', }}/>
            <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', }}/>
            <Stack.Screen name="Periods" component={Periods} options={{title: 'Repeat'}} />
            <Stack.Screen name="Amount" component={Amount} options={{ title: 'New Amount'}} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;

const styles = StyleSheet.create({
  
})

