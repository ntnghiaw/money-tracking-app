import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';


import { period } from '../redux/plan/planAction';

const data = [

  {
    label: "Every Day",
    value: "day"
  },
  {
    label: "Every Week",
    value: "week"
  },
  {
    label: "Every Month",
    value: "month"
  },
  {
    label: "Every Quarter",
    value: "quarter"
  },
  {
    label: "Every Year",
    value: "year"
  },
  
]


export default function Periods({ navigation}) {
  const dispatch = useDispatch();

  const handlePeriodChange =  (element) => {
      dispatch(period(element));
      navigation.goBack();
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {data.map(element =>  (
          <TouchableOpacity key={element.value} style={styles.item} onPress={() => handlePeriodChange(element)}>
            <Text style={styles.itemText}>{element.label}</Text>
          </TouchableOpacity>
        )
      )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
      width: '100%',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      backgroundColor: '#FFF',
      textAlignVertical: 'center',
    },
    itemText: {
      fontSize: 16
    }
})