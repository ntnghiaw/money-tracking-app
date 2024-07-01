import { View, Text, StyleSheet, Dimensions, ScrollView, Image  } from 'react-native'
import React from 'react'
import data from './notification.json'

import logo from '../../../assets/images/logo_notification.png'
import * as Icon from 'react-native-feather'
import colors from '../../components/Colors'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height


  
const Notification = ({ navigation }) => {
  return (
    <View style={style.container}>
        <ScrollView contentContainerStyle={style.ScrollView_form}>
            {
                data.map(items =>(
                    <View  style={style.container_notification} key={items.id}>
                        <View style={style.logo}>
                            <Image style={{width:24,height:24,marginTop:15}} source={logo}/>
                        </View>
                        <View style={style.form_notification} >
                            <Text style={{fontSize:16,marginTop:10}}>{items.title}</Text>
                            <Text style={{color:Colors.text.body,marginTop:5}}>{items.description.length > 75 ? items.description.substring(0, 75) + '...' : items.description }</Text>
                            <Text style={style.notificationTime}>{items.time}</Text>
                        </View>
                        <View>
                            <Text style={{marginTop:16}}>
                                <Icon.X stroke={Colors.text.body} width={18} height={18} />
                            </Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>
        
    </View>
  )
}

export default Notification

const style = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    //   overflow:'scroll',
    },
    logo:{
        width:'16%',
        alignItems:'center'
    },
    container_notification:{
        width: screenWidth*0.95,
        height: screenHeight*0.13,
        backgroundColor: 'white',
        display:'flex',
        flexDirection:'row',
        marginBottom:14,
        borderRadius:8,
    },
    form_notification:{
        width:'77%',
        position:'relative',
    },
    notificationTime:{
        color:Colors.text.body,
        position:'absolute',
        bottom:5
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