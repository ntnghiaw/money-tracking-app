import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Button, SafeAreaView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NumericFormat } from 'react-number-format';
import * as Icon from "react-native-feather";
import PrimaryButton from '../components/Button';

import React, {useEffect, useState} from 'react';
import Colors from '../constants/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const TransactionForm = ({navigation, route, onCreate, type}) => {
    const [date, setDate] = useState(() => {
        return new Date() 
    });
    
    const [mode, setMode] = useState('date');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Pay to Employee' );
    const [show, setShow] = useState(false);
    const currentDate= `${date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate().toString()} / ${date.getMonth() < 9 ? '0'+(date.getMonth()+1).toString(): date.getMonth()+1} / ${date.getFullYear()}`;
    const time = ` ${date.getHours().toString().length > 1 ? date.getHours() : '0' + date.getHours().toString()} : ${date.getMinutes().toString().length > 1 ? date.getMinutes():  '0' + date.getMinutes().toString() }` ;
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
    const [amount, setAmount] = useState( 0);
    const {transaction} = route.params;
    useEffect(() => {
       if (transaction) {
            setAmount(transaction.amount);
            setDescription(transaction.description);
            setCategory(transaction.category);
            // setDate(Date.parse(transaction.createAt));
        }
    }, [transaction]);
 
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
            <View style={styles.amountInput}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <TextInput 
                style={styles.amountText} 
                value={amount.toString()} 
                placeholder='0' 
                onChangeText={(amount) => setAmount(amount)}
                keyboardType='numeric'
             />
            
             </TouchableWithoutFeedback>
                <Text style={styles.currency}>₫</Text>
            </View>
            
            

        </View>
        <View style={styles.detailsContainer}>
            <View style={styles.input}>
                <View style={styles.icon}>
                    <Icon.DollarSign width={24} height={24}  stroke="green"/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Category', {onCategoryChange})} style={styles.category} >
                
                    <Text  style={styles.categoryLabel}>{category}</Text>
                    <Icon.ChevronRight width={24} height={24}  stroke={Colors.text.title}/>

                 </TouchableOpacity>

            </View>
 
            <View style={styles.input}>
                <View style={styles.icon}>
                    <Icon.Info width={24} height={24}  stroke="orange"/>
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder='Description'
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />

            </View>
            <View style={styles.input}>
                <View style={styles.icon}>
                    <Icon.Calendar width={24} height={24}  stroke="#559BE6"/>
                </View>
                <SafeAreaView style={styles.calendar}>
                    <View style={styles.buttonControl}>
                    
                        <TouchableOpacity
                            style={styles.button}
                            onPress={showDatepicker}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>{currentDate}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={showTimepicker}
                            underlayColor='#fff'>
                            <Text style={styles.loginText}>{time}</Text>
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
            <PrimaryButton title={transaction? 'Save': 'Create'} onPress={onCreateHandler}/>

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
        justifyContent: 'center'
    },
    currency: {
        fontSize: 32, 
        lineHeight: 60
    },
    amountText: {
        // color: type === 'expense' ? Colors.text.danger : Colors.text.title,
        fontSize: 32,
        fontWeight: '600',
        paddingVertical: 8,
        paddingRight: screenWidth*0.03
    },
    input: {
        flexDirection: 'row',
        marginVertical: 12
    },
    textInput: {
        width: screenWidth*0.76,
        fontSize: 18,
        marginLeft: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        paddingBottom: 24
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: Colors.icon.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
        // backgroundColor: 'red'
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