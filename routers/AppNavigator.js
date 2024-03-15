import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Icon from "react-native-feather";
import Colors from '../constants/colors';
import ProfileNavigator from './navigators/ProfileNavigator'
import ReportNavigator from './navigators/ReportNavigator'
import TransactionNavigator from './navigators/TransactionNavigator'
import HomeNavigator from './navigators/HomeNavigator'
import MoreNagivator from './navigators/MoreNagivator';
import { Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const AppNavigator = ({navigation, route}) => {
    const Tabs = createBottomTabNavigator();
    // const {user} = route.params;
    // console.log(user)
  return (
         
        <Tabs.Navigator screenOptions={({ route }) => (
          {
            headerShown: false,
            tabBarShowLabel: false,
         
            tabBarStyle: {
              width:screenWidth,
              height:screenHeight*0.08,
              paddingTop: Platform.OS === 'ios' ? 10 : 0,
            },
            tabBarIcon: ({ focused }) => {
              if (route.name === 'HomeStack') {
                return <Icon.Home width={24} height={24} stroke={focused ? Colors.icon.pressed : Colors.icon.default} />;
              } else if (route.name === 'ReportStack') {
                return <Icon.BarChart2 width={24} height={24} stroke={focused ? Colors.icon.pressed : Colors.icon.default} />;
              } else if (route.name === 'TransactionStack') {
                return <Icon.PlusCircle width={40} height={40} stroke={focused ? Colors.icon.pressed : Colors.icon.default} />;
              } else if (route.name === 'MoreStack') {
                return  <Icon.Grid  width={24} height={24}  stroke={focused ? Colors.icon.pressed : Colors.icon.default} />;
              } else if (route.name === 'ProfileStack') {
                return <Icon.User  width={24} height={24}  stroke={focused ? Colors.icon.pressed : Colors.icon.default} />;  
              }
             
            },
          }
        )}
       
        >
          
            <Tabs.Screen name="HomeStack" component={HomeNavigator} />
            <Tabs.Screen name="ReportStack" component={ReportNavigator} />
            <Tabs.Screen name="TransactionStack" component={TransactionNavigator} />
            <Tabs.Screen name="MoreStack" component={MoreNagivator} />
            <Tabs.Screen name="ProfileStack" component={ProfileNavigator} 
            // initialParams={{
            //   user
            // }}
            />
            
        </Tabs.Navigator>
  )
}

export default AppNavigator


// const style = StyleSheet.create({
//     toolbar:{
//         width:screenWidth,
//         height:screenHeight*0.1,
//         display:'flex',
//         flexDirection:'row',
//         justifyContent:'space-around',
//         position:'absolute',
//         bottom:0,
//         backgroundColor:'white',

//     },
//     items:{
//         width:screenWidth*0.2,
//         height:screenHeight*0.08,
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     icon_items:{
//         width:25,
//         height:25,
//     }
// })