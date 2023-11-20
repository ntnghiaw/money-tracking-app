import { View, Text, StyleSheet, Dimensions, ScrollView, Image  } from 'react-native'
import React from 'react'
import data from './notification.json'

import logo from '../../images/logo_notification.png'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const style = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    //   overflow:'scroll',
    },
    logo:{
        width:'20%',
        alignItems:'center'
    },
    container_notification:{
        width: screenWidth*0.9,
        height: screenHeight*0.15,
        backgroundColor: 'white',
        display:'flex',
        flexDirection:'row',
        marginBottom:50,
        borderRadius:15,
    },
    form_notification:{
        width:'70%',
    },
    ScrollView_form:{
        width: screenWidth,
        flexGrow:1,
        // justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        paddingBottom:30,
    }
  })
  
const Notification = () => {
  return (
    <View style={style.container}>
        <ScrollView contentContainerStyle={style.ScrollView_form}>
            {
                data.map(items =>(
                    <View  style={style.container_notification}>
                        <View style={style.logo}>
                            <Image style={{width:30,height:30,marginTop:15}} source={logo}/>
                        </View>
                        <View style={style.form_notification} >
                            <Text style={{fontSize:20,marginTop:5}}>{items.title}</Text>
                            <Text style={{color:'#7D8895',marginTop:5}}>{items.discription}</Text>
                            <Text style={{color:'#7D8895',marginTop:5}}>{items.time}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop:20}}>X</Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
        
    </View>
  )
}

export default Notification