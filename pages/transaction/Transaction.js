import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Button from '../../components/Button';
import TransactionForm from '../../components/TransactionForm';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Transaction = ({route, navigation}) => {
  const { type } = route.params;
  const [data, setData] = useState({});
  const onCreateHandler = (data) => {
    setData(data);
  }
  return (
    <View style={styles.container}>
        <View>
          <TransactionForm navigation={navigation} route={route} onCreate={onCreateHandler} type={type}/>
        </View>
    </View>
  )
}

export default Transaction;

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight*0.05,
    backgroundColor: 'white',
    height: screenHeight*0.8,
    borderRadius: 30,
    paddingHorizontal: screenWidth*0.04,
  }
})