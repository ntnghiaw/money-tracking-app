import React,{useState} from 'react';
import {View, Text, Dimensions, Button, StyleSheet, TextInput, TouchableOpacity, Image, Platform} from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import MultiSelect from 'react-native-multiple-select';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon từ thư viện


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const style = StyleSheet.create({
    toolbar:{
        width:screenWidth,
        height:screenHeight*0.08,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        position:'absolute',
        bottom:0,
        backgroundColor:'white',

    },
    items:{
        width:screenWidth*0.2,
        height:screenHeight*0.08,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    icon_items:{
        width:25,
        height:25,
    }
})

const Toolbar = () => {
    return (
        <View style={style.toolbar}>
            <View style={style.items}>
                <TouchableOpacity>
                    <Image style={style.icon_items} source={{uri:'https://cdn-icons-png.flaticon.com/512/25/25694.png'}}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity>
                    <Image style={style.icon_items} source={{uri:'https://png.pngtree.com/png-vector/20190116/ourmid/pngtree-vector-statistics-icon-png-image_322171.jpg'}}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity>
                    <Image style={{width:50,height:50}} source={{uri:'https://cdn.icon-icons.com/icons2/2518/PNG/512/circle_plus_icon_151455.png'}}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity>
                    <Image style={style.icon_items} source={{uri:'https://i.pinimg.com/originals/8b/5c/49/8b5c498ed69a64d629249d9abe4f44a6.png'}}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity>
                    <Image style={style.icon_items} source={{uri:'https://cdn-icons-png.flaticon.com/512/3106/3106773.png'}}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Toolbar;