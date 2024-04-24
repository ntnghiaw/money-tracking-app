import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import PrimaryButton from '../../../src/components/PrimaryButton'
import Button from '../../../src/components/Button'
import Colors from '../../../src/components/Colors'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ProgressCircle } from 'react-native-svg-charts'

const ICON_SIZE = 60

export default function GoalDetails({ navigation }) {

    const target = 180000
    const current = 80000
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
            <MaterialIcon name='car'  size={32} color={'white'} />
        </View>
        <View style={styles.name}>
            <Text style={styles.nameText}>New vehicle</Text>
            <Text style={styles.targetDate}>
             Target date 26/12/2023
            </Text>
        </View>
     
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
            <ProgressCircle 
                progress={0.7}
                style={{ height: 200, width: 200 }}
                strokeWidth={14}
                progressColor={Colors.background.primary}
            />
        </View>
        <View style={styles.chartDesc}>
            <Text style={styles.percents}>{`${Math.round(current*100/target)}%`}</Text>
            <Text style={styles.completeRate}> {`${current} / ${target}`} </Text>
            <Text style={styles.currency}>d</Text>

        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.remindText}>Minimum week amount to reach goal</Text>
        <Text style={styles.amount}>0 đ</Text>
      </View>
      <View style={styles.buttonsControl}>
        <PrimaryButton  title='Add new amount' onPress={() => navigation.navigate('Amount')}/>
        <Button  title='Set goal as reached' color={Colors.background.primary} backgroundColor={'white'} onPress={() => console.log('Set goal as reached')}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center'
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        backgroundColor: '#51DAF9',
        borderRadius: ICON_SIZE*0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        marginLeft: 24,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 2,

    },
    targetDate: {
        marginTop: 8,
        color: Colors.text.body,
        fontSize: 14,
        letterSpacing: 2,

    },
    chart: {
        marginVertical: 40,
    },
    chartDesc: {
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY: -200}]
    },
    percents: {
        color: Colors.background.primary,
        fontSize: 28,
        fontWeight: '600',
        marginVertical: 4,
    },
    completeRate: {
        color: Colors.text.body,
        marginTop: 24,
    },
    currency: {
        color: Colors.text.body,
        marginVertical: 4,
    },
    amountContainer: {
        transform: [{ translateY: -100}]
        
    },
    remindText: {
        color: Colors.text.body,
        fontSize: 16,
        letterSpacing: 1,
    },
    amount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },

    progress: {
        
    },
})