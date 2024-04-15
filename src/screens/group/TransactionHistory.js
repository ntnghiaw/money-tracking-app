import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  }
})

const TransactionHistory = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>TransactionHistory</Text>
      <View>
        <Image/>
        <TextInput>
          Name
        </TextInput>
      </View>
    </View>
  )
}

export default TransactionHistory