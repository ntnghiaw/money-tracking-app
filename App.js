import React, {useState} from 'react';
import { View, Text, Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Plus } from 'react-native-feather';

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

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { NativeRouter, Route } from 'react-router-native';

import store from './redux/auth/store';
import { changeType } from './redux/transaction/transactionAction';
import { Provider, useDispatch, useSelector } from 'react-redux';
import NewBudget from './screens/plan/Budget';

const Stack = createNativeStackNavigator();
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const TransactionHeader = ({navigation, route}) => {
  const dispatch = useDispatch();
  const currentType = useSelector(state => state.transaction.type);
  const transactionTypes = [
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
  
  const [option, setOption] = useState(currentType);
  const chooseOptionHandler = (e) => {
    // navigation.navigate('Transaction', {type: e.value});
    setOption(e.value);
    dispatch(changeType(e.value));
  }
  return (
      <View style={styles.headerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <MaterialCommunityIcons name="history" size={28} color={Colors.text.title}  />
            </TouchableOpacity>
          </View>
      <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      imageStyle= {{display: 'none'}}
      maxHeight={200}
      value={option}
      data={transactionTypes}
      valueField="value"
      labelField="lable"
      onChange={chooseOptionHandler}
    />

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              <MaterialCommunityIcons name="qrcode" size={28} color={Colors.text.title} />
            </TouchableOpacity>
          </View>
      </View>

  )
 
}

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
                  <TouchableOpacity onPress={() => navigation.navigate('NewBudget')}>
                    <Plus width={24} height={24} stroke={Colors.text.title}/>
                  </TouchableOpacity>
                ),
              })}/>
            <Stack.Screen name='NewBudget' component={NewBudget} options={{ title: 'New Budget'}}/>
            <Stack.Screen name="Debt" component={Debt} options={{ title: 'Debt', }}/>
            <Stack.Screen name="Records" component={Records} options={{
               title: 'Records', 
               header: (props) => <TransactionHeader {...props} />
               
               }} />
            <Stack.Screen name="Categories" component={Categories} options={{title: 'Categories'}}/>
            <Stack.Screen name="Camera" component={Camera} options={{title: 'Scanner'}}/>
            <Stack.Screen  name="History" component={History} options={{title: 'Transactions'}}/>   

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

const styles = StyleSheet.create({
  headerContainer: {
    height: screenHeight*0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: screenHeight*0.04,
    paddingHorizontal: screenWidth*0.04,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5
  },
  dropdown: {
    marginLeft: screenWidth*0.04,
    height: screenHeight*0.03,
    width: screenWidth*0.35,
    backgroundColor: '#fff',
    // borderRadius: 0,
    paddingHorizontal: 12,
  },
  selectedTextStyle: {
    fontSize: 20,
    color: Colors.text.title,
    fontWeight: 500,
  },
  iconStyle: {
    width: 28,
    height: 28,
    tintColor: Colors.text.title
  },
})

