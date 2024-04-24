import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Facebook } from 'react-native-feather';
import { useDispatch } from 'react-redux';
import Toolbar from '../../../../src/components/Toolbar';
import Colors from '../../../../src/components/Colors';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const Goals = ({navigation}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('GoalDetails')}>
        <View style={styles.header}>
          <View style={styles.icon}>
            <Facebook width={40} height={40}  fill="blue"/>
          </View>
          <View style={styles.name}>
            <Text style={styles.titleText}>Saving</Text>
            <Text style={styles.duration}>
              01/04-30/04
            </Text>
          </View>
          <View style={styles.amount}>
           <Text style={styles.titleText}>
            50.000.000d
           </Text>
          </View>
        </View>
        <View style={styles.progress} > 
          <View style={styles.progressBar}>
            <View style={[styles.current, {width: '20%'}]}>

            </View>
          </View>
          <View style={styles.info}>
            <View style={styles.remainingTime}>
              <Text>Còn 25 ngày</Text>
            </View>
            <View style={styles.percents}>
              <Text>10%</Text>
            </View>
          </View>
        </View>
      
      </TouchableOpacity>


    </View>
  )
}

export default Goals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  navigationBar: {
    flexDirection: 'row',
    height: screenHeight*0.06,
    backgroundColor: '#FFF',

  },
  leftSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#49F064',
    borderBottomWidth: 3,
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginTop: 20,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    
    alignItems: 'flex-end'
  },
  icon: {
    flex: 1
  },
  name: {
    flex: 3
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500'
  },
  description: {
    lineHeight: 24,
    color: Colors.text.body
  },

  progress: {
    marginTop: 20,
  },
  progressBar: {
    marginVertical: 12,
    height: 10,
    width: '100%',
    borderRadius: 2,
    backgroundColor: '#ccc'
  },
  current: {
    height: 10,
    borderRadius: 2,
    width: 0,
    backgroundColor: '#49F064',

  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
})