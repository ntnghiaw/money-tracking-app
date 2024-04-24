import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import celebrate from '../../../assets//images/celebrate_icon.png';
import PrimaryButton from '../../../../src/components/PrimaryButton';

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
    button:{

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

const NewWallet = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={celebrate}/>
        <Text style={styles.text}>Create your first finacial wallet</Text>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:50,height:50}} source={{uri:'https://cdn-icons-png.flaticon.com/512/2506/2506858.png'}}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'center',fontSize:20}} placeholder='Name'/>
        </View>
        <View style={{...styles.box_input, height:screenHeight*0.06,display:'flex',alignItems:'center',flexDirection:'row'}}>
            <Image style={{width:50,height:50}} source={{uri:'https://cdn-icons-png.flaticon.com/512/2474/2474450.png'}}/>
            <TextInput style={{width:screenWidth*0.65,borderBottomWidth:1,padding:1,marginLeft:10,textAlign:'center',fontSize:20}} placeholder='Balance'/>
        </View>
        <View style={styles.button}>

            <PrimaryButton title="Create" onPress={() => navigation.navigate('Home')} />
        </View>
          
    </View>
  )
}

export default NewWallet