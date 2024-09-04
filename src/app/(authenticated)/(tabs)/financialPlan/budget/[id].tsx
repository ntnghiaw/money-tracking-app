// import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
// import {
//   Dimensions,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native'
// import { useCreatePlanMutation, useGetAllPlansQuery } from '@/features/wallet/wallet.service'
// import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { Stack, useLocalSearchParams } from 'expo-router'
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetModalProvider,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet'
// import { BrandColor } from '@/constants/Colors'
// import {
//   AlertCircle,
//   AlignCenter,
//   Book,
//   ChevronRight,
//   CreditCard,
//   DollarSign,
//   Edit,
//   Layers,
//   User,
//   X,
// } from 'react-native-feather'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// import { useRouter } from 'expo-router'
// import { Link } from 'expo-router'
// import { Budget, FinancialPlan, FinancialPlanType, SubCategory, TransactionType } from '@/types/enum'
// import { DefaultTheme } from '@react-navigation/native'
// import { useActionSheet } from '@expo/react-native-action-sheet'
// import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
// import { useGetAllCategoriesQuery } from '@/features/category/category.service'

// const screenHeight = Dimensions.get('screen').height

// const initState = {
//   _id: '',
//   name: '',
//   description: '',
//   type: FinancialPlanType.Budget,
//   attributes: {
//     target_amount: '',
//     spentAmount: 0,
//     start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toString(),
//     due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toString(),
//     categories: {
//       _id: '',
//       name: '',
//       icon: '',
//       type: TransactionType.Expense,
//       sub_categories: [] as SubCategory[],
//     },
//     records: [],
//   },
// }

// type AndroidMode = 'date' | 'time'

// type TypeDate = 'startDate' | 'dueDate'

// const Page = () => {
//   const router = useRouter()
//   const { bottom } = useSafeAreaInsets()
//   const { id } = useLocalSearchParams()
//   const { showActionSheetWithOptions } = useActionSheet()

//   const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null)

//   const [budget, setBudget] = useState(initState)
//   const [editField, setEditField] = useState<string | null>(null)
//   const [show, setShow] = useState(false)
//   const [mode, setMode] = useState<AndroidMode>('date')
//   const { tokens, userId, walletId } = useAppSelector((state) => state.auth)
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
//   const snapPoints = useMemo(() => ['33%', '45%'], [])
//   const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0

//   const { data: plans } = useGetAllPlansQuery({
//     walletId,
//     auth: {
//       accessToken: tokens.accessToken,
//       userId: userId,
//     },
//   })

//   const { data: categories } = useGetAllCategoriesQuery({
//     accessToken: tokens.accessToken,
//     userId: userId,
//   })

//   const [createBudget, { data: createdData, isSuccess: isCreatedSuccess }] = useCreatePlanMutation()

//   const expenseCategories = categories?.metadata.filter((category) => category.type === 'expense')

//   const showMode = (currentMode: AndroidMode) => {
//     setShow(true)
//     setMode(currentMode)
//   }

//   const showDatepicker = () => {
//     showMode('date')
//   }

//   const onChangeStartDate = (event: DateTimePickerEvent, date?: Date) => {
//     const currentDate = date
//     bottomSheetModalRef.current?.dismiss()
//     setBudget((prev) => ({
//       ...prev,
//       attributes: {
//         ...prev.attributes,
//         start_date: currentDate!.toString(),
//       },
//     }))
//   }

//   const onChangeDueDate = (event: DateTimePickerEvent, date?: Date) => {
//     const currentDate = date
//     console.log(currentDate)
//     bottomSheetModalRef.current?.dismiss()
//     setBudget((prev) => ({
//       ...prev,
//       attributes: {
//         ...prev.attributes,
//         due_date: currentDate!.toString(),
//       },
//     }))
//   }
//   console.log(budget.attributes)
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

//   const handleSubmit = async () => {
//     const body = {
//       name: budget.name,
//       description: budget.description,
//       type: FinancialPlanType.Budget,
//       attributes: {
//         target_amount: Number(budget.attributes.target_amount),
//         spentAmount: 0,
//         start_date: budget.attributes.start_date,
//         due_date: budget.attributes.due_date,
//         categories: budget.attributes.categories,
//         records: [],
//       },
//     }

