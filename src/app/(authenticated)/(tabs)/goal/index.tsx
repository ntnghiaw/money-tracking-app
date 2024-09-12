// import { useRouter } from 'expo-router'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// const Statistic = () => {
//   const router = useRouter()
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={[styles.item, { marginTop: 20 }]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-line' size={32} color={'#50C474'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Financial Analysis</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.item]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-bar' size={32} color={'#699BF7'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Expense vs Income</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.item]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-bar' size={32} color={'#FF810D'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Income Analysis</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   item: {
//     flexDirection: 'row',
//     padding: 16,
//     height: 72,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   icon: {
//     width: 54,
//     height: 54,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 4,
//   },
//   itemText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginLeft: 16,
//     letterSpacing: 1,

//   }
// })    
// export default Statistic

import { StyleSheet, Text, View } from 'react-native'
const statistic = () => {
  return (
    <View>
      <Text>statistic</Text>
    </View>
  )
}
export default statistic
const styles = StyleSheet.create({})