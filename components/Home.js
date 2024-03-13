import React from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions, 
  
} from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import Toolbar from './Toolbar';
import change_icon from '../images/icons/change_icon.png';
import plus_icon from '../images/icons/plus_icon.png';
import group_icon from '../images/icons/group_icon.png';
import more_icon from '../images/icons/more_icon.png';
import home_icon from  '../images/icons/home_icon.png';
import grocery_cart_icon from '../images/icons/grocery_cart_icon.png';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        // backgroundColor:'#FAFAFA'
    },
    welcome:{
      width: screenWidth * 0.9,
      height: screenHeight * 0.1,
      // backgroundColor: 'white',
      display:'flex',
      flexDirection:'row',
      marginTop:10,
    },
    form_welcome:{
      display:'flex',
      flexDirection:'column',
      width: screenWidth*0.45,
      height: screenHeight*0.1,
      justifyContent:'space-around',
    },
    form_balance:{
      display:'flex',
      flexDirection:'column',
      width: screenWidth*0.45,
      height: screenHeight*0.1,
      justifyContent:'space-around',
      alignItems:'center',
    },
    expense_structure:{
      width: screenWidth*0.9,
      height: screenHeight*0.3,
      // backgroundColor: 'white',
      display:'flex',
      flexDirection:'colunm',
    },
    expense_text:{
      width: '100%',
      height: '25%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-around',
      fontWeight:'bold',
    },
    expense_form:{
      width:"100%" ,
      height:'75%',
      display:'flex',
      flexDirection:'row',
    },
    expense_cirle:{
      width: '50%',
      height: screenHeight*0.2,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      marginTop: 10,
    },
    expense_categories:{
      width:'50%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-around',
      marginLeft: 30,
    },
    expense_notation:{
      width:'100%',
      height:'20%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    },
    small_circle:{
      width:10,
      height:10,
      borderRadius:50,
      marginRight:10,
    },

    show_more:{
      width: screenWidth*0.9,
      // backgroundColor:'white',
      textAlign:'right',
      paddingRight:30,
      paddingTop: 10,

    },
    easy_operations:{
      width: screenWidth*0.9,
      display:'flex',
      flexDirection:'column', 
      // backgroundColor:'white',
    },
    easy_operations_text:{
      width: screenWidth*0.9,
      paddingBottom:10,
    },
    easy_operations_items:{
      width: screenWidth*0.9,
      height: screenHeight*0.08,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
    },
    easy_operations_item:{
      width: '60',
      height:'80',
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
    },
    easy_operations_icon:{
      width:45,
      height:45,
      backgroundColor:'white',
      borderRadius:10,
    },
    recent_transactions:{
     width: screenWidth*0.9,
     display:'flex',
     flexDirection:'column', 
    //  backgroundColor:'white',
    },
    transactions_text:{
      width: screenWidth*0.9,
      marginTop:10,
      marginBottom:10,
    },
    list_transations:{
      width: screenWidth*0.9,
      height: screenHeight*0.1,
      backgroundColor:'white',
      marginBottom:10,
      borderRadius:5,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    },
    transation_icon_container:{
      width:screenWidth*0.2,
      height: screenWidth*0.1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',

    },
    transaction_icon:{
      width:40,
      height:40,
      backgroundColor:'white',
    },
    transation_title_container:{
      width: screenWidth*0.3,
      height: screenWidth*0.1,

    },
    transation_money:{
      width: screenWidth*0.4,
      height: screenWidth*0.1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    },

})

