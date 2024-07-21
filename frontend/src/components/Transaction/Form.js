import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback, Pressable } from 'react-native';
import {  Calendar, ChevronRight } from 'react-native-feather'; 
import React, { useEffect, useState, useRef } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import  { useSelector, useDispatch} from 'react-redux';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation'


import Colors from '../Colors';
import PrimaryButton from '../PrimaryButton';
import formatDate from '../../utils/formatDate';
import { createBudget } from '../redux/actions/planAction';


const periods = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' },
    { label: 'Year', value: 'year' },
  ];


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const Form = ({navigation}) => {
    const dispatch = useDispatch();
    const plan = useSelector(state => state.plan);
    const [type, setType] = useState(plan.type);
    const [date, setDate] = useState(() => new Date());
    const [amount, setAmount] = useState(null);
    const [mode, setMode] = useState('date');
    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);
    const [period, setPeriod] = useState(plan.period);  
    const textInputRef = useRef(null);
    const blurTextInput = () => {
        if (textInputRef.current) {
          textInputRef.current.blur();
        }
      };
    useEffect(() => {
        setPeriod(plan.period)
        setType(plan.type)
    }, [plan]);
    
    
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

    const onCreateHandler = () => {
        
        dispatch(createBudget({
            name,
            amount,
            category,
            period,
            startDate: date,
        }));
        setAmount('');
        setName('');
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
                    <Foundation size={36} name='info' color={ Colors.text.primary} />
                </View> 
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={type === 'budget' ? `Amount` : 'Target Amount'}
                        value={amount&&amount.toString()}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        />
                    <View style={styles.separator}></View>
                </View>

            </View>
            {
                type === 'budget' &&
            <View style={styles.item}>
                <View style={styles.categoryIcons}>
                    <View style={styles.categoryIcon}>
                        <Icon name='animation' size={22}  color='orange' />
                    </View>
                    <View style={[styles.categoryIcon, { left: 10, zIndex: -1 }]}>
                        <Icon name='animation' size={22}  color='orange' />
                    </View>
                    <View style={[styles.categoryIcon, { left: 20, zIndex: -2 }]}>
                        <Icon name='animation' size={22}  color='orange' />
                    </View>

                </View>
                
                <View style={styles.input}>
                    <Pressable onPress={() => navigation.navigate('Categories', { edit: true})} style={styles.pressable} >
                        <Text  style={[styles.textInput, {paddingBottom: 12}]}>Select your category</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.rightIcon}/>
                    </Pressable>
                    <View style={styles.separator}></View>
                    
                </View>
            </View>
            }
{
                type === 'budget' &&
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Entypo name='ccw' size={28}  color='#d1adad'/>
                </View>
                <View style={styles.input}>
                    <Pressable onPress={() => navigation.navigate('Periods')} style={styles.pressable} >
                        <Text  style={[styles.textInput, {paddingBottom: 12}]}>{period.label}</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.rightIcon}/>
                    </Pressable>
                    <View style={styles.separator}></View>
                </View>
            </View>
}

        {type === 'goal' && 
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Icon name='note-edit-outline' size={28}  color='orange' />
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={[styles.textInput, ]}
                        placeholder='Note'
                        value={note}
                        blurOnSubmit={true}
                        numberOfLines={2}
                        onChangeText={setNote}
                        multiline
                    />
                    <View style={styles.separator}></View>
                </View>
            </View>
            }
            
            <View style={styles.item}>
                <View style={styles.icon}>
                    <Calendar width={24} height={24}  stroke="#559BE6"/>
                </View>
                <ScrollView style={styles.input} keyboardDismissMode="on-drag">
                    <TouchableOpacity
                        onPress={showDatepicker}
                        underlayColor='#fff'>
                        <Text  style={styles.textInput}>{type === 'budget' ? `Start date` : 'Desired date'}</Text>
                        <Text  style={styles.textInput}>{date && formatDate(date, 'dd/mm/yy')}</Text>
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
        marginHorizontal: 5,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: randomHexColorCode(),
        position: 'absolute',
        left: 0,
        borderColor: 'white',
        borderWidth: 2
    },
    categoryIcons: {
        marginLeft: -10,
        flexDirection: 'row',
        position: 'relative',
        marginRight: 50,
    },
    rightIcon: {
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