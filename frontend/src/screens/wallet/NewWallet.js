import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Alert } from 'react-native'
import React,{useState} from 'react'
import celebrate from '../../../assets//images/celebrate_icon.png';
import PrimaryButton from '../../components/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { createWallet } from '../../redux/actions/walletAction';
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    image:{
        width:150,
        height:150,
        margin:50,
    },
    button:{

        marginTop:75,
    },
    text:{
        fontSize:40,
        color:'#559BE6',
        textAlign:'center',
    },
    box_input:{
        width:screenWidth*0.8,
        height:50,
        marginTop:40,

    },

})

const NewWallet = ({ navigation }) => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth); // Đảm bảo có state.auth trong store
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    
    const handleCreateWallet = () => {
        if (!name || !balance) {
            Alert.alert('Validation Error', 'Please enter both name and balance');
            return;
        }
        
        dispatch(createWallet(auth.userId, name, parseFloat(balance), 'private')) // 'default' là loại ví, có thể thay đổi nếu cần
            // .then(() => {
            //     navigation.navigate('Home',{user: auth.user});
            // })
            // .catch((error) => {
            //     Alert.alert('Error', 'Failed to create wallet. Please try again.');
            //     console.error(error);
            // });
    };

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={celebrate} />
            <Text style={styles.text}>Create your first financial wallet</Text>
            <View style={styles.box_input}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2506/2506858.png' }} />
                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.box_input}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2474/2474450.png' }} />
                <TextInput
                    style={styles.input}
                    placeholder='Balance'
                    value={balance}
                    onChangeText={setBalance}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.button}>
                <PrimaryButton title="Create" onPress={handleCreateWallet} />
            </View>
        </View>
    );
};

export default NewWallet;

