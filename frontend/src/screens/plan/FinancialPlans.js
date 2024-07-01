import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MoreVertical, Plus } from 'react-native-feather';
import { useIsFocused } from '@react-navigation/native';


import Toolbar from '../../components/Toolbar';
import Colors from '../../components/Colors';
import Budgets from './Budgets';
import Goals from './Goals';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Tab = createMaterialTopTabNavigator();


const FinancialPlans = ({navigation, route}) => {
 
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{tabBarIndicatorStyle: {backgroundColor: '#49F064'}}} >
        <Tab.Screen name="Budgets" component={Budgets}/>
        <Tab.Screen name="Goals" component={Goals}/>
      </Tab.Navigator>
      <Toolbar navigation={navigation}/>
    </View>
  )
}

export default FinancialPlans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 

})