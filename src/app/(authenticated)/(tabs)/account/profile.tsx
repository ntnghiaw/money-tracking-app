// import {
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   SafeAreaView,
//   Alert,
// } from 'react-native'
// import { Colors } from '@/constants/Colors'
// import { Camera, ChevronDown } from 'react-native-feather'
// import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
// import { SelectCountry } from 'react-native-element-dropdown'
// import { useGetProfileQuery, useUpdateProfileMutation } from '@/features/user/user.service'
// import Loading from '@/components/Loading'
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet'
// import {
//   BottomSheetBackdrop,
//   BottomSheetModal,
//   BottomSheetModalProvider,
// } from '@gorhom/bottom-sheet'
// import { useActionSheet } from '@expo/react-native-action-sheet'
// import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
// import { UserProfile } from '@/types/enum'

// interface Profiles {
//   name: string
//   dob?: string
//   avatar_url: string
//   phone?: string
//   gender?: string
// }


// const profileState: Profiles = {
//   name: 'Name',
//   avatar_url: '',
// }
// const screenHeight = Dimensions.get('window').height

// const genders = [
//   {
//     value: 'male',
//     lable: 'Male',
//   },
//   {
//     value: 'female',
//     lable: 'Female',
//   },
//   {
//     value: 'other',
//     lable: 'Other',
//   },
// ]

// type AndroidMode  = 'date' | 'time';

// const Profile = () => {
//   const { showActionSheetWithOptions } = useActionSheet()
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
//   const snapPoints = useMemo(() => ['33%'], [])
//   const showModal = async () => {
//     bottomSheetModalRef.current?.present()
//   }
//   const [profile, setProfile] = useState(profileState)
//   const [gender, setGender] = useState('')
//   const [mode, setMode] = useState < AndroidMode>('date')
//   const [show, setShow] = useState(false)
//   const { userId, tokens } = useAppSelector((state) => state.auth)

//   const { data, isError, isLoading } = useGetProfileQuery({
//     auth: { userId, accessToken: tokens?.accessToken },
//   }, {skip: !userId})

//   const [updateProfile, { isSuccess, isError: isUpdateError }] = useUpdateProfileMutation()


//   useEffect(() => {
//     if (data) {
//       setProfile({
//         name: data.metadata.name,
//         dob: data.metadata.dob ,
//         gender: data.metadata.gender,
//         avatar_url: data.metadata.avatar_url,
//       })
//     }
//   }, [data] )

//   const showMode = (currentMode: AndroidMode) => {
//     setShow(true)
//     setMode(currentMode)
//   }

//   const showDatepicker = () => {
//     showModal()
//     showMode('date')
//   }

//   const onChange = (event: DateTimePickerEvent, date?: Date) => {
//     const currentDate = date
//     setShow(false)
//     bottomSheetModalRef.current?.dismiss()
//     setProfile((prev) => ({ ...prev, dob: currentDate!.toString() }))
//   }

//   const handleChangeGender = (e: any) => {
//     setProfile(prev => ({...prev, gender: e.value}))
//   }
  
//   const handleUpdateProfile = async () => {
//     if (!profile.name) {
//       return Alert.alert('Name is required')
//     }
//     const body = {
//       name: profile.name,
//       dob: profile.dob,
//       gender: profile.gender,
//       phone: profile.phone,
//     }
//     await updateProfile({ userId, body, auth: {
//       accessToken: tokens?.accessToken,
//       userId: userId
//     } }).unwrap()
//     Alert.alert('Update profile successfully')
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
//     const openActionSheet = async () => {
//       const options = ['Camera', 'Choose from gallery', 'Cancel']
//       const cancelButtonIndex = 2
//       showActionSheetWithOptions(
//         {
//           options,
//           cancelButtonIndex,
//         },
//         (selectedIndex: any) => {
//           console.log(selectedIndex)
//         }
//       )
//     }


