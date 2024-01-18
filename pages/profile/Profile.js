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

const GENERATE_AVATAR_URL = 'https://ui-avatars.com/api/?name=';

const user_infor = {
    id: 5, 
        username: 'ntnghiaw@gmail.com', 
        password: 'TrungNghia0!',
        name:'Nguyễn Trung Nghĩa',
        date:'26/04/2002',
        gender:'Nam',
        phone:'0384042202',
        email:'ntnghiaw@gmail.com',
        avatar:'',
      
}


const Profile = ({navigation, route}) => {
    
    const [selectedItems, setSelectedItems] = useState([]);
    const user  = user_infor ;
    const gender = ["Nam", "Nữ"]
    const [date, setDate] = useState(user.date);

   
    let [fontsLoaded, fontError] = useFonts({
        ABeeZee_400Regular,
      });
    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <View style={style.container}>
            <View style={style.infor}>

                <Image style={style.avatar} source={{uri: user.avatar ? user.avatar : `${GENERATE_AVATAR_URL + user.name}&background=random`}}/>
                <View style={{marginTop: 20}}>
                <TitleText size={20}>{user.name}</TitleText>

                </View>

            </View>
            <View>
                <View  style={style.item}>
                    <View style={style.itemTitle}>
                        <TitleText>Date of birth</TitleText>
                    </View>
                    <View style={style.itemBody}>
                        <MaskInput
                            value={date}
                            onChangeText={setDate}
                            mask={Masks.DATE_DDMMYYYY}
                            style={{fontFamily: 'ABeeZee_400Regular', fontSize: 16, color: Colors.text.body}}
                        />
                    </View>
                </View>
                <View  style={style.item}>
                    {/* <Text style={style.text_box_30}>Gender</Text> */}
                    <View style={style.itemTitle}>

                        <TitleText >Gender</TitleText>
                    </View>
                    <View style={style.itemBody}>
                        <Picker
                            selectedValue={selectedItems}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedItems(itemValue)

                            }
                            itemStyle={{ 
                                backgroundColor: 'red'
                            }}
                            style={{
                                width: '100%' ,
                                height:screenHeight*0.024,
                                display:'flex',
                                flexDirection: 'column'
                            }}
                            mode='dropdown'

                            >
                            <Picker.Item label="Male" value="0"   style={{
                                fontFamily: 'ABeeZee_400Regular',
                                fontSize: 16,
                                color: Colors.text.body,

                            }}
                              
                            />
                            <Picker.Item label="Female" value="1"   style={{
                                fontFamily: 'ABeeZee_400Regular',
                                fontSize: 16,
                                color: Colors.text.body
                            }}/>
                        </Picker>
                    </View>
                   
                </View>
                <View  style={style.item}>
                <View style={style.itemTitle}>

                    <TitleText>Phone</TitleText>
                    </View>
                    <View style={style.itemBody}>

                    <BodyText>{user.phone}</BodyText>
                    </View>
                </View>
                <View  style={style.item}>
                    <View style={style.itemTitle}>
                        <TitleText>Email</TitleText>
                    </View>
                    <View  style={style.itemBody}>
                        <BodyText>{user.email}</BodyText>
                    </View>
                </View>
            </View>

            <TouchableOpacity style={{ ...style.button, ...style.item, marginTop:30, marginBottom: 3}}>
            <View style={{...style.itemTitle}}>
                <Text>

                    <Icon name="wallet-outline" size={26} color={Colors.text.title} />
                </Text>
                </View>
                <View style={{...style.itemBody, flex: 6}}>
                    <TitleText size={18}>
                       My Wallet
                    </TitleText>
                    <ChevronRight stroke={Colors.icon.default}/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...style.button, ...style.item}}>
            <View style={{...style.itemTitle}}>
                <Text>
                
                <SimpleLineIcon name='logout' size={22} color={Colors.text.title} />
                </Text>
                </View>
                <View style={{...style.itemBody, flex: 6}} >
                    <DangerousText size={18}>
                        Logout
                    </DangerousText>
                </View>
            </TouchableOpacity>
            
        </View>
    );
};

export default Profile;


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