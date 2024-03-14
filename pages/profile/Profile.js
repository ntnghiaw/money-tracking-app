import React,{useState} from 'react';
import {View, Text, Dimensions, Button, StyleSheet, TextInput, TouchableOpacity, Image, Platform} from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import MultiSelect from 'react-native-multiple-select';
import SelectDropdown from 'react-native-select-dropdown'
import { useRoute } from '@react-navigation/native';
import Colors from '../../constants/colors';
import { useFonts, ABeeZee_400Regular, } from '@expo-google-fonts/abeezee';
import {TitleText, BodyText, DangerousText} from '../../components/CustomizedText';
import {Picker} from '@react-native-picker/picker';
import {LogOut, ChevronRight} from 'react-native-feather';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';



const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

import { useSelector } from 'react-redux'; // Import useSelector từ react-redux


const style = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.background.default,
    },
    
    infor:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:screenWidth,
        height:screenHeight*0.25,

        // backgroundColor:'blue',
    },

    avatar:{
        borderRadius:screenHeight*0.05,
        borderColor:'white',
        borderWidth:5,
        width:screenHeight*0.1,
        height:screenHeight*0.1,
        
    },
    infor_detail:{
        height:screenHeight*0.25,
        width:screenWidth*0.5,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginLeft:20,
        fontSize:15,

    },
    infor_box:{
        width:screenWidth*1,
        // height:screenWidth*0.2,
        // backgroundColor:'pink',
        marginBottom:0,
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        
    },
    name:{

    },
    date:{
        width:screenWidth*1,
        height:screenHeight*0.08,
        marginBottom:2,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    gender:{
        width:screenWidth*1,
        height:screenHeight*0.08,
        marginBottom:2,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    phone:{
        width:screenWidth*1,
        height:screenHeight*0.08,
        marginBottom:2,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    email:{
        width:screenWidth*1,
        height:screenHeight*0.08,
        marginBottom:2,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        
    },
    text_box_30:{
        width:screenWidth*0.3, 
        backgroundColor:'white', 
        display:'flex', 
        alignItems:'center',
        justifyContent:'center',
    },
    text_box_65:{
        width:screenWidth*0.65, 
        backgroundColor:'white', 
        display:'flex', 
        alignItems:'center',
        justifyContent:'center',
    },
    text_size:{
        fontSize:20,
    },
    button:{
        width:screenWidth*1,
        height:screenHeight*0.07,
        backgroundColor:'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
    },
    button_changePassword:{

    },
    button_logout:{

    },
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
    item: {
        width: screenWidth,
        height: screenHeight*0.07,
        backgroundColor: 'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom: 2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemTitle: {
        flex: 1,
    },
    itemBody: {
        flex: 2 ,
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    icon_items:{
        width:25,
        height:25,
    }
})
const user_infor = {
        name:'Phuc',
        email:'phanhoangphuc0311@gmail.com',
}


const Profile = ({navigation}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    // const {user} = route.params
    const user = useSelector(state => state.auth.user);
    console.log(user)
    const gender = ["Nam", "Nữ"]
    const [date, setDate] = useState(user.date);

    console.log(date)
    return (
        <View style={style.container}>
            <View style={style.infor}>
                <Image style={style.avatar} source={{uri:`${user.avatar}`}}/>
                <Text style={{fontSize:25, marginTop:10}}>{user.fullname}</Text>

            </View>
            <View style={style.infor_box}>
                <View style={style.date}>
                    <View style={style.text_box_30}>
                        <Text>Date of birth</Text>
                    </View>
                    <View style={style.text_box_65}>
                        <MaskInput
                            value={date}
                            onChangeText={setDate}
                            mask={Masks.DATE_DDMMYYYY}
                        />
                    </View>
                </View>
                <View style={style.gender}>
                    <View style={style.text_box_30}>
                        <Text>Gender</Text>
                    </View>
                    <SelectDropdown 
                        data={gender}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        defaultButtonText={user.gender} 
                        buttonStyle={{
                            width:screenWidth*0.65,
                            backgroundColor: 'white',
                            margin:0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // borderWidth: 1,
                            // borderColor: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: 10,
                        }}

                    />
                </View>
                <View style={style.phone}>
                    <View style={style.text_box_30}>
                        <Text style={{fontSize:15}}>Phone</Text>
                    </View>
                    <View style={style.text_box_65}>
                        <Text style={{fontSize:15}}>{user.phone}</Text>
                    </View>
                </View>
                <View style={style.email}>
                    <View style={style.text_box_30}>
                        <Text style={{fontSize:15}}>Email</Text>
                    </View>
                    <View style={style.text_box_65}>
                        <Text style={{fontSize:15}}>{user.email}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={{...style.button, marginTop:20,marginBottom:30}}>
                <View style={{width:screenWidth*0.2,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:20,height:20}} source={{uri:'https://cdn-icons-png.flaticon.com/512/3359/3359235.png'}}/>
                </View>
                <View style={{width:screenWidth*0.75}}>
                    <Text style={{color:'black', fontSize:20}}>My Wallet</Text>
                </View>
            </TouchableOpacity>

{/* 
            <TouchableOpacity style={{...style.button, backgroundColor:'lightgreen', marginBottom:30}}>
                <Text style={{color:'black', fontSize:20}}>Change password</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={{...style.button,marginBottom:30}}>
                <View style={{width:screenWidth*0.2,display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:20,height:20}} source={{uri:'https://cdn-icons-png.flaticon.com/128/152/152534.png'}}/>
                </View>
                <TouchableOpacity style={{width:screenWidth*0.75}} onPress={()=>navigation.navigate('Login')}>
                    <Text style={{color:'red', fontSize:20}}>Logout</Text>
                </TouchableOpacity>
            </TouchableOpacity>
            
            <Toolbar navigation={navigation}/>
        </View>
    );
};

export default Profile;