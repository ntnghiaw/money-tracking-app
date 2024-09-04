// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   Image,
//   Alert,
//   SafeAreaView,
// } from 'react-native'
// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import * as Icon from 'react-native-feather'
// import { SelectCountry } from 'react-native-element-dropdown'

// import { Colors, IconColor } from '@/constants/Colors'

// import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
// import { useGetWalletByIdQuery } from '@/features/wallet/wallet.service'
// import { Transaction, TransactionType } from '@/types/enum'
// import { ScrollView } from 'react-native-gesture-handler'
// import { editTransaction } from '@/features/transaction/transactionSlice'
// import { useRouter } from 'expo-router'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { formatter } from '@/utils/formatAmount'
// import { IconProps } from 'react-native-vector-icons/Icon'
// import { useActionSheet } from '@expo/react-native-action-sheet'
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetModalProvider,
// } from '@gorhom/bottom-sheet'
// const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').height

// type MaterialCommunityIconProps = {
//   MaterialCommunityIconNames: keyof typeof MaterialCommunityIcons.glyphMap
// }

// const filters = [
//   {
//     value: 'monthly',
//     lable: 'Monthly',
//   },
//   {
//     value: 'weekly',
//     lable: 'Weekly',
//   },
//   {
//     value: 'daily',
//     lable: 'Daily',
//   },
// ]

// const Item = ({ _id, category, amount, createdAt, type, description }: Transaction) => {
//   const dispatch = useAppDispatch()
//   const router = useRouter()
//   const { currentCurrency: currency } = useAppSelector((state) => state.wallets)
//   return (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => {
//         console.log(_id)
//         dispatch(editTransaction({ _id }))
//         // dispatch(editTransaction(_id))
//         router.navigate('/(authenticated)/(tabs)/transaction')
//       }}
//     >
//       <View style={styles.icon}>
//         <MaterialCommunityIcons
//           name={category.icon as MaterialCommunityIconProps['MaterialCommunityIconNames']}
//           size={24}
//           color={IconColor[category.icon]}
//         />
//       </View>
//       <View style={styles.details}>
//         <View style={styles.description}>
//           <Text style={styles.category}>{category.name} </Text>
//           <Text style={styles.createAt}>{new Date(createdAt).toDateString()} </Text>
//         </View>

//         <Text
//           style={[
//             styles.amount,
//             type === TransactionType.Income ? { color: Colors.primary } : { color: 'red' },
//           ]}
//         >
//           {type === 'expense'
//             ? `- ${formatter(amount, currency)}`
//             : `+ ${formatter(amount, currency)}`}{' '}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   )
// }
// const renderItem = ({ item }: { item: Transaction }) => <Item {...item} />

// const Page = () => {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const { walletId, tokens, userId } = useAppSelector((state) => state.auth)
//   const { currentCurrency: currency } = useAppSelector((state) => state.wallets)
//   const { isLoading, data, isError } = useGetWalletByIdQuery({
//     walletId,
//     auth: {
//       accessToken: tokens?.accessToken,
//       userId,
//     },
//   })
//   const { showActionSheetWithOptions } = useActionSheet()
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
//   const snapPoints = useMemo(() => ['33%'], [])

//   const showModal = async () => {
//     bottomSheetModalRef.current?.present()
//   }

//   const hideModal = async () => {
//     bottomSheetModalRef.current?.dismiss()
//   }

//   const handleDeleteWallet = async () => {
//     Alert.alert('Delete Wallet', 'Are you sure you want to delete this wallet?', [
//       {
//         text: 'Cancel',
//         onPress: () => console.log('Cancel Pressed'),
//         style: 'cancel',
//       },
//       {
//         text: 'OK',
//         onPress: () => {
//           hideModal()
//           console.log('OK Pressed')
//         },
//       },
//     ])
//   }

