import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Alert, Image, TouchableOpacity, ActivityIndicator, Dimensions  } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { Image as ImageIcon, Zap, ZapOff, Repeat, Check,  } from 'react-native-feather'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { ref, uploadBytesResumable, getDownloadURL, uploadBytes, getStorage  } from 'firebase/storage'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



import CameraButton from '../../components/CameraButton'
import { storage } from '../../../firebaseConfig'
import { OCR } from '../../redux/transaction/transactionAction'


export default function ReceiptOCR  ({ navigation })  {
  const dispatch = useDispatch();
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off) //flash on your device 
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null)
  
  useEffect(() => {
    
    (async () => {
      MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus === 'granted')
    })()

  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        setImage(data.uri)
        navigation.setOptions({
          headerBackVisible: false,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const changeFlashHandler = () => {
    setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off)
  }

  const uploadImage = async () => {
        const metadata = {
          contentType: 'image/jpeg',
        };
        setLoading(true)
        const response = await fetch(image)
        const blob = await response.blob()
        const filename = image.substring(image.lastIndexOf('/')+1)
        const storageRef = ref(storage, '/images/' + filename)
        let imageUrl
        uploadBytes(storageRef, blob, metadata).then((snapshot) => {
          const { bucket, fullPath } = snapshot.metadata
          imageUrl = `https://storage.googleapis.com/${bucket}/${fullPath}`
          console.log(imageUrl)
          return imageUrl
          // setImage(null)
          
        }).then((url) => {
          return axios.post(`http://localhost:5000/transaction/ocr?imageUrl=${imageUrl}`)
        } 

        ).then(result => {
          console.log(result)
        }).catch(err => console.log(err));
        setLoading(false)
  }

  const retakeHandler = () => {
    navigation.setOptions({
      headerBackVisible: true
    })
    setImage(null)
  }

  const pickImageHandler = async () => {
    setLoading(true);

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    
    setLoading(false);

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const cancelCameraHandler = () => {
    navigation.goBack()
  }
  if (hasCameraPermission === 'false') {
    Alert.alert('No access to Camera')
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
      />
      {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.loading}/>}

      {  (!image && !loading) ? (
        <Camera 
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          > 

        <TouchableOpacity style={styles.flashMode} onPress={changeFlashHandler}>
          { flash ? 
          (<Zap width={24} height={24} stroke={'white'} />) 
          : 
          (<ZapOff width={24} height={24} stroke={'white'} />)
          }
        </TouchableOpacity>
        </Camera>) 
      : ( <Image source={{uri: image }}  style={styles.camera}/>)
      }
    {
      !image ? 
      (
      <View style={styles.buttonsControl} >
          <TouchableOpacity style={styles.libraryButton} onPress={pickImageHandler}>
            <ImageIcon width={34} height={34} stroke={'grey'}/>
          </TouchableOpacity>
          <View style={styles.captureButton}>
            <CameraButton size={72} onPress={takePicture}/>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelCameraHandler}>

            <Text style={styles.text}>Cancel</Text>

          </TouchableOpacity>
      </View>
     )
        :
     (
       <View style={styles.buttonsControl}>
          <TouchableOpacity onPress={retakeHandler } style={{ flexDirection: 'row'}}>
            <Repeat width={28} height={28} stroke={'white'} />
            <Text style={styles.text}>Re-take</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row'}} onPress={uploadImage}>
            <Check width={28} height={28} stroke={'white'} />
          </TouchableOpacity>
      </View>
      
    )
    }
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: 'black'
  },
  flashMode: {
    width: 34,
    height: 34,
    borderRadius: 16,
    backgroundColor: 'rgba(123,123,123, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    right: 16
  },
  loading: {
    position: 'absolute',
    top: 0.4*screenHeight,
    left: 0.5*screenWidth,
  },

  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonsControl: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  libraryButton: {
    flex: 1,
    alignItems: 'flex-start',

  },
  captureButton: {
    flex: 1,
    alignItems: 'center'
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    alignItems: 'flex-end'

  },
  text: {
    color: 'white',
    fontSize: 18
  },
  
})