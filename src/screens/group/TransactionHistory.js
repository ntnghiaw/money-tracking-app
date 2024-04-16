import { View, Text, StyleSheet, Image, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Picker } from '@react-native-picker/picker';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  input_container:{
    width: screenWidth*0.9,
    height: screenHeight*0.1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'pink',
  },
  search:{
    width: screenWidth*0.5,
    height: screenHeight*0.05,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  status:{
    width: screenWidth*0.35,
    height: screenHeight*0.05,
    backgroundColor: 'white',
    borderRadius: 10,
    // paddingLeft: 10,
    // backgroundColor: 'pink',
    justifyContent: 'center',
  },
  container_items:{
    width: screenWidth*0.9,
    // height: screenHeight*0.5,
    // backgroundColor: 'white', 
    display: 'flex',
    flexDirection: 'column',
    // overflow: 'scroll',

  },
  container_infor:{
    width: screenWidth*0.9,
    height: screenHeight*0.13,
    backgroundColor: 'pink',
    marginBottom: 10,
  },
  avatar:{
    
  },
  cotainer_text1:{

  },
  container_text2:{

  },
  pagination:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
},
  currentPage_container:{
      width: 30,
      height: 30,
      backgroundColor: '#4993e4',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 15,
  },
  pageNumber_container:{
      width: 30,
      height: 30,
      // backgroundColor: 'white',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 15,
  },
  currentPage: {
      color: 'white',
  },
})

const TransactionHistory = ({navigation}) => {
  const [selectValue, setSelectValue] = useState('Status')
  
  const [currentPage, setCurrentPage] = useState(1);

  const transactions =[
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },    {
      avatar:'',
      name:'Trần Phúc Anh',
      timestamp: '9:06:52 22/10/2023'
    },
  ]
  const itemsPerPage = 5;
  const totalItems = transactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handleNextPage = () =>{
    setCurrentPage(currentPage < totalPages? currentPage + 1 : currentPage );
  }
  const handlePrevPage = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const generatePageNumbers = () =>{
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
  }

  const startIndex = (currentPage - 1 ) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = transactions.slice(startIndex, endIndex);
  return (
    <View style={styles.container}>
      <View style={styles.input_container}>
        {/* <Image/> */}
        <TextInput style={styles.search}>
          Name
        </TextInput>
        <View style={styles.status}>
          <Picker 
            selectedValue={selectValue}
            onValueChange={(itemValue, itemIndex) => setSelectValue(itemValue)}
          >
            <Picker.Item label='Accepted' value='accepted'/>
            <Picker.Item label='Status' value='status'/>
          </Picker>
        </View>
      </View>
      <View style={styles.container_items}>
        {
          displayedItems.map((item, index) => (
          <View style={styles.container_infor}>
            <Image/>
            <View>
              <View>
                <Text>

                </Text>
                <Text>

                </Text>
              </View>
              <View>
                <Text>

                </Text>
              </View>
            </View>
          </View>
          )
          )
        }        
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity onPress={handlePrevPage} style={{marginRight:10}}>
            <Text>{`<`} Previous</Text>
        </TouchableOpacity>
        {generatePageNumbers().map((page) => (
            <TouchableOpacity 
                key={page} 
                onPress={() => setCurrentPage(page)}
                style={currentPage === page ? styles.currentPage_container : styles.pageNumber_container}
            >
                <Text style={currentPage === page ? styles.currentPage : styles.pageNumber}>{page}</Text>
            </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleNextPage} style={{marginLeft:10}}>
            <Text>Next {`>`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TransactionHistory