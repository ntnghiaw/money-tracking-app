// import { useEffect, useState } from 'react'
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   Pressable,
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'

// import { Lock, Mail, Unlock } from 'react-native-feather'
// import { Link, useRouter } from 'expo-router'

// import { BrandColor, NeutralColor } from '@/constants/Colors'

// const initialState = {
//   email: '',
//   password: '',
// }

// const Login = () => {
//   const router = useRouter()
//   const dispatch = useAppDispatch()
//   const [hidden, setHidden] = useState(true)
//   const [validation, setValidation] = useState({
//     email: {
//       isFocused: false,
//       error: '',
//     },
//     password: {
//       isFocused: false,
//       error: '',
//     },
//   })
//   // const [formData, setFormData] = useState(initialState)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [login, { data, isSuccess, isError, error, isLoading }] = useLoginMutation()

//   const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0
//   const { bottom } = useSafeAreaInsets()
//   const handleLogin = async () => {
//     console.log('login')
//     await login({ email, password })
//     // setEmail('')
//     // setPassword('')
//     // if (isSuccess) {
//     //   router.push('/(authenticated)')
//     // }
//   }

//   useEffect(() => {
//     if(data) {
//       // Alert.alert('Success', 'Login successful')
//       const metadata = data?.metadata
//       dispatch(
//         setAuth({ tokens: metadata?.tokens, userId: metadata?.user?._id, isAuthenticated: true, walletId: metadata?.user?.wallets[0] })
//       )
//     }

//   }, [isSuccess])

//   return (
//     <KeyboardAvoidingView
//       keyboardVerticalOffset={keyboardVerticalOffset}
//       style={{ flex: 1 }}
//       behavior='padding'
//     >
//       <View style={styles.container}>
//         {isLoading && (
//           <View style={[StyleSheet.absoluteFill, styles.loading]}>
//             <ActivityIndicator size='large' color={BrandColor.PrimaryColor[500]} />
//             <Text style={{ fontSize: 18, padding: 10 }}>Login...</Text>
//           </View>
//         )}
//         <View style={styles.headline}>
//           <Text style={styles.headlineText}>Welcome back!</Text>
//           <Text style={styles.subHeadlineText}>Enter your email and password to login</Text>
//           {isError && (
//             <Text style={{ color: 'red', marginTop: 20 }}>
//               {error?.data.message ? error?.data.message : 'Login failed!! Pls try again'}
//             </Text>
//           )}
//         </View>
//         <View style={styles.form}>
//           <View
//             style={[
//               styles.input,
//               validation.email.isFocused
//                 ? { borderColor: BrandColor.PrimaryColor[500], borderWidth: 1 }
//                 : null,
//               validation.email.error ? { borderColor: BrandColor.Red[600], borderWidth: 1 } : null,
//             ]}
//           >
//             <TextInput
//               style={styles.inputText}
//               placeholder='Email'
//               value={email}
//               keyboardType='email-address'
//               onChange={(e) => {
//                 // const email = e.nativeEvent.text
//                 // setFormData((prev) => ({ ...prev, email: email }))
//                 setEmail(e.nativeEvent.text)
//                 setValidation((prev) => ({ ...prev, email: { ...prev.email, error: '' } }))
//               }}
//               onFocus={() =>
//                 setValidation((prev) => ({ ...prev, email: { ...prev.email, isFocused: true } }))
//               }
//               onBlur={() => {
//                 setValidation((prev) => ({ ...prev, email: { ...prev.email, isFocused: true } }))
//                 setValidation((prev) => ({
//                   ...prev,
//                   email: {
//                     ...prev.email,
//                     error: email === '' ? 'Email is required' : '',
//                   },
//                 }))
//               }}
//             />
//             <Mail width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//           </View>
//           <View
//             style={[
//               styles.input,
//               validation.password.isFocused
//                 ? { borderColor: BrandColor.PrimaryColor[500], borderWidth: 1 }
//                 : null,
//               validation.password.error
//                 ? { borderColor: BrandColor.Red[600], borderWidth: 1 }
//                 : null,
//             ]}
//           >
//             <TextInput
//               style={styles.inputText}
//               placeholder='Password'
//               value={password}
//               // value={formData.password}
//               secureTextEntry={hidden}
//               onChange={(e) => {
//                 // setFormData((prev) => ({ ...prev, password: e.nativeEvent.text }))
//                 setPassword(e.nativeEvent.text)
//                 setValidation((prev) => ({ ...prev, password: { ...prev.password, error: '' } }))
//               }}
//               onFocus={() =>
//                 setValidation((prev) => ({
//                   ...prev,
//                   password: { ...prev.password, isFocused: true },
//                 }))
//               }
//               onBlur={() => {
//                 setValidation((prev) => ({
//                   ...prev,
//                   password: { ...prev.password, isFocused: true },
//                 }))
//                 setValidation((prev) => ({
//                   ...prev,
//                   password: {
//                     ...prev.password,
//                     error: password === '' ? 'Password is required' : '',
//                   },
//                 }))
//               }}
//             />
//             <TouchableOpacity onPress={() => setHidden((prev) => !prev)}>
//               {hidden ? (
//                 <Lock width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//               ) : (
//                 <Unlock width={24} height={24} color={BrandColor.PrimaryColor[500]} />
//               )}
//             </TouchableOpacity>
//           </View>
//           <View style={styles.forgotPw}>
//             <Link href={'/reset-password'} style={styles.linkText}>
//               Forgot password?
//             </Link>
//           </View>
//           <Pressable
//             style={[
//               styles.button,
//               validation.email.error || validation.password.error ? styles.disabled : null,
//             ]}
//             onPress={handleLogin}
//             disabled={validation.email.error || validation.password.error ? true : false}
//           >
//             <Text style={styles.buttonText}>Login</Text>
//           </Pressable>
//         </View>
//         <View style={styles.seperator}>
//           <View
//             style={{
//               height: StyleSheet.hairlineWidth,
//               flex: 1,
//               backgroundColor: NeutralColor.GrayMedium[500],
//             }}
//           />
//           <Text style={{ color: NeutralColor.GrayMedium[500], paddingHorizontal: 10 }}>OR</Text>
//           <View
//             style={{
//               height: StyleSheet.hairlineWidth,
//               flex: 1,
//               backgroundColor: NeutralColor.GrayMedium[500],
//             }}
//           />
//         </View>