//   return (
//     <BottomSheetModalProvider>
//       <View style={styles.container}>
//         <View style={styles.inner}>
//           {isLoading && <Loading isLoading={isLoading} text='Loading...' />}
//           <View style={styles.avatarFrame}>
//             <Image
//               source={{ uri: data?.metadata.avatar_url }}
//               style={styles.avatar}
//               resizeMode='contain'
//             />
//             <TouchableOpacity style={styles.innerCamera} onPress={openActionSheet}>
//               <Camera width={15} height={15} color={Colors.black} />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.info}>
//             <View style={styles.item}>
//               <Text style={styles.itemLabel}>Name</Text>
//               <View style={styles.itemContent}>
//                 <TextInput
//                   style={styles.itemText}
//                   placeholder='Name'
//                   value={profile.name}
//                   onChangeText={(text) => setProfile((prev) => ({ ...prev, name: text }))}
//                 ></TextInput>
//               </View>
//             </View>
//             <View style={styles.item}>
//               <Text style={styles.itemLabel}>Birth</Text>
//               <View style={styles.itemContent}>
//                 <SafeAreaView>
//                   <TouchableOpacity style={{}} onPress={showDatepicker}>
//                     <Text style={styles.itemText}>
//                       {profile.dob ? new Date(profile.dob).toLocaleDateString() : 'None'}
//                     </Text>
//                   </TouchableOpacity>
//                 </SafeAreaView>
//               </View>
//             </View>
//             <View style={styles.item}>
//               <Text style={styles.itemLabel}>Gender</Text>
//               <View style={styles.itemContent}>
//                 <SelectCountry
//                   imageField='image'
//                   style={[styles.dropdown, { height: 100 }]}
//                   selectedTextStyle={styles.selectedTextStyle}
//                   iconStyle={styles.iconStyle}
//                   renderRightIcon={() => (
//                     <ChevronDown width={24} height={24} stroke={Colors.gray} />
//                   )}
//                   placeholder={'None'}
//                   placeholderStyle={{color: Colors.gray}}
//                   imageStyle={{ display: 'none' }}
//                   maxHeight={200}
//                   value={profile.gender}
//                   data={genders}
//                   valueField='value'
//                   labelField='lable'
//                   onChange={handleChangeGender}
//                 />
//               </View>
//             </View>
//             <View style={styles.item}>
//               <Text style={styles.itemLabel}>Phone</Text>
//               <View style={styles.itemContent}>
//                 <TextInput style={styles.itemText} placeholder='None' value={profile.phone}></TextInput>
//               </View>
//             </View>
//             <View style={styles.item}>
//               <Text style={styles.itemLabel}>Email</Text>
//               <View style={styles.itemContent}>
//                 <TextInput
//                   style={styles.itemText}
//                   placeholder='Email'
//                   value={data?.metadata.email}
//                   editable={false}
//                 ></TextInput>
//               </View>
//             </View>
//           </View>
//           <View style={{ paddingHorizontal: 16 }}>
//             <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//               <Text
//                 style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontSize: 18,
//                   letterSpacing: 1,
//                   fontWeight: '500',
//                 }}
//               >
//                 Save
//               </Text>
//             </TouchableOpacity>
//           </View>
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
//           <View style={styles.datePicker}>
//             {show && (
//               <RNDateTimePicker
//                 testID='dateTimePicker'
//                 value={new Date()}
//                 mode={mode}
//                 display='spinner'
//                 is24Hour={true}
//                 onChange={onChange}
//               />
//             )}
//           </View>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   inner: {
//     flex: 1,
//   },
//   avatarFrame: {
//     height: 100,
//     width: 100,
//     marginTop: 20,
//     marginBottom: 20,
//     borderRadius: 50,

//     alignSelf: 'center',
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 4,
//     borderColor: 'white',
//   },
//   innerCamera: {
//     backgroundColor: '#D9D9D9',
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 3,
//     borderColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//   },
//   info: {
//     marginTop: 20,
//     flex: 1,
//     gap: 1,
//   },
//   item: {
//     paddingHorizontal: 20,
//     paddingVertical: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     gap: 20,
//   },
//   itemLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: Colors.black,
//     letterSpacing: 1,
//     flex: 1,
//   },
//   itemContent: {
//     flex: 4,
//   },
//   itemText: {
//     fontSize: 16,
//     color: Colors.gray,
//     letterSpacing: 1,
//   },
//   button: {
//     height: 50,
//     justifyContent: 'center',
//     width: '100%',
//     backgroundColor: Colors.primary,
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 40,
//   },
//   dropdown: {
//     borderColor: '#D9D9D9',
//     flex: 1,
//     marginTop: 2,
//     marginHorizontal: 2,
//     paddingRight: 12,
//     backgroundColor: 'white',
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//     color: Colors.gray,
//   },
//   iconStyle: {
//     width: 28,
//     height: 28,
//     color: Colors.gray,
//   },
//   datePicker: {
//     maxHeight: screenHeight * 0.15,
//   },
// })

// export default Profile


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