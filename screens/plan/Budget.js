import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Form from '../../components/Form';

const Budget = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Form  navigation={navigation} />
    </View>
  )
}

export default Budget;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    }

})