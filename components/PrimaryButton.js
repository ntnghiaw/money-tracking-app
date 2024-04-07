import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Colors from '../constants/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PrimaryButton = ({ onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: 12,
        width: screenWidth*0.92,
        height: screenHeight*0.06,
        backgroundColor: Colors.background.primary,
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