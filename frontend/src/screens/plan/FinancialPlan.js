import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';


import Form from '../../../src/components/Form';


const FinancialPlan = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
      <Form  navigation={navigation} />

      </TouchableWithoutFeedback>
    </View>
  )
}

export default FinancialPlan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },


})