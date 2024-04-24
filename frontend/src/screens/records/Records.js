import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import TransactionForm from '../../../src/components/TransactionForm';
import Toolbar from '../../../src/components/Toolbar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Records = ({route, navigation}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <MaterialCommunityIcons name="qrcode" size={28} color={Colors.text.title} />
      </TouchableOpacity>
      ),
    })
  })
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