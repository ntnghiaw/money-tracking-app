import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Button = ({ onPress, title,  color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, ]}>
        <Text style={[styles.text, { color : color }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: 12,
        width: screenWidth*0.92,
        height: screenHeight*0.06,
        // paddingVertical: 12,
        paddingHorizontal: 12,
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: "#fff",
        textAlign: 'center',
        fontWeight: "400",
        alignSelf: "center",
        // textTransform: "uppercase"
    }
})