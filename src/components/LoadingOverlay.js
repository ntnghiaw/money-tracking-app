import { StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingOverlay = () => {
  return (
    <View style={styles.container}> 
      <ActivityIndicator size='large' color='white'/>
    </View>
  )
}

export default LoadingOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
})