const Home = () => {
  const data = [
    {
      key: 1,
      value: 30,
      svg: { fill: '#94C3F6' },
    },
    {
      key: 2,
      value: 20,
      svg: { fill: '#50C474' },
    },
    {
      key: 3,
      value: 25,
      svg: { fill: '#559BE6' },
    },
    {
      key: 4,
      value: 25,
      svg: { fill: '#94EDF7' },
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <View style={styles.form_welcome}>
          <Text style={{fontSize:20}}>
            Welcome 
          </Text>
          <Text style={{color:'#7D8895'}}>
            Cash 
          </Text>
        </View>
        <View style={styles.form_balance}>
          <Text style={{fontSize:20}}>
            12.400.000 ₫ 
          </Text>
          <Text style={{color:'#7D8895'}}>
            Your Balance 
          </Text>
        </View>
      </View>
      <View style={styles.expense_structure}>
        <View style={styles.expense_text}> 
          <Text>
            Expense structure
          </Text>
          <Text style={{color:'#7D8895'}}>
            Last 30 Days
          </Text>
        </View>
        <View style={styles.expense_form}>
          <View style={styles.expense_cirle}>
            <PieChart
              style={{ height: 200, width: 200 }}
              data={data}
              innerRadius={'70%'} // Bán kính lỗ
              outerRadius={'80%'} // Bán kính biểu đồ
            />
            <View
              style={{
                position: 'absolute',
                textAlign: 'center',
                fontSize: 20,
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                
              }}
            >
              <Text 
                style={{
                  color:'#7D8895',
                  fontSize:20,
                }}>
                All
              </Text>
              <Text>6.000.000 ₫</Text>
            </View>
          </View>
          <View style={styles.expense_categories}>
            <View style={styles.expense_notation}>
              <View style={[styles.small_circle, { backgroundColor:'#94C3F6'}]}/>
              <Text>Shopping</Text>
            </View>
            <View style={styles.expense_notation}>
              <View style={[styles.small_circle, { backgroundColor:'#559BE6'}]}/>
              <Text>Bank Loans</Text>
            </View>
            <View style={styles.expense_notation}>
              <View style={[styles.small_circle, { backgroundColor:'#50C474'}]}/>
              <Text>Saving</Text>
            </View>
            <View style={styles.expense_notation}>
              <View style={[styles.small_circle, { backgroundColor:'#94EDF7'}]}/>
              <Text>Education</Text>
            </View>
          </View>
        </View>
        <Text style={styles.show_more}>
            Show more
        </Text>
        <View style={styles.easy_operations}>
          <Text style={styles.easy_operations_text}>Easy operations</Text>
          <View style={styles.easy_operations_items}>
            <TouchableOpacity style={styles.easy_operations_item}>
                <Image style={styles.easy_operations_icon} source={change_icon}></Image>
                <Text style={{color:'#7D8895'}}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.easy_operations_item}>
                <Image style={styles.easy_operations_icon} source={plus_icon}></Image>
                <Text style={{color:'#7D8895'}}>Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.easy_operations_item}>
                <Image style={styles.easy_operations_icon} source={group_icon}></Image>
                <Text style={{color:'#7D8895'}}>Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.easy_operations_item}>
                <Image style={styles.easy_operations_icon} source={more_icon}></Image>
                <Text style={{color:'#7D8895'}}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recent_transactions}>
          <Text style={styles.transactions_text}>
            Recent Transations
          </Text>
          <View style={styles.list_transations}>
            <View style={styles.transation_icon_container}>
              <Image style={styles.transaction_icon} source={home_icon}/>
            </View>
            <View style={styles.transation_title_container}>
              <Text>Rental Income</Text>
              <Text>14 July 2021</Text>
            </View>
            <View style={styles.transation_money}>
              <Text style={{color:'#50C474'}}>+ 6.500.000 ₫</Text>
            </View>
          </View>
          <View style={styles.list_transations}>
            <View style={styles.transation_icon_container}>
              <Image style={styles.transaction_icon} source={grocery_cart_icon}/>
            </View>
            <View style={styles.transation_title_container}>
              <Text>Rental Income</Text>
              <Text>22July 2021</Text>
            </View>
            <View style={styles.transation_money}>
              <Text style={{color:'#EF5354'}}>- 300.500 ₫</Text>
            </View>
          </View>
        </View>
      </View>
      <Toolbar/>
    </View>
  )
}

export default Home

