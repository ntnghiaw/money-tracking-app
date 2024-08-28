import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacityBase } from 'react-native'
import { Link, Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { clearAuth } from '@/features/auth/authSlice'
import { useLogoutMutation } from '@/features/auth/auth.service'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { useGetProfileQuery } from '@/features/user/user.service'
import { Colors } from '@/constants/Colors'
import { Image } from 'react-native'
import { Bell, ChevronRight, Lock, LogOut, User, UserCheck } from 'react-native-feather'

const Account = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userId, tokens, walletId, isAuthenticated } = useAppSelector((state) => state.auth)
  const [logout, { data, isSuccess, isError, error, isLoading }] = useLogoutMutation()
  const { data: userInfo, isError: isErrorGetInfo } = useGetProfileQuery({
    auth: { userId, accessToken: tokens?.accessToken },
  })

  const handleLogout = async () => {
    await logout({ userId, tokens, isAuthenticated, walletId })
    dispatch(clearAuth())
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Account' }} />
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.loading]}>
          <ActivityIndicator size='large' color={Colors.primary} />
          <Text style={{ fontSize: 18, padding: 10 }}>Logout...</Text>
        </View>
      )}
      <View style={styles.inner}>
        <View style={styles.avtFrame}>
          <Image
            source={{ uri: userInfo?.metadata.avatar_url }}
            width={80}
            height={80}
            style={styles.avt}
            resizeMode='contain'
          />
          <Text style={styles.memberStatusText}>Member</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Settings</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => router.navigate('/(authenticated)/(tabs)/account/profile')}
          >
            <View style={styles.icon}>
              <User width={24} height={24} color={'#545454'} />
            </View>
            <Text style={styles.itemText}>Profile</Text>
            <View style={styles.rightIcon}>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              <UserCheck width={24} height={24} color={'#545454'} />
            </View>
            <Text style={styles.itemText}>Membership</Text>
            <View style={styles.rightIcon}>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              <Bell width={24} height={24} color={'#545454'} />
            </View>
            <Text style={styles.itemText}>Notifications</Text>
            <View style={styles.rightIcon}>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Login & Security</Text>
          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              <Lock width={24} height={24} color={'#545454'} />
            </View>
            <Text style={styles.itemText}>PIN password</Text>
            <View style={styles.rightIcon}>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <View style={styles.icon}>
              <Lock width={24} height={24} color={'#545454'} />
            </View>
            <Text style={styles.itemText}>Change password</Text>
            <View style={styles.rightIcon}>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={handleLogout}>
            <View style={styles.icon}>
              <LogOut width={24} height={24} color={'#FF1515'} />
            </View>
            <Text style={[styles.itemText, { color: '#FF1515' }]}>Logout</Text>
            {/* <View>
              <ChevronRight width={24} height={24} color={Colors.gray} />
            </View> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 50,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
  },
  avtFrame: {
    marginTop: 30,
    gap: 12,
    alignSelf: 'center',
  },
  avt: {
    borderRadius: 40,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  memberStatusText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  section: {
    marginTop: 20,
  },
  sectionText: {
    paddingLeft: 16,
    fontSize: 20,
    color: Colors.black,
    fontWeight: '500',
    marginVertical: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
  },
  itemText: {
    fontSize: 16,
    letterSpacing: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
  },
})

export default Account
