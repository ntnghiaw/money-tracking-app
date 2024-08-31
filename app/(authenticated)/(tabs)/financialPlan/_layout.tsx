import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs'

import { withLayoutContext } from 'expo-router'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { User, Users } from 'react-native-feather'

const { Navigator } = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator)

const CustomTabButton = ({ state, descriptors, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', margin: 8 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabButton,
              { borderColor: isFocused ? '#50C474' : '#222' },
              { borderWidth: isFocused ? 1.5 : 0 },
            ]}
          >
        
            <Text style={[styles.btnText, { color: isFocused ? '#50C474' : '#222' }]}>{label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const Layout = () => {
  return (
    <MaterialTopTabs tabBar={(props) => <CustomTabButton {...props} />}>
      <MaterialTopTabs.Screen name='budget' options={{ title: 'Budgets' }} />
      <MaterialTopTabs.Screen name='goal' options={{ title: 'Goals' }} />
    </MaterialTopTabs>
  )
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 16,
  },
  btnText: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
})

export default Layout
