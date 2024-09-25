import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import * as ExpoMediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'
import * as MediaLibrary from 'expo-media-library'
import { Image } from 'react-native'
import Button from '@/src/components/buttons/Button'
import * as ImagePicker from 'expo-image-picker'
import { BackgroundColor, TextColor } from '@/src/constants/Colors'
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
  const router = useRouter()
  const { t } = useLocale()
  const [image, setImage] = useState <ImagePicker.ImagePickerAsset | undefined>()
  const { user, tokens } = useAppSelector((state) => state.auth)
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
  const [loading, setLoading] = useState(false)
  const [scanReceipt, { data, isLoading, isSuccess  }] = useScanImageReceiptsMutation()
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
      if (result && result.assets) {
        setImage(result?.assets[0])
      }
    } catch (error) {
      console.log('Error fetching media library assets', error)
    }
  }
 
  useEffect(() => {
    if(isSuccess) {
      router.navigate({
        pathname: '/(authenticated)/(tabs)/transaction',
        params: {
          img_url: data?.img_url,
          total: data?.total,
          createdAt: data?.createdAt,
          title: data?.title,
        }})
    }
  }, [isSuccess])
  const handleScanImage = async () => {
    setLoading(true)
    if (!image) {
      Alert.alert('No image to upload')
      return
    }
    const newImageUri = 'file:///' + image.uri.split('file:/').join('')
    try {

      await scanReceipt({
        image: {
          uri: newImageUri,
          type: mime.getType(newImageUri),
          name: newImageUri.split('/').pop(),
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
      <Loading isLoading={isLoading} text='Loading..' />
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
          <Image
            source={{ uri: image?.uri }}
            style={{ width: 300, height: 300 }}
            resizeMode='contain'
          />
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
