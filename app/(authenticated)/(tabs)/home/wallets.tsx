import { formatter } from '@/utils/formatNumber'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useGetAllWalletsQuery } from '@/features/wallet/wallet.service'
import { useAppSelector } from '@/hooks/hooks'
import { useCallback, useMemo, useRef } from 'react'
import { Colors } from '@/constants/Colors'
import { CreditCard, Edit, MoreHorizontal, X } from 'react-native-feather'
import { DefaultTheme } from '@react-navigation/native'
import { Wallet } from '@/types/enum'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { router } from 'expo-router'

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
]

const groupWallet = (wallets: Wallet[]) => {
  const privateWallets: Wallet[] = []
  const sharedWallets: Wallet[] = []
  wallets.forEach((wallet) => {
    if (wallet.type === 'private') {
      privateWallets.push(wallet)
    } else {
      sharedWallets.push(wallet)
    }
  })
  return [
    {
      title: 'Private Wallets',
      data: privateWallets,
    },
    {
      title: 'Shared Wallets',
      data: sharedWallets,
    },
  ]
}

const Page = () => {
  const { tokens, userId } = useAppSelector((state) => state.auth)
  const { data, isLoading, isError, isSuccess } = useGetAllWalletsQuery({
    auth: {
      userId: userId,
      accessToken: tokens?.accessToken,
    },
  })
  const { showActionSheetWithOptions } = useActionSheet()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['33%'], [])
  const wallets = data?.metadata ?? []
  const totalAmount =
    useMemo(() => data?.metadata?.reduce((acc, item) => acc + item.balance, 0), [data]) || 0
  const sectionListData = useMemo(() => groupWallet(wallets), [wallets])

  const showModal = async () => {
    bottomSheetModalRef.current?.present()
  }

  const hideModal = async () => {
    bottomSheetModalRef.current?.dismiss()
  }

  const handleDeleteWallet = async () => {
    Alert.alert('Delete Wallet', 'Are you sure you want to delete this wallet?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => {
        hideModal()
        console.log('OK Pressed')
      } },
    ])

  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.3}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior='collapse'
        onPress={() => bottomSheetModalRef.current?.dismiss()}
      />
    ),
    []
  )

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Login...</Text>
          </View>
        ) : (
          <View style={styles.inner}>
            <View style={styles.balance}>
              <Text style={[styles.balanceText, {color: totalAmount > 0 ? Colors.primary : 'red'}]}>{formatter(totalAmount)}</Text>
              <Text style={{ letterSpacing: 1, fontSize: 16 }}>Total Balance</Text>
            </View>
            <SectionList
              style={{ marginTop: 20 }}
              sections={sectionListData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <View style={styles.icon}>
                    <CreditCard width={36} height={36} color={'#7D8895'} />
                  </View>
                  <View style={styles.content}>
                    <Text style={{ fontSize: 16, fontWeight: '500', letterSpacing: 1 }}>
                      {item.name}
                    </Text>
                    <Text>{`Balance: ${formatter(item.balance)}`}</Text>
                    <Text style={{ fontSize: 12 }}>{`Created: ${new Date(
                      item.createdAt
                    ).toDateString()}`}</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.more, { position: 'absolute', right: 12, top: 8 }]}
                    onPress={() => {
                      showModal()
                    }}
                  >
                    <MoreHorizontal width={18} height={18} color={Colors.gray} />
                  </TouchableOpacity>
                </View>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                    color: Colors.gray,
                    marginVertical: 12,
                  }}
                >
                  {title}
                </Text>
              )}
            />
          </View>
        )}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          handleComponent={null}
          enableOverDrag={false}
          enablePanDownToClose
        >
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 8,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '500' }}>Edit</Text>
              <TouchableOpacity
                style={{ position: 'absolute', right: 12 }}
                onPress={() => hideModal()}
              >
                <X width={24} height={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonControl}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.navigate('/(authenticated)/(tabs)/home/wallet')}
              >
                <Edit width={24} height={24} color={Colors.black} />
                <Text style={{ fontSize: 16, padding: 12 }}>Edit wallet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleDeleteWallet}>
                <MaterialCommunityIcons name='delete-outline' size={24} color={'red'} />
                <Text style={{ fontSize: 16, padding: 12, color: 'red' }}>Delete wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inner: {
    flex: 1,
    marginTop: 20,
  },
  balance: {
    gap: 12,
  },
  balanceText: {
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 2,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginLeft: 14,
    gap: 4,
  },
  more: {},
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonControl: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
  },
  button: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    alignItems: 'center',
    marginLeft: 24,
  },
})

export default Page