//         <View style={styles.bottomContainer}>
//           <Pressable style={styles.linkButton}>
//             <Image
//               source={require('@/assets/images/facebook-logo.png')}
//               style={{ width: 24, height: 24 }}
//             />
//             <Text style={[styles.linkButtonText, { width: '90%' }]}>Continue with Facebook</Text>
//           </Pressable>
//           <Pressable style={styles.linkButton}>
//             <Image
//               source={require('@/assets/images/google-logo.png')}
//               style={{ width: 24, height: 24 }}
//             />
//             <Text style={[styles.linkButtonText, { width: '90%' }]}>Continue with Google</Text>
//           </Pressable>
//           <View style={styles.registerLink}>
//             <Text style={styles.linkButtonText}>Don't have an account?</Text>
//             <Link href={'/register'} style={styles.linkText}>
//               Register now
//             </Link>
//           </View>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
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
//     color: NeutralColor.Black[700],
//     fontSize: 24,
//     fontWeight: '500',
//     textAlign: 'center',
//     letterSpacing: 1,
//   },
//   subHeadlineText: {
//     marginTop: 8,
//     color: NeutralColor.GrayMedium[500],
//     fontSize: 16,
//     letterSpacing: 1,
//     textAlign: 'center',
//   },
//   form: {
//     marginTop: 60,
//     width: '100%',
//     gap: 28,
//     alignItems: 'center',
//     marginBottom: 48,
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
//     marginTop: 48,

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

// export default Login

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BrandColor, NeutralColor, TextColor } from '../constants/Colors'
import { ThemedText } from '../components/ThemedText'
import { useLocale } from '../hooks/useLocale'
import { TextType } from '../types/text'
import { useLoginMutation } from '@/src/features/auth/auth.service'
import { setAuth } from '@/src/features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@/src/hooks/hooks'
import Input from '../components/Input'
import { useEffect, useState } from 'react'
import { EmailRegExp, PasswordRegExp } from '../utils/RegExp'
import Button from '@/src/components/buttons/Button'
import { Ionicons } from '@expo/vector-icons'
import { Eye, EyeOff } from 'react-native-feather'
import { useRouter } from 'expo-router'

