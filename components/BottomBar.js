// import React,{useState} from 'react';
// import {View, Text, Dimensions, Button, StyleSheet, TextInput, TouchableOpacity, Image, Platform} from 'react-native'
// import MaskInput, { Masks } from 'react-native-mask-input'
// import MultiSelect from 'react-native-multiple-select';
// import SelectDropdown from 'react-native-select-dropdown'
// // import Icon from 'react-native-vector-icons/FontAwesome'; // Import icon từ thư viện
// import * as Icon from "react-native-feather";
// import Colors from '../constants/colors';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').height

// const style = StyleSheet.create({
//     toolbar:{
//         width:screenWidth,
//         height:screenHeight*0.08,
//         display:'flex',
//         flexDirection:'row',
//         justifyContent:'space-around',
//         position:'absolute',
//         bottom:0,
//         backgroundColor:'white',

//     },
//     items:{
//         width:screenWidth*0.2,
//         height:screenHeight*0.08,
//         display:'flex',
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     icon_items:{
//         width:25,
//         height:25,
//     }
// })

// const Tab = createBottomTabNavigator();

// const BottomBar = () => {
//     return (
//         <Tab.Navigator>
//         <View style={style.toolbar}>
//             <View style={style.items}>
//                 <TouchableOpacity>
//                     <Icon.Home stroke={Colors.icon.default}/>
//                 </TouchableOpacity>
//             </View>
//             <View style={style.items}>
//                 <TouchableOpacity>
//                     <Icon.BarChart2 stroke={Colors.icon.default}/>
//                 </TouchableOpacity>
//             </View>
//             <View style={style.items}>
//                 <TouchableOpacity>
//                     <Icon.PlusCircle width={40} height={40} stroke={Colors.icon.default}/>
//                 </TouchableOpacity>
//             </View>
//             <View style={style.items}>
//                 <TouchableOpacity>
//                     <Icon.Grid stroke={Colors.icon.default}/>
//                 </TouchableOpacity>
//             </View>
//             <View style={style.items}>
//                 <TouchableOpacity>
//                     <Icon.User stroke={Colors.icon.default}/>
//                 </TouchableOpacity>
//             </View>
//         </View>
//         </Tab.Navigator>

//     );
// };

// export default BottomBar;