import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Menu from '../../pages/Menu/Menu'
import Color from '../../constants/colors'


const MoreNagivator = () => {
    const MoreStack = createNativeStackNavigator()
    return (
        <MoreStack.Navigator >
            <MoreStack.Screen name="More" component={Menu} options={{
          headerTitleAlign: 'center', 
          headerTitleStyle: { color: Color.text.title, fontSize: 18 },
        }} />
            {/* <MoreStack.Screen name="NewRecord" component={NewRecord} /> */}
        </MoreStack.Navigator>
    )
}

export default MoreNagivator