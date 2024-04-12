import { View, Text } from 'react-native'
import React from 'react'
import { useFonts, ABeeZee_400Regular, } from '@expo-google-fonts/abeezee';
import Colors from './colors';

const TitleText = (props) => {
    
  let [fontsLoaded, fontError] = useFonts({
    ABeeZee_400Regular,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
      <Text style={{fontSize: props.size, fontFamily: 'ABeeZee_400Regular', color: Colors.text.title}}>{props.children}</Text>
  )
}

const BodyText = (props) => {
      let [fontsLoaded, fontError] = useFonts({
     ABeeZee_400Regular,
      });
      if (!fontsLoaded && !fontError) {
     return null;
      }
      return (
        <Text style={{fontSize: 16, fontFamily: 'ABeeZee_400Regular', color: Colors.text.body}}>{props.children}</Text>
      )
}

const DangerousText = (props) => {
      let [fontsLoaded, fontError] = useFonts({
     ABeeZee_400Regular,
      });
      if (!fontsLoaded && !fontError) {
     return null;
      }
      return (
        <Text style={{fontSize: 16, fontFamily: 'ABeeZee_400Regular', color: Colors.text.danger}}>{props.children}</Text>
      )
}

exports.TitleText = TitleText;
exports.BodyText = BodyText;
exports.DangerousText = DangerousText;
