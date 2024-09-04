// import { useEffect, useState } from 'react'
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image , ActivityIndicator} from 'react-native'
// import { Lock, Mail, Unlock, User } from 'react-native-feather'
// import { Link, useRouter } from 'expo-router'
// import { useRegisterMutation } from '@/features/auth/auth.service'
// import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
// import { setAuth } from '@/features/auth/authSlice'
// import { BrandColor, NeutralColor } from '@/constants/Colors'

// const Register = () => {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const [hidden, setHidden] = useState(true)
//   const [isFocused, setIsFocused] = useState({
//     name: false,
//     email: false,
//     password: false,
//   })
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const [register, { data, isSuccess, isError, error, isLoading }] = useRegisterMutation()

// const handleRegister = async () => {
//   console.log('register::', { name, email, password })
//   await register({ name, email, password })
// }


//   useEffect(() => {
//     if (isSuccess) {
//       // Alert.alert('Success', 'Login successful')
//       const metadata = data?.metadata
//       console.log(metadata)
//       dispatch(
//         setAuth({
//           tokens: metadata?.tokens,
//           userId: metadata?.user?._id,
//           isAuthenticated: true,
//           walletId: ''
//         })
//       )
//     }
//   }, [isSuccess])
  
//   return (
//     <View style={styles.container}>
//       {isLoading && (
//         <View style={[StyleSheet.absoluteFill, styles.loading]}>
//           <ActivityIndicator size='large' color={BrandColor.PrimaryColor[500]} />
//           <Text style={{ fontSize: 18, padding: 10 }}>Login...</Text>
//         </View>
//       )}
//       <View style={styles.headline}>
//         <Text style={styles.headlineText}>Welcome !</Text>
//         <Text style={styles.subHeadlineText}>Create new account to start your journey</Text>
//         {isError && <Text style={{ color: 'red', marginTop: 20 }}>{error.data.message? error.data.message : 'Signup failed!! Pls try again'}</Text>}
//       </View>
//       <View style={styles.form}>
//         <View
//           style={[
//             styles.input,
//             isFocused.name ? { borderColor: BrandColor.PrimaryColor[500], borderWidth: 1 } : null,
//           ]}
//         >
//           <TextInput
//             style={[styles.inputText]}
//             value={name}
//             placeholder='Name'
//             onChange={(e) => setName(e.nativeEvent.text)}
//             onFocus={() => setIsFocused((prev) => ({ ...prev, name: true }))}
//             onBlur={() => setIsFocused((prev) => ({ ...prev, name: false }))}
//           />
//           <User width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//         </View>
//         <View
//           style={[
//             styles.input,
//             isFocused.email ? { borderColor: BrandColor.PrimaryColor[500], borderWidth: 1 } : null,
//           ]}
//         >
//           <TextInput
//             style={styles.inputText}
//             value={email}
//             placeholder='Email'
//             keyboardType='email-address'
//             onChange={(e) => setEmail(e.nativeEvent.text)}
//             onFocus={() => setIsFocused((prev) => ({ ...prev, email: true }))}
//             onBlur={() => setIsFocused((prev) => ({ ...prev, email: false }))}
//           />
//           <Mail width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//         </View>
//         <View
//           style={[
//             styles.input,
//             isFocused.password ? { borderColor: BrandColor.PrimaryColor[500], borderWidth: 1 } : null,
//           ]}
//         >
//           <TextInput
//             style={styles.inputText}
//             value={password}
//             placeholder='Password'
//             secureTextEntry={hidden}
//             onChange={(e) => setPassword(e.nativeEvent.text)}
//             onFocus={() => setIsFocused((prev) => ({ ...prev, password: true }))}
//             onBlur={() => setIsFocused((prev) => ({ ...prev, password: false }))}
//           />
//           <TouchableOpacity onPress={() => setHidden((prev) => !prev)}>
//             {hidden ? (
//               <Lock width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//             ) : (
//               <Unlock width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//             )}
//           </TouchableOpacity>
//         </View>
//         {/* <View style={styles.forgotPw}>
//           <Link href={'/reset-password'} style={styles.linkText}>
//             Forgot password?
//           </Link>
//         </View> */}
//         <TouchableOpacity style={[styles.button]} onPress={handleRegister}>
//           <Text style={styles.buttonText}>Sign up</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.seperator}>
//         <View style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: NeutralColor.GrayMedium[500] }} />
//         <Text style={{ color: NeutralColor.GrayMedium[500], paddingHorizontal: 10 }}>OR</Text>
//         <View style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: NeutralColor.GrayMedium[500] }} />
//       </View>

//       <View style={styles.bottomContainer}>
//         <TouchableOpacity style={styles.linkButton}>
//           <Image
//             source={require('@/assets/images/facebook-logo.png')}
//             style={{ width: 24, height: 24 }}
//           />
//           <Text style={[styles.linkButtonText, { width: '90%' }]}>Continue with Facebook</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.linkButton}>
//           <Image
//             source={require('@/assets/images/google-logo.png')}
//             style={{ width: 24, height: 24 }}
//           />
//           <Text style={[styles.linkButtonText, { width: '90%' }]}>Continue with Google</Text>
//         </TouchableOpacity>
//         <View style={styles.registerLink}>
//           <Text style={styles.linkButtonText}>Do you have already account?</Text>
//           <Link href={'/login'} style={styles.linkText}>
//             Sign in
//           </Link>
//         </View>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//   },
//   headline: {
//     paddingHorizontal: 20,
//     alignItems: 'center',
//   },
//   headlineText: {
//     color: NeutralColor.Black[800],
//     fontSize: 24,
//     fontWeight: '500',
//     verticalAlign: 'middle',
//     letterSpacing: 1,
//   },
//   subHeadlineText: {
//     marginTop: 8,
//     color: NeutralColor.GrayMedium[500],
//     fontSize: 16,
//     letterSpacing: 1,
//     verticalAlign: 'middle',
//   },
//   form: {
//     marginTop: 60,
//     width: '100%',
//     gap: 28,
//     alignItems: 'center',
//     marginBottom: 36,
//   },
//   input: {
//     width: '100%',
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: 8,
//     backgroundColor: '#F9FAFC',
//   },
//   inputText: {
//     height: 56,
//     width: '90%',
//     color: '#5A5151',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   forgotPw: {
//     width: '100%',
//     alignItems: 'flex-end',
//   },
//   linkText: {
//     color: BrandColor.PrimaryColor[500],
//     fontSize: 14,
//     fontWeight: '500',
//     letterSpacing: 1,
//   },
//   button: {
//     width: '100%',
//     height: 56,
//     borderRadius: 8,
//     backgroundColor: BrandColor.PrimaryColor[500],
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   disabled: {
//     backgroundColor: '#D9D9D9',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//     letterSpacing: 1,
//   },
//   seperator: {
//     marginVertical: 14,
//     width: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   bottomContainer: {
//     marginTop: 36,

//     width: '100%',
//     gap: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   linkButton: {
//     width: '100%',
//     height: 52,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#cfd0d1',
//   },
//   linkButtonText: {
//     letterSpacing: 1,
//     fontSize: 14,
//     color: NeutralColor.GrayMedium[500],
//     fontWeight: '500',
//   },
//   registerLink: {
//     marginTop: 24,
//     width: '80%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//   },
//   loading: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 10,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

// export default Register


import { StyleSheet, Text, View } from 'react-native'
const register = () => {
  return (
    <View>
      <Text>register</Text>
    </View>
  )
}
export default register
const styles = StyleSheet.create({})