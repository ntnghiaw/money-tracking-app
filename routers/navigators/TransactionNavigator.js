import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transaction from '../../pages/transaction/Transaction';
import Color from '../../constants/colors';
import { SelectCountry } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Camera from '../../pages/transaction/Camera';
import History from '../../pages/transaction/History';
import Category from '../../pages/transaction/Category';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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


const TransactionHeader = ({navigation, route}) => {
    const [option, setOption] = useState('expense');
    const chooseOptionHandler = (e) => {
      // navigation.navigate('Transaction', {type: e.value});
      navigation.setParams({type: e.value});
    }
    return (
        <View style={styles.headerContainer}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('History')}>
                <MaterialCommunityIcons name="history" size={28} color={Color.text.title}  />
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
                <MaterialCommunityIcons name="qrcode" size={28} color={Color.text.title} />
              </TouchableOpacity>
            </View>
        </View>

    )
   
}



const TransactionNavigator = ({navigation, route}) => {
    const TransactionStack = createNativeStackNavigator()
    return (
        <TransactionStack.Navigator >
            <TransactionStack.Screen 
                name="Transaction" 
                component={Transaction}
                initialParams={{ type: 'expense'}}
                options={{
                header: (props) => <TransactionHeader {...props} />
              }} 
            />
            <TransactionStack.Screen name='History' component={History} options={{ title: 'All Transactions' }}/>
            <TransactionStack.Screen name='Camera' component={Camera} options={{ title: 'Scanner' }} />
            <TransactionStack.Screen name='Category' component={Category} />
        </TransactionStack.Navigator>
    )
}

export default TransactionNavigator;

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
      color: Color.text.title,
      fontWeight: 500,
    },
    iconStyle: {
      width: 28,
      height: 28,
      tintColor: Color.text.title
    },
  });
