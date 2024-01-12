import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Report from '../../pages/Report/Report'
import Color from '../../constants/colors'

const ReportNavigator = () => {
  const ReportStack = createNativeStackNavigator()
  return (
    <ReportStack.Navigator >
      <ReportStack.Screen name="Report" component={Report}  options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
        }} />
    </ReportStack.Navigator>
  )
}

export default ReportNavigator