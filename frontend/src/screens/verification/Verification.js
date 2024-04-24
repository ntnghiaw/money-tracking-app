import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import logo from '../../../assets/images/flag_logo.png'

const sreenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    // justifyContent:'center'
  },
  from_input:{
    width: sreenWidth*0.9,
    height:screenHeight*0.08,
    backgroundColor:'white',
    display:'flex',
    flexDirection:'row',
    // justifyContent:'center',
    borderRadius:10,
    alignItems:'center',
    marginTop:35,
    borderWidth:1,
    borderColor:'#C8C8C8',

  },
  logo:{
    width:30,
    height:20,
    marginLeft:20,
    marginRight:15,

  },
  input:{
    width:'60%',
    marginRight:10
  },
  button:{
    width: sreenWidth*0.9,
    height:screenHeight*0.08,
    backgroundColor: '#50C474',
    borderRadius:10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:60,
  },
})

const Verification = ({navigation}) => {
  return (
    <View style={style.container}>
      <View style={{marginTop:40,width:'90%'}}>
        <Text style={{textAlign:'center',color:'#7D8895'}}>Add your phone number. We'll send you a verification code so we know that you're real</Text>
      </View>
      <View style={style.from_input}>
        <Image style={style.logo} source={logo}/>
        <Text style={{marginRight:20}}>
          {`(VN) +84`}
        </Text>
        <TextInput style={style.input} placeholder='Enter Your Phone Number'/>
      </View>
      <TouchableOpacity style={style.button}>
        <Text style={{color:'white',fontSize:20}}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Verification