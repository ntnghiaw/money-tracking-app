import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import * as ExpoMediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Image } from 'react-native'
import Button from '@/src/components/buttons/Button'
import * as ImagePicker from 'expo-image-picker'
import { BackgroundColor,  TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { Stack, useRouter } from 'expo-router'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { AntDesign } from '@expo/vector-icons'
import { useScanImageReceiptsMutation } from '@/src/features/transaction/transaction.service'
import { useAppSelector } from '@/src/hooks/hooks'
import { Alert } from 'react-native'
import * as FileSystem from 'expo-file-system'
import mime from 'mime'
import Loading from '@/src/components/Loading'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const Page = () => {
  const [image, setImage] = useState(null)
  const { user, tokens } = useAppSelector((state) => state.auth)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
  const { t } = useLocale()
  const router = useRouter()
  const [scanImageReceipts, { data, isSuccess, isError, status, error }] =
    useScanImageReceiptsMutation()
  const [loading, setLoading] = useState(false)
  const getImageFromLibrary = async () => {
    if (permissionResponse?.status !== 'granted') {
      await requestPermission()
      return
    }

    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync()
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [1, 1],
        quality: 1,
      })
      if(result) {
        setImage(result?.assets[0])
      }
    } catch (error) {
      console.log('Error fetching media library assets', error)
    }
  }

  const handleScanImage = async () => {
    setLoading(true)
    if (!image) {
      Alert.alert('No image to upload')
      return
    }
    const newImageUri = 'file:///' + image.uri.split('file:/').join('')
    const formData = new FormData()
    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop(),
    })

    try {
      const res = await fetch(`http://192.168.1.10:5000/v1/api/transactions/scanReceipt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: tokens.accessToken,
          'x-client-id': user._id,
        },
        body: formData,
      })
      const data = await res.json()
      console.log(data)
      setLoading(false)
      router.navigate({
        pathname: '/(authenticated)/(tabs)/transaction',
        params: {
          img_url: data?.metadata?.img_url,
          total: data?.metadata?.total,
          createdAt: data?.metadata?.createdAt,
          title: data?.metadata?.title,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: BackgroundColor.LightTheme.Tertiary,
        paddingHorizontal: 24,
      }}
    >
      <Loading isLoading={loading}  text='Loading..'/>
      <Stack.Screen
        options={{
          headerTitle: t('transaction.chooseimage'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  type='btn'
                  onPress={() => router.back()}
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
              headerRight={() => (
                <HeaderButton
                  type='text'
                  onPress={handleScanImage}
                  text={t('transaction.continue')}
                />
              )}
            />
          ),
        }}
      />
      <View style={styles.imgContainer}>
        {image?.uri ? (
          <Image source={{ uri: image?.uri }} style={{ width: 300, height: 300 }} />
        ) : (
          <Text>No image selected</Text>
        )}
      </View>
      <View style={{ marginTop: 24 }}>
        <Button
          text={t('transaction.getimagefromlibrary')}
          size='medium'
          state='normal'
          type='primary'
          onPress={getImageFromLibrary}
        />
      </View>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  imgContainer: {
    marginTop: 40,
    width: screenWidth - 48,
    height: screenHeight * 0.6,
    borderRadius: 14,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
