import React, {useState, useEffect} from 'react';
import { View,Text, TextInput, Button, StyleSheet, Image,Dimensions, TouchableOpacity,  Keyboard  } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      width:screenWidth,
      backgroundColor:'white',

    },
    input: {
      width: '80%',
      marginVertical: 5,
      padding: 10,
      borderBottomWidth: 1,
      borderColor: 'black',
    },
    image:{
        width: screenWidth ,
        height: '35%' ,
        resizeMode: 'cover',
    },
    login:{
        fontSize: 50,
        margin: 0,
    },


    customButton: {
        width: '35%',
        height: 50,
        backgroundColor: '#3498db',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
    buttonText: {
        color: 'white',
        fontSize: 18,
      },
  });
const Register = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword,setRepassword] = useState('');
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
          setKeyboardOpen(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setKeyboardOpen(false);
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    const handleLogin = () => {
        // Thực hiện xử lý đăng nhập ở đây
        console.log('Fullname:', name);
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('RePassword:', repassword);

      };

    return (
        <View style={styles.container}>
            {
                !keyboardOpen && (
                    <Image
                        source={require('../images/logo.jpg')} // Đường dẫn đến ảnh trong thư mục assets
                        style={styles.image}
                    />
                )
            }

           
            <Image
                source={require('../images/effect.png')}
                style={{width:'100%',height:50,marginTop:0,resizeMode:'stretch'}}

            />
            {/* <View style={{width:'80%'}}>
                <Text onPress={{}}>
                    {`< Back`}
                </Text>
            </View> */}
            <Text style={styles.login}>
                Sign Up
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TextInput
                style={styles.input}
                placeholder="Re-enter Password"
                secureTextEntry
                onChangeText={(text) => setRepassword(text)}
                value={repassword}
            />
            {/* <Button title="Login" onPress={handleLogin} style={styles.button} color={'black'} fontSize={'10px'} /> */}
            <View style={{width:'80%',alignItems:'flex-end',marginTop:10}}>
                <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default Register;
