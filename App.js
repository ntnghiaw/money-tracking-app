import React, {useState} from 'react';
import { Image,TouchableOpacity,} from 'react-native';
import { Provider } from 'react-redux';
import { Plus, Check, Edit3, ArrowLeft, Clock } from 'react-native-feather';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';


import Login from './src/components/Login';
import Register from './src/components/Register';
import Initial from './src/components/Initial';
import Welcome from './src/screens/welcome/Welcome';
import MyWallet from './src/screens/wallet/MyWallet';
import NewWallet from './src/screens/wallet/NewWallet';
import Profile from './src/screens/profile/Profile';
import Verification from './src/screens/verification/Verification';
import Notification from './src/screens/notification/Notification';
import SettingsNotification from './src/screens/notification/SettingsNotification';
import More from './src/screens/more/More';
import Investment from './src/screens/investment/Investment';
import FinancialPlans from './src/screens/plan/FinancialPlans';
import Debt from './src/screens/debt/Debt';
import Records from './src/screens/records/Records';
import ExportData from './src/screens/exportData/ExportData';
import Settings from './src/screens/settings/Settings';
import Group from './src/screens/group/Group';
import Report from './src/screens/report/Report';
import Home from './src/components/Home';
import Statistics from './src/screens/statistics/Statistics';
import History from './src/screens/records/History';
import Categories from './src/screens/records/Categories';
import ReceiptOCR from './src/screens/records/ReceiptOCR';
import FinancialPlan from './src/screens/plan/FinancialPlan';
import Periods from './src/components/Periods';
import GoalDetails from './src/screens/plan/GoalDetails';
import Amount from './src/screens/plan/Amount';
import FamilyGroup from './src/screens/group/FamilyGroup';
import TransactionHistory from './src/screens/group/TransactionHistory';
import Colors from './src/components/Colors';
import CustomizedHeader from './src/components/CustomizedHeader';


import { createNativeStackNavigator } from '@react-navigation/native-stack';


import store from './src/redux/store';
import { changeType } from './src/redux/transaction/transactionAction';
import { type } from './src/redux/plan/planAction';


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
                      source={require('./assets/images/icons/sets_icon.png')}
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
                      source={require('./assets/images/icons/notification_icon.png')}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                ),
                headerTitleAlign:'center',
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
            <Stack.Screen name="Camera" component={ReceiptOCR} options={{title: 'Capture Receipt', headerTintColor: 'white', headerStyle: {backgroundColor: 'black'}}}/>
            <Stack.Screen  name="History" component={History} options={{title: 'Transactions'}}/>   
            <Stack.Screen name="Export_Data" component={ExportData} options={{ title: 'Export_Data', }}/>
            <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings', }}/>
            <Stack.Screen name="Group" component={Group} options={{ title: 'Group', }}/>
            <Stack.Screen 
              name="FamilyGroup" 
              component={FamilyGroup} 
              options={({navigation}) => ({ 
                title: 'Group settings', 
                headerTitleAlign:'center',
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                    <Image
                      source={require('./assets/images/icons/history_icon.png')}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ title: 'Transaction History', }}/>

            <Stack.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', }}/>
            <Stack.Screen name="Periods" component={Periods} options={{title: 'Repeat'}} />
            <Stack.Screen name="Amount" component={Amount} options={{ title: 'New Amount'}} />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;


