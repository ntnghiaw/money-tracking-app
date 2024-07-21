import React,{useState} from 'react';
import {View, Text, Dimensions, Button, StyleSheet, TextInput, TouchableOpacity, Image, Platform} from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import MultiSelect from 'react-native-multiple-select';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon từ thư viện
import { useSelector, useDispatch } from 'react-redux';


const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import homeIcon from '../../assets/images/toolbarIcons/home.png'
import moreIcon from '../../assets/images/toolbarIcons/more.png'
import plusIcon from '../../assets/images/toolbarIcons/plus.png'
import profileIcon  from '../../assets/images/toolbarIcons/profile.png'
import statIcon from '../../assets/images/toolbarIcons/stat.png'

const style = StyleSheet.create({
    toolbar:{
        width:screenWidth,
        height:screenHeight*0.07,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        position:'absolute',
        bottom:0,
        backgroundColor:'white',

    },
    items:{
        width:screenWidth*0.2,
        height:screenHeight*0.07,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    icon_items:{
        width:25,
        height:25,
    }
})

const Toolbar = ({navigation}) => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    return (
        <View style={style.toolbar}>
            <View style={style.items}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                    <Image style={style.icon_items} source={homeIcon}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity onPress={() => navigation.navigate('Statistics')}>
                    <Image style={style.icon_items} source={statIcon}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity onPress={() => navigation.navigate('Records')}>
                    <Image style={{width:50,height:50}} source={plusIcon}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity onPress={() => navigation.navigate('More')}>
                    <Image style={style.icon_items} source={moreIcon}/>
                </TouchableOpacity>
            </View>
            <View style={style.items}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image style={style.icon_items} source={profileIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Toolbar;