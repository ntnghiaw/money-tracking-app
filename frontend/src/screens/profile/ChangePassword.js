import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '../../components/Colors'

const sreenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useDispatch()
  const { password } = useSelector((state) => state.auth.user)

  const validateConfirmPassword = () => {
    // check if the confirm password is the same as the new password
    const isMatch = newPassword === confirmPassword
    setError(isMatch)
    return isMatch
  }

  const handleOnSubmit = () => {
    if (newPassword !== confirmPassword) {
      return setError(true)
    }

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Your password must be at least 6 characters and should include a
              combination of letters, numbers and special characters.
            </Text>
          </View>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              value={currentPassword}
              placeholder='Enter Your Current Password'
              onChangeText={(e) => setCurrentPassword(e)}
            />
          </View>
          <View
            style={[
              styles.input,
              { borderColor: error ? Colors.text.danger : '' },
            ]}
          >
            <TextInput
              style={styles.inputText}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(e) => setNewPassword(e)}
              placeholder='Enter Your New Password'
            />
          </View>
          <View
            style={[
              styles.input,
              { borderColor: error ? Colors.text.danger : '' },
            ]}
          >
            <TextInput
              style={[styles.inputText]}
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(e) => setConfirmPassword(e)}
              placeholder='Confirm Your New Password'
            />
          </View>

          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              Change Your Password
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  description: {
    width: '90%',
    marginBottom: 20,
  },
  descriptionText: {
    textAlign: 'center',
    color: Colors.text.title,
    letterSpacing: 1,
    fontSize: 14,
  },
  input: {
    width: sreenWidth * 0.9,
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    flexDirection: 'row',
    // justifyContent:'center',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  logo: {
    width: 30,
    height: 20,
    marginLeft: 20,
    marginRight: 15,
  },
  inputText: {
    flex: 1,
    height: 50,
  },
  button: {
    width: sreenWidth * 0.9,
    height: screenHeight * 0.06,
    marginTop: 40,
    backgroundColor: '#50C474',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: Colors.text.danger,
  },
  link: {
    marginBottom: 20,
    paddingLeft: 8,
    width: sreenWidth * 0.9,
  },
  linkText: {
    textAlign: 'left',
    color: Colors.background.primary,
    fontSize: 16,
    fontWeight: '500',
  },
})
