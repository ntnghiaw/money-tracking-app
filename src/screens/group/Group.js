import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import group_icon from '../../images/icons/group_icon.png'
import edit_icon from '../../images/icons/edit_icon.png'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'center',
    alignItems: 'center'
  },
  group_container:{
    backgroundColor:'white',
    width: screenWidth*0.9,
    height: screenHeight*0.11,
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginBottom: 30,
  },
  icon_container:{
    width: screenWidth*0.15,
    height: screenWidth*0.15,
    backgroundColor:'#F7F7F7',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  text_container:{
    width: screenWidth*0.5,

  },
  edit_icon:{
    width: screenWidth*0.15,
    // backgroundColor:'pink',
    height: screenWidth*0.15,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
})

const Group = () => {
  const group_list = [
    {
      name:'Family group',
      createBy:'Alex',
    },
    {
      name:'Friend group',
      createBy:'Mia',
    },
    {
      name:'ABC Group',
      createBy:'Phuc',
    },
  ]
  return ( 
    <View style={styles.container}>
      <View style={{width:screenWidth*0.9,height:screenHeight*0.1,display:'flex',justifyContent:'center'}}>
        <Text style={{fontSize:20}}>Your Group</Text>
      </View>
      {
        group_list.map((item, index) => (
          <View key={index}>
            <View style={styles.group_container}>
              <View style={styles.icon_container}>
                <Image style={{width:40, height:40}} source={group_icon}/>
              </View>
              <View style={styles.text_container}>
                <Text>
                  {item.name}
                </Text>
                <Text style={{color:'#7D8895'}}>
                  Creator: {item.createBy}
                </Text>
              </View>
              <TouchableOpacity style={styles.edit_icon}>
                <Image style={{width:40, height:40}} source={edit_icon}/>
              </TouchableOpacity>
            </View>
          </View>
        ))
      }
      <View style={{width:screenWidth*0.9}}>
        <Text>
          To join others group tell them to invite alex@gmail.com. That’s you!
        </Text>
      </View>
      
    </View>
  )
}

export default Group