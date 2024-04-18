import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, SafeAreaView, Alert, TouchableWithoutFeedback } from 'react-native';
import  { useSelector} from 'react-redux';

import { NumericFormat } from 'react-number-format';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ChevronRight } from "react-native-feather";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesgin from 'react-native-vector-icons/AntDesign';




import Colors from './Colors';
import PrimaryButton from './PrimaryButton';
import Toolbar from './Toolbar';
import formatDate from '../utils/formatDate';
import randomHexColorCode from '../utils/colorCode';


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
    const [amount, setAmount] = useState(null);
    const [mode, setMode] = useState('date');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (transaction) {
             setAmount(transaction.amount);
             setDescription(transaction.description);
             setCategory(transaction.category);
             setDate(new Date ( transaction.createAt));
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
        setCategory({
            label: 'Select your category',
            icon: "progress-question"
        });
        Alert.alert('Success!');
    }
  return (
    <View style={styles.form}>
        <View style={styles.amount}>
            <Text style={styles.amountLabel}>Amount</Text>
            <DismissKeyboard>
                <View style={styles.amountInput} >
                <TextInput 
                    style={[styles.amountText, ]} 
                    value={amount ? amount : '0'} 
                    placeholder='0' 
                    keyboardType='decimal-pad'
                    onChangeText={setAmount}
                />
                <Text style={styles.currency}>₫</Text>
                </View>
             </DismissKeyboard>
        </View>
        <View style={styles.detailsContainer}>
            <View style={styles.item}>
                <View style={styles.categoryIcon}>
                    <Icon name={category.icon} size={20}  color={randomHexColorCode}/>
                </View>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => navigation.navigate('Categories', { edit: false })} >
                        <Text  style={styles.textInput}>{category.label}</Text>
                        <ChevronRight width={24} height={24}  stroke={Colors.text.title} style={styles.categoryRightIcon}/>
                    </TouchableOpacity>
                    <View style={[styles.separator, {paddingTop: 4}]}></View>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.icon}>
                    <AntDesgin name='exclamationcircle' size={28}  color='#559BE6'/>
                </View>
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Description'
                        value={description}
                        onChangeText={setDescription}
                    />
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
        borderRadius: 6,
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
        marginHorizontal: 5,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: randomHexColorCode(),
    },
    categoryRightIcon: {
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