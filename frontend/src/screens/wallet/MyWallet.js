import React from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import * as Icon from 'react-native-feather'
import Toolbar from '../../../src/components/Toolbar'
import Colors from '../../components/Colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    balance_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.1,
        marginTop: 20,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
    },
    individual_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.3,
        display:'flex',
        flexDirection:'column',
    },
    group_form:{
        width: screenWidth*0.95,
        height: screenHeight*0.3,
        display:'flex',
        flexDirection:'column',
    },
    item: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 7
      },
      icon: {
        width: 40,
        height: 40,
        backgroundColor: Colors.icon?.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
        // backgroundColor: 'red'
      },
      details: {
        width: '82%',
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
      },
      description: {
        width: '60%',
        justifyContent: 'center',
        paddingBottom: 4
      },
      title: {
        lineHeight: 30,
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text?.title
      },
      balance: {
        fontSize: 12,
        fontWeight: '400',
        color: Colors.text?.body
      },
       createAt: {
        fontSize: 12,
        fontWeight: '400',
        color: Colors.text?.body,
        marginVertical: 2
      },
      
      amount: {
        width: 'auto',
        fontWeight: '400',
        fontSize: 18,
        color: Colors.text?.danger,
      }
})

const MyWallet = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.balance_form}>
            <Text style={{color:'#50C474',fontSize:22}}>12,400.00 Đ</Text>
            <Text style={{fontSize:16,marginTop:5,}}>Total balance</Text>
        </View>
        <View style={styles.individual_form}>
            <Text style={{fontSize:20, color:'#7D8895'}}>INDIVIDUAL</Text>
            <View style={styles.item} >
                <View style={styles.icon}>
                    <Icon.DollarSign width={24} height={24}  stroke={Colors.icon.default}/>
                </View>
                <View style={styles.details}>
                    <View style={styles.description}>
                    <Text style={styles.title}>Cash </Text>
                    <Text style={styles.balance}>Balance: 100.000 đ</Text>

                    <Text style={styles.createAt}>CreatedAt: 01/02/2023</Text>

                    </View>

                    <TouchableOpacity style={[styles.icon, {backgroundColor: 'white'}]}>
                        <Icon.Edit width={24} height={24}  stroke={Colors.icon.default}/>
                    </TouchableOpacity>

                </View>
            
             </View>
             <View style={styles.item} >
                <View style={styles.icon}>
                    <Icon.CreditCard width={24} height={24}  stroke={Colors.icon.default}/>
                </View>
                <View style={styles.details}>
                    <View style={styles.description}>
                    <Text style={styles.title}>E-Wallet </Text>
                    <Text style={styles.balance}>Balance: 100.000 đ</Text>

                    <Text style={styles.createAt}>CreatedAt: 21/01/2023</Text>

                    </View>

                    <TouchableOpacity style={[styles.icon, {backgroundColor: 'white'}]}>
                        <Icon.Edit width={24} height={24}  stroke={Colors.icon.default}/>
                    </TouchableOpacity>

                </View>
            
             </View>
        </View>
        <View style={styles.group_form}>
            <Text style={{fontSize:20, color:'#7D8895'}}>GROUPS</Text>
            <View style={styles.item} >
                <View style={styles.icon}>
                    <Icon.Home width={24} height={24}  stroke={Colors.icon.default}/>
                </View>
                <View style={styles.details}>
                    <View style={styles.description}>
                    <Text style={styles.title}>Family </Text>
                    <Text style={styles.balance}>Balance: 100.000 đ</Text>

                    <Text style={styles.createAt}>CreatedAt: 21/02/2023</Text>

                    </View>

                    <TouchableOpacity style={[styles.icon, {backgroundColor: 'white'}]}>
                        <Icon.Edit width={24} height={24}  stroke={Colors.icon.default}/>
                    </TouchableOpacity>

                </View>
            
             </View>
             <View style={styles.item} >
                <View style={styles.icon}>
                    <Icon.Github width={24} height={24}  stroke={Colors.icon.default}/>
                </View>
                <View style={styles.details}>
                    <View style={styles.description}>
                    <Text style={styles.title}>KH01 </Text>
                    <Text style={styles.balance}>Balance: 100.000 đ</Text>

                    <Text style={styles.createAt}>CreatedAt: 21/02/2023</Text>

                    </View>

                    <TouchableOpacity style={[styles.icon, {backgroundColor: 'white'}]}>
                        <Icon.Edit width={24} height={24}  stroke={Colors.icon.default}/>
                    </TouchableOpacity>

                </View>
            
             </View>
        </View>
        <Toolbar  navigation={navigation}/>
    </View>
  )
}

export default MyWallet;