import React from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
import Toolbar from '../../components/Toolbar'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    balance_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.1,
        marginTop: 20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    individual_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.3,
        display:'flex',
        flexDirection:'column',
    },
    group_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.3,
        display:'flex',
        flexDirection:'column',
    },
})

const MyWallet = () => {
  return (
    <View style={styles.container}>
        <View style={styles.balance_form}>
            <Text style={{color:'#50C474',fontSize:22}}>12,400.00 Đ</Text>
            <Text style={{fontSize:16,marginTop:5,}}>Total balance</Text>
        </View>
        <View style={styles.individual_form}>
            <Text style={{fontSize:20, color:'#7D8895'}}>INDIVIDUAL</Text>
        </View>
        <View style={styles.group_form}>
            <Text style={{fontSize:20, color:'#7D8895'}}>GROUPS</Text>
        </View>
        <Toolbar/>
    </View>
  )
}

export default MyWallet