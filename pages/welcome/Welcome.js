import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Notification from '../Notification/Notification';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },

})

const Welcome = ({navigation,route}) =>{
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <Text  style={{fontSize:30}}>Welcome {user.name}</Text>
      <Text style={{color:'blue', fontSize:50}} onPress={() => navigation.navigate('NewWallet')}>NewWallet</Text>
      <Text style={{color:'blue', fontSize:50}} onPress={() => navigation.navigate('MyWallet')}>My Wallet</Text>
      <Text style={{color:'blue', fontSize:50}} onPress={() => navigation.navigate('Profile',{user:user})}>Profile</Text>
      <Text style={{color:'blue', fontSize:50}} onPress={() => navigation.navigate('Verification')}>Verification</Text>
      <Text style={{color:'blue', fontSize:50}} onPress={() => navigation.navigate('Notification')}>Notification</Text>
      <Text style={{color:'blue', fontSize:40}} onPress={() => navigation.navigate('SettingsNotification')}>Settings Notification</Text>
      <Text style={{color:'blue', fontSize:40}} onPress={() => navigation.navigate('Report')}>Report</Text>

    </View>
  )
}
export default Welcome