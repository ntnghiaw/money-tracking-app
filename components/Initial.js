import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions, 
  
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Initial = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
      // Thực hiện xử lý đăng nhập ở đây
      console.log('Username:', username);
      console.log('Password:', password);
    };
  return (
      <View style={styles.container}>
        <Image
          source={require('../images/logo.jpg')} // Đường dẫn đến ảnh trong thư mục assets
          style={styles.image}
        />
        <Image
          source={require('../images/effect.png')}
          style={{width:'100%',height:50,marginTop: 0,resizeMode:'stretch'}}
        />
        <Text style={{fontSize:80,marginTop:50}}>
          E-wallet
        </Text>
        <View style={{width:'80%',alignItems:'flex-end',marginTop:50}}>
          <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{width:'80%',alignItems:'flex-end',marginTop:50}}>
          <TouchableOpacity style={styles.customButtonLogin} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>    
  );
};




export default Initial;


const styles = StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center',
    alignItems:'center',
    width:screenWidth,
    backgroundColor:'white',
  },
  image:{
    width: screenWidth ,
    height: '35%' ,
    resizeMode: 'cover', 
  },
  customButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#00BEDF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonLogin: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#00BEDF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
      color: 'black',
      fontSize: 18,
    },
});
