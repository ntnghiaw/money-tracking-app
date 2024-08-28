import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import { BlurView } from 'expo-blur'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Bell } from 'react-native-feather'
import { Href, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

const CustomHeader = () => {
  const router = useRouter()
  const { top } = useSafeAreaInsets()

  return (
    <BlurView intensity={80} tint='light'>
      <SafeAreaView style={[styles.container]}>
        <TouchableOpacity
          style={styles.info}
          onPress={() => router.navigate('(authenticated)/(tabs)/account/profile' as Href)}
        >
          <TouchableOpacity style={[]}>
            <Image source={require('@/assets/images/avt.jpg')} style={styles.avatarImg} />
          </TouchableOpacity>
          <View style={styles.welcome}>
            <Text style={styles.text}>Welcome,</Text>
            <Text style={styles.text}>John Doe</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]}>
          <Bell width={24} height={24} stroke='white' />
        </TouchableOpacity>
      </SafeAreaView>
    </BlurView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    gap: 10,
    height: 100,
  },
  button: {
    marginRight: 20,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight:  '500',
    letterSpacing: 1,
  },
  info: {
    marginLeft: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  welcome: {
    gap: 4,
  },
  avatarImg: {
      width: 40,
      height: 40,
      borderRadius: 20,
      
  }
})
export default CustomHeader
