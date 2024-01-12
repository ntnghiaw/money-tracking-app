import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewRecord from '../../pages/Record/NewRecord'
import Color from '../../constants/colors'


const NewRecordNavigator = () => {
    const NewRecordStack = createNativeStackNavigator()
    return (
        <NewRecordStack.Navigator >
            <NewRecordStack.Screen name="NewRecord" component={NewRecord} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
        }} />
        </NewRecordStack.Navigator>
    )
}

export default NewRecordNavigator