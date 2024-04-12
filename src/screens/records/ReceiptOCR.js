import React, { useRef, useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, Alert, Image, TouchableOpacity } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

import CameraButton from '../../components/CameraButton'
import { X, Image as ImageIcon, Zap, ZapOff, Repeat, Send, Check } from 'react-native-feather'
import colors from '../../components/Colors'

export default function ReceiptOCR  ({ navigation })  {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off) //flash on your device 

  const cameraRef = useRef(null)
  
  useEffect(() => {
    
    (async () => {
      MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasCameraPermission(cameraStatus === 'granted')
    })()
    // navigation.setOptions({ 
    //   title: ''
    // })
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync()
        setImage(data.uri)
        navigation.setOptions({ 
          headerLeft: () => (
            <TouchableOpacity onPress={() => setImage(null)}>
              <X width={24} height={24} stroke={'white'} />
            </TouchableOpacity>
          )
         })

      } catch (error) {
        console.log(error)
      }
    }
  }

  const changeFlashHandler = () => {
    setFlash(!flash)
  }

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image)
        alert('Picture saved!')
        setImage(null)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const retakeHandler = () => {
    setImage(null)
  }

  const accessLibraryHandler = () => {

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

      {!image ? 
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
      </Camera>
      :
      <Image source={{uri: image}}  style={styles.camera}/>

    }
    {
      !image ? 
      (
        
      <View style={styles.buttonsControl} >
          <TouchableOpacity style={styles.libraryButton} onPress={accessLibraryHandler}>
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
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row'}}>
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
  camera: {
    flex: 1,
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