//     if (id === 'new') {
//       await createBudget({
//         walletId,
//         auth: {
//           accessToken: tokens.accessToken,
//           userId: userId,
//         },
//         body,
//       })
//       setBudget(initState)
//       router.back()
//     } else {
//       console.log('edit budget')
//     }
//   }
//   return (
//     <BottomSheetModalProvider>
//       <Stack.Screen options={{ title:'New Budget' }} />
//       <KeyboardAvoidingView
//         style={styles.container}
//         keyboardVerticalOffset={keyboardVerticalOffset}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <SafeAreaView style={{ flex: 1 }}>
//           <ScrollView>
//             <View style={styles.form}>
//               <View style={styles.item}>
//                 <CreditCard width={24} height={24} color={'#DE9744'} />
//                 <TextInput
//                   placeholder='Name'
//                   placeholderTextColor={BrandColor.PrimaryColor[200]}
//                   style={styles.input}
//                   onChange={(e) => {
//                     setBudget((pre) => ({ ...pre, name: e.nativeEvent.text }))
//                     setEditField('name')
//                   }}
//                 />
//               </View>
//               <View style={styles.item}>
//                 <AlertCircle width={24} height={24} color={Colors.primary} />
//                 <TextInput
//                   placeholder='Description'
//                   placeholderTextColor={Colors.gray}
//                   style={styles.input}
//                   onChange={(e) => {
//                     setBudget((pre) => ({ ...pre, description: e.nativeEvent.text }))
//                     setEditField('name')
//                   }}
//                 />
//               </View>

//               <View style={styles.item}>
//                 <DollarSign width={24} height={24} color={Colors.primary} />
//                 <TextInput
//                   placeholder='0'
//                   placeholderTextColor={Colors.gray}
//                   value={budget.attributes.target_amount}
//                   style={styles.input}
//                   keyboardType='numeric'
//                   onChange={(e) => {
//                     setBudget((pre) => ({
//                       ...pre,
//                       attributes: { ...pre.attributes, target_amount: e.nativeEvent.text },
//                     }))
//                   }}
//                 />
//               </View>
//               <View style={styles.item}>
//                 <User width={24} height={24} color={Colors.black} />
//                 <TouchableOpacity
//                   style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}
//                   onPress={() => {
//                     setEditField('start_date')
//                     showBottomSheet()
//                   }}
//                 >
//                   <SafeAreaView>
//                     <TouchableOpacity style={{}} onPress={showDatepicker}>
//                       <Text>
//                         {budget.attributes.start_date
//                           ? new Date(budget.attributes.start_date).toLocaleDateString()
//                           : 'None'}
//                       </Text>
//                     </TouchableOpacity>
//                   </SafeAreaView>
//                   <ChevronRight width={24} height={24} color={Colors.gray} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.item}>
//                 <User width={24} height={24} color={Colors.black} />
//                 <TouchableOpacity
//                   style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}
//                   onPress={() => {
//                     setEditField('due_date')
//                     showBottomSheet()
//                   }}
//                 >
//                   <SafeAreaView>
//                     <TouchableOpacity style={{}} onPress={showDatepicker}>
//                       <Text>
//                         {budget.attributes.due_date
//                           ? new Date(budget.attributes.due_date).toLocaleDateString()
//                           : 'None'}
//                       </Text>
//                     </TouchableOpacity>
//                   </SafeAreaView>
//                   <ChevronRight width={24} height={24} color={Colors.gray} />
//                 </TouchableOpacity>
//               </View>
//               <View style={styles.item}>
//                 {budget.attributes.categories.icon ? (
//                   <Image
//                     source={{ uri: budget.attributes.categories.icon }}
//                     style={{ height: 24, width: 24 }}
//                   />
//                 ) : (
//                   <Book width={24} height={24} color={Colors.black} />
//                 )}

//                 {/* <Link
//                   href={'/(authenticated)/transaction/categories'}
//                   style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}
//                   asChild
//                 > */}
//                 <TouchableOpacity
//                   style={[styles.input, { flexDirection: 'row', justifyContent: 'space-between' }]}
//                   onPress={() => {
//                     setEditField('categories')
//                     showBottomSheet()
//                   }}
//                 >
//                   <Text style={{ color: Colors.gray, fontSize: 16 }}>
//                     {budget.attributes.categories.name
//                       ? budget.attributes.categories.name
//                       : 'Choose Categories'}
//                   </Text>
//                   <ChevronRight width={24} height={24} color={Colors.gray} />
//                 </TouchableOpacity>
//                 {/* </Link> */}
//               </View>
//             </View>
//           </ScrollView>

