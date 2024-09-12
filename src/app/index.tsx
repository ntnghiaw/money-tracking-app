// import { useEffect } from 'react'
// import { router } from 'expo-router'
// import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { BrandColor, NeutralColor } from '@/constants/Colors'

// export default function Index() {
//   const { top } = useSafeAreaInsets()

//   return (
//     <View style={[styles.container, { paddingTop: top + 30 }]}>
//       <View style={styles.option}>
//         {/* <TouchableOpacity style={styles.skipButton} >
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity> */}
//       </View>
//       <Image source={require('@/assets/images/background.png')} style={styles.image} />
//       <View style={styles.headline}>
//         <Text style={styles.headlineText}>
//           Track, Manage, and Save: Your Finances in Perfect Balance{' '}
//         </Text>
//       </View>
//       <View style={styles.bottomContainer}>
//         <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.button,
//             { backgroundColor: '#fff', borderWidth: 1, borderColor: BrandColor.PrimaryColor[500] },
//           ]}
//           onPress={() => router.push('/login')}
//         >
//           <Text style={[styles.buttonText, { color: BrandColor.PrimaryColor[500] },]}>Sign In</Text>
//         </TouchableOpacity>
//         {/* <View style={styles.seperator}>
//           <View
//             style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: NeutralColor.GrayMedium[500] }}
//           />
//           <Text style={{ color: NeutralColor.GrayMedium[500], paddingHorizontal: 10 }}>OR</Text>
//           <View
//             style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: NeutralColor.GrayMedium[500] }}
//           />
//         </View> */}
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   option: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     width: '90%',
//     alignItems: 'center',
//   },
//   skipButton: {
//     borderRadius: 22,
//     paddingHorizontal: 14,
//     paddingVertical: 10,
//     borderWidth: StyleSheet.hairlineWidth,
//     borderColor: NeutralColor.GrayMedium[500],
//   },
//   skipText: {
//     color: NeutralColor.GrayMedium[500],
//     fontSize: 16,
//     letterSpacing: 1,
//   },
//   image: {
//     height: 400,
//     width: '70%',
//     paddingHorizontal: 40,
//     resizeMode: 'contain',
//   },
//   headline: {
//     paddingHorizontal: 20,
//   },
//   headlineText: {
//     color: NeutralColor.Black[700],
//     fontSize: 16,
//     textAlign: 'center',
//     fontWeight: '500',
//     letterSpacing: 1,
//     lineHeight: 24,
//   },
//   bottomContainer: {
//     marginTop: 60,
//     width: '100%',
//     padding: 20,
//     gap: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     height: 56,
//     width: '100%',
//     backgroundColor: BrandColor.PrimaryColor[500] ,
//     padding: 18,
//     borderRadius: 8,
//     alignItems: 'center',
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
// })

import { Image, StyleSheet, Text, View } from 'react-native'
import { ThemedText } from '../components/ThemedText'
import { TextType } from '../types/text'
import { BrandColor, NeutralColor, TextColor } from '../constants/Colors'
import { useLocale } from '../hooks/useLocale'
import Button from '@/src/components/buttons/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {  useRouter } from 'expo-router'


const Page = () => {
  const { t } = useLocale()
  const { bottom } = useSafeAreaInsets()
  const router = useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/src/assets/icons/logo.png')} style={styles.img} />
      </View>
      <View style={styles.welcome}>
        <ThemedText
          type={TextType.LargeTitleBold}
          color={TextColor.Primary}
          style={{ textAlign: 'center' }}
        >
          {t('welcome.slogan')}
        </ThemedText>
        <ThemedText
          type={TextType.Caption12Regular}
          color={TextColor.Secondary}
          style={{ textAlign: 'center', marginTop: 12 }}
        >
          {t('welcome.description')}
        </ThemedText>
      </View>
      <View style={styles.auth}>
        <Button
          type={'tertiary'}
          text={t('welcome.signin')}
          size={'large'}
          state={'normal'}
          onPress={() => router.replace('/login')}
          style={{ width: '48%', backgroundColor: '#EBECEF', borderColor: BrandColor.Gray[400] }}
          textColor={TextColor.Primary}
        />
        <Button
          type={'primary'}
          text={t('welcome.signup')}
          size={'large'}
          state={'normal'}
          onPress={() => router.replace('/register')}
          style={{ width: '48%' }}
        />
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBECEF',
  },
  header: {
    marginTop: 80,
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
  },
  welcome: {
    marginTop: 40,
    paddingHorizontal: 24,
  },
  auth: {
    marginTop: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
})
