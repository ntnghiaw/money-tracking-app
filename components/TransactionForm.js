import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard, Pressable } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { ChevronRight } from "react-native-feather";

import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import  { useSelector} from 'react-redux';
import Colors from '../constants/colors';
import PrimaryButton from './PrimaryButton';
import Toolbar from './Toolbar';
import formatDate from '../utilities/formatDate';
import AntDesgin from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DismissKeyboard = ({ children}) => (
    <TouchableWithoutFeedback onPress={() => console.log(1)}>
        {children}
    </TouchableWithoutFeedback>
)



const TransactionForm = ({navigation, onCreate, type}) => {
    const transaction = useSelector(state => state.transaction);
    const [date, setDate] = useState(() => {
        return new Date() 
    });
    const [amount, setAmount] = useState(0);
    const [mode, setMode] = useState('date');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);

    const [keyboardStatus, setKeyboardStatus] = useState('');

  
    useEffect(() => {
        if (transaction) {
             setAmount(transaction.amount);
             setDescription(transaction.description);
             setCategory(transaction.category);
            //  setDate(Date.parse(transaction.createAt));
         }
     }, [transaction]);
    
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
  return (
    <View style={styles.form}>
        <View style={styles.amount}>
            <Text style={styles.amountLabel}>Amount</Text>
            <DismissKeyboard>
                <View style={styles.amountInput} >
                <TextInput 
                    style={[styles.amountText, {color: transaction.type === 'expense' ? Colors.text.danger : Colors.text.primary}]} 
                    value={amount} 
                    placeholder='0' 
                    // onChangeText={ (text) => setAmount(text)}
                    keyboardType='decimal-pad'
                />
            
                <Text style={styles.currency}>₫</Text>
                </View>
             </DismissKeyboard>
            
            

        </View>
        <View style={styles.detailsContainer}>
            <View style={styles.item}>
                <View style={styles.icon}>
                    <AntDesgin name='questioncircle' size={28}  color='orange'/>
                </View>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => navigation.navigate('Categories', {onCategoryChange})} >
                        <Text  style={styles.textInput}>Select your category</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.categoryIcon}/>
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                </View>
            </View>
 
    
            <View style={styles.item}>
                <View style={styles.icon}>
                    <AntDesgin name='calendar' size={28}  color='orange'/>
                </View>
                <SafeAreaView style={styles.calendar} keyboardDismissMode="on-drag">
                    <View style={styles.buttonControl}>
                    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={showDatepicker}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>{formatDate(date, 'dd/mm/yy')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={showTimepicker}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>{formatDate(date, 'hh/mm')}</Text>
                        </TouchableOpacity>
                    </View>
                 
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
                </SafeAreaView>
               
            </View>
            
            <View style={styles.input}>
                <View style={styles.icon}>
                    <AntDesgin name='calendar' size={28}  color='orange'/>
                    

                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Description'
                    value={description}
                    onChangeText={setDescription}
                />

            </View>
        </View>
        <View style={styles.createButton}>
            <PrimaryButton title= 'Save' onPress={onCreateHandler}/>

        </View>

    </View>
  )
}

export default TransactionForm;

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
        paddingHorizontal: 10
    },
    amount: {
        height: screenHeight*0.16,
        borderRadius: 14,
        backgroundColor: '#E5F2FF',
        width: '100%',
        paddingHorizontal: screenWidth*0.04,
        paddingVertical: screenHeight*0.01,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    amountLabel : {
        fontSize: 16,
        fontWeight: '500',
        marginTop: screenHeight*0.01,
    },
    amountInput:{
        flexDirection: 'row', 
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    currency: {
        fontSize: 32, 
        lineHeight: 60
    },
    amountText: {
        
        fontSize: 32,
        fontWeight: '600',
        paddingVertical: 8,
        paddingRight: screenWidth*0.03
    },
    item: {
        flexDirection: 'row',
        marginVertical: 12
    },
    input: {
        marginLeft: 12,
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
        marginLeft: 16,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: screenWidth*0.76,
        justifyContent: 'space-between',
    },
    categoryLabel: {
        fontSize: 18,
        color: Colors.text.title,
        paddingBottom: 24

    },
    categoryIcon: {
        position: 'absolute',
        right: 0
    },
    calendar: {
        width: screenWidth*0.76,
        marginLeft: 16,
        paddingBottom: 24
    },
    buttonControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,

    },
    datePicker: {
        maxHeight: screenHeight*0.15
    },

    createButton: {
        marginTop: screenHeight*0.05
    },
    button: {
        paddingVertical: 12
    },
   
});