import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import TransactionForm from '../../../src/components/TransactionForm';
import Toolbar from '../../../src/components/Toolbar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Records = ({route, navigation}) => {
  const [data, setData] = useState({});
  const onCreateHandler = (data) => {
    setData(data);
  }
  return (
    <View style={styles.container}>
        <View>
          <TransactionForm navigation={navigation} route={route} onCreate={onCreateHandler} type='expense'/>
        </View>
        <Toolbar navigation={navigation}/>
    </View>
  )
}

export default Records;

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