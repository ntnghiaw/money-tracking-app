import React, {useState} from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Button from '../../components/PrimaryButton';
import TransactionForm from '../../components/TransactionForm';
import Toolbar from '../../components/Toolbar';

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
          <View style={styles.bottomBar}><Toolbar navigation={navigation}/></View>

        </View>
    </View>
  )
}

export default Records;

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight*0.05,
    backgroundColor: 'white',
    height: screenHeight*0.9,
    borderRadius: 30,
    paddingHorizontal: screenWidth*0.04,
  },
  bottomBar: {
    width: screenWidth,
    marginTop: screenHeight*0.21,
    marginLeft: -16,
}
})