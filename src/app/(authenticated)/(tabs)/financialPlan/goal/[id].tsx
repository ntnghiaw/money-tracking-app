// import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import { useGetAllPlansQuery } from '@/features/wallet/wallet.service'
// import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { useLocalSearchParams } from 'expo-router'
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet'
// import { Colors } from '@/constants/Colors'
// import { Edit, User, X } from 'react-native-feather'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { useRouter } from 'expo-router'
// import { Link } from 'expo-router'

// const Page = () => {
//   const router = useRouter()
//   const { bottom } = useSafeAreaInsets()
//   const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null)

//   const { tokens, userId, walletId } = useAppSelector((state) => state.auth)
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
//   const snapPoints = useMemo(() => ['33%'], [])
//   const { data: plans } = useGetAllPlansQuery({
//     walletId,
//     auth: {
//       accessToken: tokens.accessToken,
//       userId: userId,
//     },
//   })

//   const showBottomSheet = () => {
//     bottomSheetModalRef.current?.present()
//   }

//   const hideBottomSheet = () => {
//     bottomSheetModalRef.current?.dismiss()
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

//   return (
//     <BottomSheetModalProvider>
//       <View style={styles.container}>
//         <View style={styles.form}>
//           <View style={styles.item}>
//             <User width={24} height={24} color={Colors.black} />
//             <TextInput placeholder='Name' style={styles.input} />
//           </View>
//           <View style={styles.item}>
//             <User width={24} height={24} color={Colors.black} />
//             <TextInput placeholder='Description' style={styles.input} />
//           </View>
//           <View style={styles.item}>
//             <User width={24} height={24} color={Colors.black} />
//             <TextInput placeholder='type' style={styles.input} />
//           </View>
//           <View style={styles.item}>
//             <User width={24} height={24} color={Colors.black} />
//             <TextInput placeholder='Target amount' style={styles.input} />
//           </View>
//           <View style={styles.item}>
//             <User width={24} height={24} color={Colors.black} />
//             <TextInput placeholder='Desired date' style={styles.input} />
//           </View>
       
//         </View>

//         <View style={[styles.button, { bottom: bottom }]}>
//           <TouchableOpacity>
//             <Text>New Goal</Text>
//           </TouchableOpacity>
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
//           <BottomSheetView style={{ flex: 1 }}>
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
//                 onPress={() => hideBottomSheet()}
//               >
//                 <X width={24} height={24} color={Colors.gray} />
//               </TouchableOpacity>
//             </View>
//             <View style={styles.buttonControl}>
//               <Link
//                 href={{
//                   pathname: '/(authenticated)/(tabs)/financialPlan/budget/[id]',
//                   params: { id: selectedBudgetId },
//                 }}
//               >
//                 <TouchableOpacity style={styles.button}>
//                   <Edit width={24} height={24} color={Colors.black} />
//                   <Text style={{ fontSize: 16, padding: 12 }}>Edit wallet</Text>
//                 </TouchableOpacity>
//               </Link>
//               <TouchableOpacity style={styles.button} onPress={() => console.log('deleted budget')}>
//                 <MaterialCommunityIcons name='delete-outline' size={24} color={'red'} />
//                 <Text style={{ fontSize: 16, padding: 12, color: 'red' }}>Delete budget</Text>
//               </TouchableOpacity>
//             </View>
//           </BottomSheetView>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   )
// }
// export default Page
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   button: {
//     position: 'absolute',
//     alignSelf: 'center',
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
//   form: {
//     marginTop: 40,
//     paddingHorizontal: 16,
//     paddingVertical: 40,
//     gap: 24,
//     borderRadius: 16,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.05,
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   input: {
//     flex: 1,
//     padding: 4,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: Colors.gray,
//     fontSize: 16,
//   },
// })


import { StyleSheet, Text, View } from 'react-native'
const Page = () => {
  return (
    <View>
      <Text>Page</Text>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({})