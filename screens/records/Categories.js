import { View, Text, Button, SafeAreaView,
    SectionList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
  import React from 'react';
  import Colors from '../../constants/colors';
  
  import * as Icon from "react-native-feather";
  
  
  const DATA = [
    {
      title: 'Food and Dining',
      data: ['Bars & Coffee', 'Breakfast', 'Lunch', 'Dinner'],
    },
    {
      title: 'Transport',
      data: ['Fuel', 'Parking', 'Taxi', 'Service & Parts'],
    },
    {
      title: 'Personal',
      data: ['Education', 'Book', 'Spa', ],
    },
    {
      title: 'Clothing',
      data: ['Clothes', 'Shoes', 'Accessories', ],
    },
    {
      title: 'Health & Fitness',
      data: ['Pharmacy', 'Gym', 'Doctor', 'Health Insurance'],
    },
   
  ];
  
  
  const Categories = ({navigation}) => {
    return (
    <SafeAreaView style={styles.container}>
     
    </SafeAreaView>
    )
  }
  
  export default Categories;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: StatusBar.currentHeight,
      marginHorizontal: 0,
    },
    item: {
      backgroundColor: 'white',
      padding: 16,
      marginVertical: 1,
      flexDirection: 'row',
      alignItem: 'center',
    },
    header: {
      fontSize: 24,
      marginHorizontal: 16,
      // backgroundColor: '#fff',
      color: Colors.text.title,
      marginTop: 16,
      marginBottom: 8
    },
    title: {
      fontSize: 20,
      lineHeight: 36,
      marginLeft: 16,
    },
  
    icon: {
      width: 40,
      height: 40,
      backgroundColor: Colors.icon.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6
      // backgroundColor: 'red'
  },
  });