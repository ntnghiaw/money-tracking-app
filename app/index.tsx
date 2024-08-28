import { useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Index() {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top + 30 }]}>
      <View style={styles.option}>
        {/* <TouchableOpacity style={styles.skipButton} >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity> */}
      </View>
      <Image source={require('@/assets/images/background.png')} style={styles.image} />
      <View style={styles.headline}>
        <Text style={styles.headlineText}>
          Track, Manage, and Save: Your Finances in Perfect Balance{' '}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: '#fff', borderWidth: 1, borderColor: Colors.primary },
          ]}
          onPress={() => router.push('/login')}
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>Sign In</Text>
        </TouchableOpacity>
        {/* <View style={styles.seperator}>
          <View
            style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: Colors.gray }}
          />
          <Text style={{ color: Colors.gray, paddingHorizontal: 10 }}>OR</Text>
          <View
            style={{ height: StyleSheet.hairlineWidth, flex: 1, backgroundColor: Colors.gray }}
          />
        </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    alignItems: 'center',
  },
  skipButton: {
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray,
  },
  skipText: {
    color: Colors.gray,
    fontSize: 16,
    letterSpacing: 1,
  },
  image: {
    height: 400,
    width: '70%',
    paddingHorizontal: 40,
    resizeMode: 'contain',
  },
  headline: {
    paddingHorizontal: 20,
  },
  headlineText: {
    color: Colors.black,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 24,
  },
  bottomContainer: {
    marginTop: 60,
    width: '100%',
    padding: 20,
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 56,
    width: '100%',
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1,
  },
  seperator: {
    marginVertical: 14,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
