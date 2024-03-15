import { StyleSheet, Text, View,Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import fin_logo from '../../images/report/fin_logo.png'
import statis_logo from '../../images/report/statistical_icon.png'
import analysis_icon from '../../images/report/analysis_icon.png'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    box_form:{
        width: screenWidth*0.9,
        height:screenHeight*0.08,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        marginBottom: 25,
        borderRadius:10,
        alignItems:'center'
      },
})

const Report = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{...styles.box_form, marginTop:30}}>
        <Image style={{width:40,height:40,marginLeft:20,marginRight:20}} source={fin_logo}/>
        <Text>Financial Analysis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box_form}>
        <Image style={{width:40,height:40,marginLeft:20,marginRight:20}} source={statis_logo}/>
        <Text>Expense vs Income</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box_form}>
        <Image style={{width:40,height:40,marginLeft:20,marginRight:20}} source={analysis_icon}/>
        <Text>Income Analysis</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Report

