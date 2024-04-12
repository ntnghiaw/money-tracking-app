import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ArrowLeft } from 'react-native-feather';
import { SelectCountry } from 'react-native-element-dropdown';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function  CustomizedHeader  ({navigation, route, reducer, headerLeft, headerRight, dispatchFunction, types })  {
    const dispatch = useDispatch();
    const currentType = useSelector(state => state[reducer].type);
    const [option, setOption] = useState(currentType);
    const chooseOptionHandler = (e) => {
      setOption(e.value);
      dispatch(dispatchFunction(e.value));
    }
    return (
        <View style={styles.headerContainer}>
            <View>
                {headerLeft()}
            </View>
        <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        imageStyle= {{display: 'none'}}
        maxHeight={200}
        value={option}
        data={types}
        valueField="value"
        labelField="lable"
        onChange={chooseOptionHandler}
      />
            <View>
                {headerRight()}
            </View>
        </View>
  
    )
   
  }
  
  

const styles = StyleSheet.create({
    headerContainer: {
        height: screenHeight*0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: screenHeight*0.04,
        paddingHorizontal: screenWidth*0.04,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
      },
      dropdown: {
        marginLeft: screenWidth*0.04,
        height: screenHeight*0.03,
        width: screenWidth*0.35,
        backgroundColor: '#fff',
        // borderRadius: 0,
        paddingHorizontal: 12,
      },
      selectedTextStyle: {
        fontSize: 20,
        color: Colors.text.title,
        fontWeight: 500,
      },
      iconStyle: {
        width: 28,
        height: 28,
        tintColor: Colors.text.title
      },

})