//           <View style={[styles.button, { bottom: bottom }]}>
//             <TouchableOpacity onPress={handleSubmit}>
//               <Text style={styles.btnText}>New budget</Text>
//             </TouchableOpacity>
//           </View>
//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             index={editField === 'categories' ? 1 : 0}
//             backdropComponent={renderBackdrop}
//             snapPoints={snapPoints}
//             handleComponent={null}
//             enableOverDrag={false}
//             enablePanDownToClose
//           >
//             {editField !== 'categories' ? (
//               editField === 'start_date' ? (
//                 <BottomSheetView>
//                   <RNDateTimePicker
//                     testID='dateTimePicker'
//                     value={
//                       budget.attributes.start_date
//                         ? new Date(budget.attributes.start_date)
//                         : new Date()
//                     }
//                     mode={'date' as AndroidMode}
//                     display='spinner'
//                     is24Hour={true}
//                     onChange={onChangeStartDate}
//                   />
//                 </BottomSheetView>
//               ) : (
//                 <BottomSheetView>
//                   <RNDateTimePicker
//                     testID='dateTimePicker'
//                     value={
//                       budget.attributes.due_date ? new Date(budget.attributes.due_date) : new Date()
//                     }
//                     minimumDate={new Date(budget.attributes.start_date)}
//                     mode={'date' as AndroidMode}
//                     display='spinner'
//                     is24Hour={true}
//                     onChange={onChangeDueDate}
//                   />
//                 </BottomSheetView>
//               )
//             ) : (
//               <BottomSheetView>
//                 <View style={styles.btsheetHeader}>
//                   <Text style={styles.btsHeaderText}>Choose category</Text>
//                   <TouchableOpacity
//                     style={{ position: 'absolute', right: 12 }}
//                     onPress={hideBottomSheet}
//                   >
//                     <X width={24} height={24} color={Colors.black} />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.separator} />
//                 <View style={{ paddingHorizontal: 16 }}>
//                   {expenseCategories?.map((category) => (
//                     <TouchableOpacity
//                       key={category._id}
//                       style={styles.btnInBts}
//                       onPress={() => {
//                         setBudget((prev) => ({
//                           ...prev,
//                           attributes: {
//                             ...prev.attributes,
//                             categories: {
//                               _id: category._id,
//                               name: category.name,
//                               icon: category.icon,
//                               type: category.type,
//                               sub_categories: [...category.sub_categories] as SubCategory[],
//                             },
//                             // categories: {
//                             //   _id: category._id,
//                             //   name: category.name,
//                             //   icon: category.icon,
//                             //   sub_categories: [...category.sub_categories] as { _id: string }[],
//                             // },
//                           },
//                         }))
//                         hideBottomSheet()
//                       }}
//                     >
//                       <Image
//                         source={{ uri: category.icon }}
//                         style={{ height: 24, width: 24, flex: 1 }}
//                         resizeMode='contain'
//                       />
//                       <Text style={{ flex: 4, fontSize: 16, letterSpacing: 1 }}>
//                         {category.name}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </BottomSheetView>
//             )}
//           </BottomSheetModal>
//         </SafeAreaView>
//       </KeyboardAvoidingView>
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
//     backgroundColor: Colors.primary,
//     padding: 12,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     height: 54,
//   },
//   btnText: {
//     fontSize: 16,
//     letterSpacing: 2,
//     color: 'white',
//     fontWeight: '500',
//     textTransform: 'capitalize',
//   },
//   buttonControl: {
//     backgroundColor: 'white',
//     // borderRadius: 12,
//     // shadowColor: '#000',
//     // shadowOffset: {
//     //   width: 0,
//     //   height: 1,
//     // },
//     // shadowOpacity: 0.05,
//     width: '100%',
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
//   btsheetHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     // borderBottomWidth: StyleSheet.hairlineWidth,
//     // borderBottomColor: Colors.gray,
//   },
//   btsHeaderText: {
//     fontSize: 16,
//     fontWeight: '500',
//     letterSpacing: 2,
//   },
//   btnInBts: {
//     padding: 16,
//     flexDirection: 'row',
//     width: '100%',

//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowOpacity: 0.05,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowColor: '#000',
//     backgroundColor: 'white',
//     marginTop: 12,
//     borderRadius: 8,
//   },
//   separator: {
//     borderBottomWidth: 1,
//     borderBottomColor: DefaultTheme.colors.background,
//   },
//   datePicker: {
//     maxHeight: screenHeight * 0.15,
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