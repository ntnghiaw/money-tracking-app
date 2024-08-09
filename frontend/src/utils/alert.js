import { Alert } from "react-native";

export const showAlert = (title, message, onCancel, onOK) => {
   Alert.alert(title, message, [
     {
       text: 'Cancel',
       onPress: onCancel || console.log('Cancel Pressed'),
       style: 'cancel',
     },
     { text: 'OK', onPress: onOK || console.log('OK Pressed') },
   ])  
}