//   const renderBackdrop = useCallback(
//     (props: any) => (
//       <BottomSheetBackdrop
//         {...props}
//         opacity={0.3}
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//         pressBehavior='collapse'
//         onPress={() => bottomSheetModalRef.current?.dismiss()}
//       />
//     ),
//     []
//   )
//   // const [filter, setFilter] = useState('Monthly')
//   // const filterHandler = (e) => {
//   //   setFilter(e.value)
//   // }
//   if (data?.metadata.transactions.length === 0) {
//     return (
//       <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>No transaction</Text>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <BottomSheetModalProvider>
//       <SafeAreaView style={styles.container}>
//         {/* <SelectCountry
//         style={styles.dropdown}
//         selectedTextStyle={styles.selectedTextStyle}
//         iconStyle={styles.iconStyle}
//         imageStyle={{ display: 'none' }}
//         maxHeight={200}
//         value={filter}
//         data={filters}
//         valueField='value'
//         labelField='lable'
//         onChange={filterHandler}
//       /> */}

//         <View>
//           <FlatList
//             ListHeaderComponent={() => (
//               <>
//                 <View style={styles.balanceContainer}>
//                   <Text style={styles.balance}>{formatter(data!.metadata.balance, currency)} </Text>
//                   <Text style={styles.balanceLabel}>My Balance</Text>
//                 </View>
//                 <View style={styles.recordHeader}>
//                   <View>
//                     <Text>All My Expenses</Text>
//                   </View>
//                   <TouchableOpacity>
//                     <Text style={styles.more}>See all</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//             data={data?.metadata.transactions}
//             renderItem={renderItem}
//             keyExtractor={(item) => item._id}
//             showsVerticalScrollIndicator={false}
//           />
//         </View>
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={0}
//           backdropComponent={renderBackdrop}
//           snapPoints={snapPoints}
//           handleComponent={null}
//           enableOverDrag={false}
//           enablePanDownToClose
//         >
//           <View style={{ flex: 1, backgroundColor: 'white' }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 paddingVertical: 8,
//               }}
//             >
//               <Text style={{ fontSize: 18, fontWeight: '500' }}>Edit</Text>
//               <TouchableOpacity
//                 style={{ position: 'absolute', right: 12 }}
//                 onPress={() => hideModal()}
//               >
//                 <Icon.X width={24} height={24} color={Colors.gray} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.buttonControl}>
//               <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallet')}
//               >
//                 <Icon.Edit width={24} height={24} color={Colors.black} />
//                 <Text style={{ fontSize: 16, padding: 12 }}>Edit wallet</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.button} onPress={handleDeleteWallet}>
//                 <MaterialCommunityIcons name='delete-outline' size={24} color={'red'} />
//                 <Text style={{ fontSize: 16, padding: 12, color: 'red' }}>Delete wallet</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </BottomSheetModal>
//       </SafeAreaView>
//     </BottomSheetModalProvider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//   },

//   dropdown: {
//     marginTop: 12,
//     height: screenHeight * 0.03,
//     width: 'auto',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 24,
//   },
//   selectedTextStyle: {
//     fontSize: 20,
//     color: Colors.gray,
//     fontWeight: 500,
//   },
//   iconStyle: {
//     width: 28,
//     height: 28,
//     tintColor: Colors.gray,
//   },
//   balanceContainer: {
//     marginTop: 36,
//     marginBottom: 24,
//   },
//   balance: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   balanceLabel: {
//     lineHeight: 30,
//     fontSize: 16,
//     color: Colors.gray,
//   },

//   recordHeader: {
//     height: 40,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   more: {
//     lineHeight: 40,
//     fontSize: 14,
//     color: Colors.gray,
//   },
//   item: {
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 8,
//     marginVertical: 7,
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 6,
//     // backgroundColor: 'red'
//   },
//   details: {
//     width: '82%',
//     marginLeft: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     justifyContent: 'space-between',
//   },
//   description: {
//     width: '60%',
//     justifyContent: 'center',
//     paddingBottom: 4,
//   },
//   category: {
//     lineHeight: 40,
//     fontSize: 16,
//     fontWeight: '500',
//     color: Colors.gray,
//   },
//   createAt: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: Colors.gray,
//   },
//   amount: {
//     width: 'auto',
//     fontWeight: '400',
//     fontSize: 18,
//     color: Colors.danger,
//   },
//   buttonControl: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 24,
//   },
//   button: {
//     flexDirection: 'row',
//     gap: 12,
//     padding: 14,
//     alignItems: 'center',
//     marginLeft: 24,
//   },
// })

// export default Page


import { StyleSheet, Text, View } from 'react-native'
const history = () => {
  return (
    <View>
      <Text>history</Text>
    </View>
  )
}
export default history
const styles = StyleSheet.create({})