import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import TransactionForm from '../../components/TransactionForm';
import Toolbar from '../../components/Toolbar';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const URL = "http://192.168.1.6:5000/transactions";

const Transaction = ({route, navigation}) => {
  const [data, setData] = useState({});
  const submitHandler = async ({id,data}) => {
    return await axios.post(`${URL}/${id}?walletId=668ba49b85a67fa9ac4f2c85`, data);
  }
  return (
    <View style={styles.container}>
        <View>
          <TransactionForm navigation={navigation} route={route} onCreate={submitHandler} type='expense'/>
        </View>
        <Toolbar navigation={navigation}/>
    </View>
  )
}

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenHeight*0.05,
    backgroundColor: 'white',
    height: screenHeight*0.9,
    borderRadius: 30,
    paddingHorizontal: screenWidth*0.04,
  },

})