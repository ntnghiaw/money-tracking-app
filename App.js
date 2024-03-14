import React, {useState} from 'react';
import { View, Text, Image,TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { SafeAreaView } from 'react-native';

import Login from './components/Login';
import Register from './components/Register'
import Initial from './components/Initial'
import Test from './components/Test';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { SelectCountry } from 'react-native-element-dropdown';
import Welcome from './pages/welcome/Welcome';
import NewWallet from './pages/wallet/NewWallet'
import MyWallet from './pages/wallet/MyWallet';

import Profile from './pages/profile/Profile';
import Verification from './pages/verification/Verification';
import Notification from './pages/notification/Notification';
import SettingsNotification from './pages/notification/SettingsNotification';
import More from './pages/more/More';
import Investment from './pages/investment/Investment';
import Budget from './pages/budget/Budget';
import Debt from './pages/debt/Debt';
import Records from './pages/records/Records';
import ExportData from './pages/exportData/ExportData';
import Settings from './pages/settings/Settings';
import Group from './pages/group/Group';


import Report from './pages/Report/Report';
import Home from './components/Home';
import Statistics from './pages/statistics/Statistics';
import Colors from './constants/colors';
import History from './pages/records/History';
import Category from './pages/records/Category';
import Camera from './pages/records/Camera';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { NativeRouter, Route } from 'react-router-native';

import store from './redux/auth/store';
import { changeType } from './redux/transaction/transactionAction';
import { Provider, useDispatch, useSelector } from 'react-redux';

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


            <Stack.Screen name="Investment" component={Investment} options={{ title: 'Investment', }}/>
            <Stack.Screen name="Budget" component={Budget} options={{ title: 'Budget', }}/>
            <Stack.Screen name="Debt" component={Debt} options={{ title: 'Debt', }}/>
            <Stack.Screen name="Records" component={Records} options={{
               title: 'Records', 
               header: (props) => <TransactionHeader {...props} />
               
               }} />
            <Stack.Screen name="Categories" component={Category} options={{title: 'Categories'}}/>
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

