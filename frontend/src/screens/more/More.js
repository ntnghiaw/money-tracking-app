import { 
    View, 
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native'

import React, {useState, useEffect} from 'react';

import Toolbar from '../../../../src/components/Toolbar';

import more_items from './moreJson'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1,
    },  
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
      },
    cell: {
        width: screenWidth*0.37, // Mỗi hàng chỉ chứa 2 ô
        height: screenWidth*0.37,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 12,
        marginHorizontal: '1.5%',
        borderRadius: 10,
      },
    icon:{
        width:50,
        height:50,
        borderRadius: 8,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
  });
  

const More = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.gridContainer}>
            {more_items.map((item, index) => (
                <TouchableOpacity key={index} style={styles.cell} onPress={() => navigation.navigate(`${item.path}`)}>
                    <View style={{...styles.icon, backgroundColor:(`${item.background}`)}}>
                      <Image style={{width: 35, height: 35}} source={item.image}/>
                    </View>
                    <Text style={{paddingTop:10, fontSize: 18}}>{item.content}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        <Toolbar navigation={navigation}/>
    </View>
    
  )
}

export default More