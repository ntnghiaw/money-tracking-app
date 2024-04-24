import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

export default function CameraButton({ size, onPress }) {
    const innerButtonSize = size - 12
  return (
    <TouchableOpacity style={[styles.buttonBorder, {width: size, height: size, borderRadius: 0.5*size}]}  >
      <TouchableOpacity style={[styles.button, {width: innerButtonSize, height: innerButtonSize, borderRadius: 0.5*innerButtonSize}]} onPress={onPress}>
        </TouchableOpacity>
    </TouchableOpacity>
    
  )
}

const styles = StyleSheet.create({
    buttonBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'white'
    },
    button: {
        backgroundColor: 'white',
       
        
    },
    
})