const Page = () => {
  const router = useRouter()
  const { t } = useLocale()
  const [isSecure, setIsSecure] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<'normal' | 'focused' | 'typing' | 'error'>('normal')
  const [login, { data, isSuccess, isError, error, isLoading }] = useLoginMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      // Alert.alert('Success', 'Login successful')
      const metadata = data?.metadata
      console.log("🚀 ~ useEffect ~ data?.metadata:", data?.metadata)
      dispatch(
        setAuth({
          tokens: metadata?.tokens,
          userId: metadata?.user?._id,
          isAuthenticated: true,
          walletId: metadata?.user?.wallets[0],
        })
      )
    }
  }, [isSuccess])
  const [isValidated, setIsValidated] = useState({
    email: false,
    password: false,
  })
  const toggleSecure = () => {
    setIsSecure((prev) => !prev)
  }
  
  const handleLogin = async () => {
    try {
      
      await login({ email, password })
    } catch (error) {
      console.log("🚀 ~ handleLogin ~ error:", error)
      
    }
    setEmail('')
    setPassword('')

  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('@/src/assets/icons/logo.png')} style={styles.img} />
      </View>
      <View style={styles.welcome}>
        <ThemedText type={TextType.Title22Bold} color={TextColor.Primary} style={styles.textAlign}>
          {t('login.title')}
        </ThemedText>
        <ThemedText
          type={TextType.SubheadlineRegular}
          color={TextColor.Secondary}
          style={styles.textAlign}
        >
          {t('login.description')}
        </ThemedText>
      </View>
      <View style={styles.form}>
        <Input
          value={email}
          placeholder={t('login.email')}
          buttonLeft={() => (
            <Image
              source={require('@/src/assets/icons/mail.png')}
              width={24}
              height={24}
              resizeMode='contain'
            />
          )}
          validationOptions={{
            pattern: [EmailRegExp, 'Invalid email address'],
          }}
          validate={(isValid: boolean) => {
            setIsValidated((prev) => ({ ...prev, email: isValid }))
          }}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          value={password}
          placeholder={t('login.password')}
          buttonLeft={() => <Image source={require('@/src/assets/icons/lock-outline.png')} />}
          buttonRight={() => (
            <TouchableOpacity onPress={toggleSecure}>
              {isSecure ? (
                <EyeOff width={24} height={24} color={BrandColor.PrimaryColor[400]} />
              ) : (
                <Eye width={24} height={24} color={BrandColor.PrimaryColor[400]} />
              )}
            </TouchableOpacity>
          )}
          isSecure={isSecure}
          validationOptions={{
            pattern: [PasswordRegExp, 'Invalid password'],
            minLength: [6, 'Password must be at least 6 characters'],
          }}
          validate={(isValid: boolean) => {
            setIsValidated((prev) => ({ ...prev, password: isValid }))
          }}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.forgotPassword}>
        <View></View>
        <TouchableOpacity onPress={() => router.navigate('/reset-password')}>
          <ThemedText type={TextType.Caption12Regular} color={BrandColor.Blue[600]}>
            {t('login.forgot')}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.signIn}>
        <Button
          text={t('login.signin')}
          size='large'
          state={isValidated.email && isValidated.password ? 'normal' : 'disabled'}
          onPress={handleLogin}
          textColor={NeutralColor.White[50]}
          type='primary'
        />
      </View>
      <View style={styles.signUpRedirect}>
        <ThemedText type={TextType.FootnoteRegular} color={TextColor.Primary}>
          {t('login.noaccount')}
        </ThemedText>
        <TouchableOpacity onPress={() => router.navigate('/register')}>
          <ThemedText type={TextType.FootnoteSemibold} color={BrandColor.Blue[600]}>
            {t('login.signup')}
          </ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.oauth}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={[styles.seperator, { width: '45%' }]}></View>
          <Text>or</Text>
          <View style={[styles.seperator, { width: '45%' }]}></View>
        </View>
        <Button
          text={t('login.apple')}
          size='large'
          state='normal'
          onPress={() => console.log('facebook')}
          buttonLeft={() => <Ionicons name='logo-apple' size={24} color={NeutralColor.White[50]} />}
          textColor={NeutralColor.White[50]}
          style={{ backgroundColor: NeutralColor.Black[950] }}
          type='primary'
        />
        <Button
          text={t('login.google')}
          size='large'
          state='normal'
          onPress={() => console.log('google')}
          buttonLeft={() => <Image source={require('@/src/assets/icons/google.jpg')} />}
          textColor={TextColor.Primary}
          type='tertiary'
        />
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeutralColor.White[50],
  },
  logo: {
    alignItems: 'center',
    marginTop: 32,
  },
  img: {
    borderRadius: 28,
    width: 114,
    height: 114,
  },
  welcome: {
    marginTop: 12,
    gap: 4,
  },
  textAlign: {
    textAlign: 'center',
  },
  form: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 24,
    gap: 22,
  },
  input: {
    height: 50,
    borderRadius: 14,
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  forgotPassword: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signIn: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  signUpRedirect: {
    marginTop: 24,
    paddingHorizontal: 24,
    flexDirection: 'row',
    gap: 4,
    alignSelf: 'center',
  },
  oauth: {
    marginTop: 24,
    paddingHorizontal: 24,
    gap: 14,
  },
  seperator: {
    height: 1,
    backgroundColor: BrandColor.Gray[400],
  },
})
