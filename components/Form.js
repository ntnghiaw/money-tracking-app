import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import {  Calendar, ChevronRight } from 'react-native-feather'; 
import React, {useEffect, useState} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import  { useSelector} from 'react-redux';
import  Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'


import Colors from '../constants/colors';
import PrimaryButton from './PrimaryButton';
import Period from './Periods';
import formatDate from '../utilities/formatDate';


const periods = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
  ];


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DismissKeyboard = ({ children}) => (
    <TouchableWithoutFeedback onPress={() => console.log(1)}>
        {children}
    </TouchableWithoutFeedback>
)



const Form = ({navigation, onCreate, type}) => {
    const transaction = useSelector(state => state.transaction);
    const [date, setDate] = useState(() => new Date());
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState('date');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);
    const [period, setPeriod] = useState('');
    // const [keyboardStatus, setKeyboardStatus] = useState('');

  

    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
  


    const onCreateHandler = () => {
        
        onCreate({
            amount,
            category,
            description,
            createAt: date,
            type,
        });
        setAmount('');
        setDescription('');
        setCategory('Select the category');
        Alert.alert('Success!');
    }
    const onCategoryChange = (category) => {
        setCategory(category);
    }

    const renderItem = item => {
        return (
          <View style={styles.dropdownItem}>
            <Text style={styles.dropdownTextItem}>{item.label}</Text>
       
          </View>
        );
      };
  return (
    <View style={styles.form}>
        
        <View style={styles.detailsContainer}>
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Icon name='contacts' size={28}  color='orange' />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Name'
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.separator}></View>
                </View>
              

            </View>
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Icon size={28} name='checkcircle' color={ Colors.text.primary} />
                </View> 
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Amount'
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        />
                    <View style={styles.separator}></View>
                </View>

            </View>
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Icon name='questioncircle' size={28}  color='orange' />
                </View>
                <View style={styles.input}>
                    <Pressable onPress={() => navigation.navigate('Categories')} style={styles.pressable} >
                        <Text  style={[styles.textInput, {paddingBottom: 12}]}>Select your category</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.categoryIcon}/>
                    </Pressable>
                    <View style={styles.separator}></View>
                    
                </View>
            </View>

            <View style={styles.item}>
                <View style={styles.icon}>
                    <Entypo name='ccw' size={28}  color='#d1adad'/>
                </View>
                <View style={styles.input}>
                    <Pressable onPress={() => navigation.navigate('Periods')} style={styles.pressable} >
                        <Text  style={[styles.textInput, {paddingBottom: 12}]}>Repeat</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.categoryIcon}/>
                    </Pressable>
                    <View style={styles.separator}></View>
                </View>
            </View>
 
            
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Calendar width={24} height={24}  stroke="#559BE6"/>
                </View>
                <ScrollView style={styles.input} keyboardDismissMode="on-drag">
                    <TouchableOpacity
                        onPress={showDatepicker}
                        underlayColor='#fff'>
                        <Text  style={styles.textInput}>{`Start date`}</Text>
                        <Text  style={styles.textInput}>{date && formatDate(date, 'dd/mm/yy')||`Start date`}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                    <View style={styles.datePicker}>
                        {show && (
                                <RNDateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                display='spinner'
                                is24Hour={true}
                                onChange={onChange}
                                />
                            )}
                     </View>
                </ScrollView>
             
            </View>
           
        </View>
        <View style={styles.createButton}>
            <PrimaryButton title= 'Create' onPress={onCreateHandler}/>

        </View>

    </View>
  )
}

export default Form;

const styles = StyleSheet.create({
    form: {
        paddingVertical: screenHeight*0.025,
    },
    detailsContainer: {
        marginTop: 20,
        borderRadius: 14,
        shadowColor: '#ccc',
        shadowOffset: {width: 1, height: 1},
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 10,

    },
  
    item: {
        flexDirection: 'row',
        marginVertical: 12
    },
    input: {
        paddingLeft: 10,
        width: screenWidth*0.77,
        position: 'relative'
    },
    separator: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.text.body
    },
    textInput: {
        fontSize: 16,
        paddingBottom: 8,
        color: Colors.text.title
    },

    icon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    category: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: screenWidth*0.76,
        justifyContent: 'space-between',
        alignItems: 'center', 
    },
    categoryLabel: {
        fontSize: 18,
        color: Colors.text.title,
    },
    categoryIcon: {
        position: 'absolute',
        right: 0
    },
    calendar: {
        width: screenWidth*0.76,
    },
    buttonControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: 'red'
    },
    datePicker: {
        maxHeight: screenHeight*0.15
    },

    createButton: {
        marginTop: screenHeight*0.05
    },
    calendarButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    pressable: {
        marginTop: 2
    },
    dropdown: {
        height: 30,
        backgroundColor: 'white',
        paddingBottom: 12,
    },
    dropdownItem: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    dropdownTextItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: Colors.text.body
    },
    selectedTextStyle: {
        fontSize: 16,
        color: Colors.text.title
    },

});