import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Icon from 'react-native-feather';
import { SelectCountry } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
import { read } from '../../redux/actions/transactionAction';

import Colors from '../../components/Colors'
import axios from 'axios';




const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// const data= [
//   {
//     id: 1,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '1000000',
//     type: 'expense',
//   },
//   {
//     id: 2,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '500000',
//     type: 'expense'
//   },
//   {
//     id: 3,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '1200000',
//     type: 'income'
//   },
//   {
//     id:4,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '1000000',
//     type: 'income',
//   },
//   {
//     id:5,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '500000',
//     type: 'income'
//   },
//   {
//     id: 6,
//     category:  {
//       label: "Education",
//       value: "Education",
//       description: "",
//       icon: "school"
//   },
//     createAt: Date().toString(),
//     amount: '1200000',
//     type: 'income'
//   }
// ]

const filters = [
  {
    value: 'monthly',
    lable: 'Monthly',
  },
  {
    value: 'weekly',
    lable: 'Weekly',
  },
  {
    value: 'daily',
    lable: 'Daily',
  },

];

const URL = "http://192.168.1.6:5000/transaction";


const History = ({navigation}) => {
  const dispatch = useDispatch();

  // const [balance, setBalance] = useState(() => {
  //     return transactions.reduce((pre, cur)=> {
  //       return cur.type === 'expense' ? parseFloat(pre) - parseFloat(cur.amount) : parseFloat(pre) +  parseFloat(cur.amount) ;
  //     }, 0)
  // })
  const [transactions, setTransactions] = useState([]);
  useEffect( () => {
    const fetchData = async () => { 
      const { data } = await axios.get(`${URL}`);
      const transactions = data.metadata;
      transactions.map( transaction => {  
        console.log(new Date(transaction.createdAt).toString());
        return transaction.createdAt = new Date(transaction.createdAt).toString();
      })
      setTransactions(transactions);
    }
    fetchData();

  },[])

  const [filter, setFilter] = useState('Monthly');
  const filterHandler = (e) => {
    setFilter(e.value);
  }


  const Item = ({ category, amount, createdAt, type }) => (

    <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate('Records');
        dispatch(read({category,amount,createdAt, type}));
      }}>
      <View style={styles.icon}>
        <Icon.DollarSign width={24} height={24}  stroke={Colors.icon.default}/>
      </View>
      <View style={styles.details}>
        <View style={styles.description}>
          <Text style={styles.category}>{category.name} </Text>
          <Text style={styles.createAt}>{createdAt.length > 20 ? createdAt.substring(0,16): createdAt} </Text>

        </View>

        <Text style={[styles.amount, type === 'Income' ? {color: Colors.text.primary}: '']}>{type === 'Expense' ? `- ${amount} ₫`:`+ ${amount} ₫`} </Text>

      </View>
      
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => (
  
    <Item category={item.category} amount={item.amount} createdAt={item.createdAt} type={item.type}/>
  );

  return (
    <View style={styles.container}>

      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        imageStyle= {{display: 'none'}}
        maxHeight={200}
        value={filter}
        data={filters}
        valueField="value"
        labelField="lable"
        onChange={filterHandler}
      />
      <View style={styles.balanceContainer}> 
         {/* <Text style={styles.balance}>{balance} ₫</Text> */}
         <Text style={styles.balanceLabel}>My Balance</Text>
      </View>
      <View style={styles.recordsContainer}> 
        <View style={styles.recordHeader}>
          <View >
          <Text style={styles.title}>All My Expenses</Text>
          </View>
          <TouchableOpacity >
            <Text style={styles.more}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.records}>
          <FlatList
          data={transactions}
          renderItem={renderItem}
        
          keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      


     
     
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  dropdown: {
    marginTop: 12,
    height: screenHeight*0.03,
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  selectedTextStyle: {
    fontSize: 20,
    color: Colors.text.body,
    fontWeight: 500,
  },
  iconStyle: {
    width: 28,
    height: 28,
    tintColor: Colors.text.body
  },
  balanceContainer: {
    marginTop: 36,
    marginBottom: 24
  },
  balance: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.text.title,
  },
  balanceLabel: {
    lineHeight: 30,
    fontSize: 16,
    color: Colors.text.body,
  },
  recordsContainer: {
    width: 'auto',
  },
  recordHeader: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  more: {
    lineHeight: 40,
    fontSize: 14,
    color: Colors.text.body
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
    backgroundColor: Colors.icon.background,
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
  category: {
    lineHeight: 40,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text.title
  },
  createAt: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text.body
  },
  amount: {
    width: 'auto',
    fontWeight: '400',
    fontSize: 18,
    color: Colors.text.danger,
  }
});

export default History;