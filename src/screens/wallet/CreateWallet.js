import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import celebrate from '../../images/celebrate_icon.png'
import PrimaryButton from '../../components/PrimaryButton'


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    image:{
        width:150,
        height:150,
        margin:50,
    },
    save_button:{
        // width:screenWidth*0.8,
        // height:screenHeight*0.08,
        // backgroundColor:'#50C474',
        // display:'flex',
        // justifyContent:'center',
        // alignItems:'center',
        // borderRadius:10,
        marginTop:75,
    },
    text:{
        fontSize:40,
        color:'#559BE6',
        textAlign:'center',
    },
    box_input:{
        width:screenWidth*0.8,
        height:50,
        marginTop:40,

    },

})
// source={require('../images/logo.jpg')} // Đường dẫn đến ảnh trong thư mục assets
const NewWallet = () => {
  return (
    <View style={styles.container}>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:50,height:50}} source={require('../../images/icons/cash.png')}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'Left',fontSize:20}} placeholder='Cash'/>
        </View>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:50,height:50}} source={require('../../images/icons/balance.png')}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'left',fontSize:20}} placeholder='Balance'/>
        </View>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:50,height:50}} source={require('../../images/icons/individual.png')}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'left',fontSize:20}} placeholder='Individual'/>
        </View>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:45,height:30}} source={require('../../images/icons/description.png')}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'left',fontSize:20}} placeholder='Description'/>
        </View>

        {/* <TouchableOpacity style={styles.save_button}>
            <Text style={{fontSize:20,color:'white'}}>Save</Text>
        </TouchableOpacity> */}
        <View style={styles.save_button}>

            <PrimaryButton title="Save"/>
        </View>
    </View>
  )
}

export default NewWallet