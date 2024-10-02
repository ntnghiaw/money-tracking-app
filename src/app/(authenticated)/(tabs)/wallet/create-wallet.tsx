import BottomContainer from '@/src/components/BottomContainer'
import Button from '@/src/components/buttons/Button'
import Input from '@/src/components/Input'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { ThemedText } from '@/src/components/ThemedText'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useCreateNewWalletMutation } from '@/src/features/wallet/wallet.service'
import { useLocale } from '@/src/hooks/useLocale'
import { Wallet } from '@/src/types/enum'
import { TextType } from '@/src/types/text'
import { getImg, getWaleltImg } from '@/src/utils/getImgFromUri'
import { isEntityError } from '@/src/utils/helpers'
import { AntDesign } from '@expo/vector-icons'
import { Href, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'





const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const initWallet = {
  name: '',
  type: 'private' as 'private' | 'shared',
}


type FormError =
  | {
      [key in keyof typeof initWallet]: string
    }
  | null


const types = [
  { label: 'Private', value: 'private' },
  // { label: 'Shared', value: 'shared' },
]



const Page = () => {
 const router = useRouter()
 const {t} = useLocale()
 const {icon} = useLocalSearchParams() as {icon: string}
 const [wallet, setWallet] = useState<typeof initWallet>(initWallet)
 const [isFocusType, setIsFocusType] = useState(false)
  const [isValidFields, setIsValidFields] = useState({
    name: false,
  })

  const [createWallet, createWalletResult] = useCreateNewWalletMutation()

  const errorForm: FormError = useMemo(() => {
    const errorResult = createWalletResult.error
    if (isEntityError(errorResult)) {
      console.log(errorResult.data)
      return errorResult?.data.error as FormError
    }
    return null
  }, [createWalletResult])


  useEffect(() => {
    if(createWalletResult.isSuccess) {
      router.back()
    }

  }, [createWalletResult])

  const handleCreateWallet = async() => {
    try {
      console.log('wallet::', { ...wallet, icon: icon.toString() })
      await createWallet({...wallet, icon: icon.toString()}).unwrap()
    } catch (error) {
      console.log("🚀 ~ handleCreateWal ~ error:", error)
    }
  }


  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('wallets.addwallet'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  type='btn'
                  onPress={() => {
                    router.back()
                  }}
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
            />
          ),
        }}
      />

      <View style={styles.form}>
        <TouchableOpacity
          style={[styles.iconSmile, { alignSelf: 'center' }]}
          onPress={() => router.push('/(authenticated)/(tabs)/wallet/icons' as Href)}
        >
          <Image
            source={icon ? getWaleltImg(icon.toString()) : require('@/src/assets/icons/smile.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <Input
          label={t('wallets.name')}
          value={wallet.name}
          placeholder={t('wallets.name')}
          onChangeText={(value) => setWallet((prev) => ({ ...prev, name: value }))}
          validate={(isValid) => setIsValidFields({ ...isValidFields, name: isValid })}
          error={!!errorForm?.name}
          errorMessage={errorForm?.name}
        />

        <View>
          <ThemedText
            type={TextType.FootnoteSemibold}
            color={TextColor.Primary}
            style={styles.label}
          >
            {t('wallets.type')}
          </ThemedText>
          <Dropdown
            style={[
              styles.dropdown,
              isFocusType && {
                borderColor: BrandColor.Blue[600],
                backgroundColor: BackgroundColor.LightTheme.Tertiary,
              },
            ]}
            selectedTextStyle={styles.selectedTextStyle}
            data={types}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={t('settings.selectgender')}
            renderRightIcon={() => (
              <AntDesign
                name='down'
                size={12}
                color={BrandColor.PrimaryColor[400]}
                style={styles.icon}
              />
            )}
            itemTextStyle={{ fontSize: 14 }}
            value={wallet.type}
            onFocus={() => setIsFocusType(true)}
            onBlur={() => setIsFocusType(false)}
            onChange={(item) => {
              setWallet((prev) => ({
                ...prev,
                type: item.value === 'private' ? 'private' : 'shared',
              }))
              setIsFocusType(false)
            }}
          />
        </View>

        {/* <Input label={t('wallets.balance')} value={wallet.balance?.toString()} editable={false} /> */}
      </View>
      <BottomContainer>
        <Button
          type='primary'
          text={t('actions.create')}
          size='large'
          state={Object.values(isValidFields).every((value) => value) ? 'normal' : 'disabled'}
          disabled={!Object.values(isValidFields).every((value) => value)}
          onPress={handleCreateWallet}
          isLoading={createWalletResult.isLoading}
        />
      </BottomContainer>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    paddingHorizontal: 24,
  },
  form: {
    gap: 40,
    marginTop: 36,
  },
  dropdown: {
    height: 54,
    borderColor: BrandColor.Gray[300],
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: TextColor.Primary,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
  datePicker: {
    maxHeight: screenHeight * 0.15,
  },
  button: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: screenWidth - 48,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColor.Gray[300],
  },
  iconSmile: {
    width: 138,
    height: 138,
    borderRadius: 26,
    backgroundColor: BrandColor.PrimaryColor[50],
    borderColor: BrandColor.PrimaryColor[400],
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 54,
    height: 54,
    resizeMode: 'contain',
  },
})