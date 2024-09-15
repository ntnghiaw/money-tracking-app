import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import {
  useGetPlanByIdQuery,
  useDeletePlanMutation,
  useUpdatePlanMutation,
} from '@/src/features/plan/plan.service'
import { useAppSelector } from '@/src/hooks/hooks'
import { skipToken } from '@reduxjs/toolkit/query'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import Input from '@/src/components/Input'
import { Dimensions } from 'react-native'
import { ThemedText } from '@/src/components/ThemedText'
import { TextType } from '@/src/types/text'
import MaskInput from 'react-native-mask-input'
import { useCurrency } from '@/src/hooks/useCurrency'
import { formatter } from '@/src/utils/formatAmount'
import { AMOUNT_VND } from '@/src/constants/Masks'
import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Pressable } from 'react-native'
import { ChevronDown } from 'react-native-feather'
import formatDate from '@/src/utils/formatDate'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Button from '@/src/components/buttons/Button'

type AndroidMode = 'date' | 'time'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const EditGoal = () => {
  const router = useRouter()
  const { id } = useLocalSearchParams() as { id: string }
  const { walletId } = useAppSelector((state) => state.auth)
  const { currentCurrency } = useCurrency()
  const { t } = useLocale()

  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')
  const [desiredDate, setDesiredDate] = useState(new Date().toString())
  const [mode, setMode] = useState<AndroidMode>('date')
  const [show, setShow] = useState(false)

  const { isLoading, data, isError } = useGetPlanByIdQuery({
    walletId,
    planId: id ?? skipToken,
  })

  const [deletePlan, { isSuccess: isDeleted }] = useDeletePlanMutation()
  const [updatePlan, { isSuccess: isUpdated }] = useUpdatePlanMutation()

  useEffect(() => {
    if (data) {
      setAmount(data.attributes.target_amount.toString())
      setTitle(data.name)
      setDesiredDate(data.end_date)
    }
  }, [data])

  useEffect(() => {
    if (isDeleted) {
      Alert.alert('Success', 'Delete goal success', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => router.navigate('/(authenticated)/(tabs)/goal'),
        },
      ])
    }
    if (isUpdated) {
        Alert.alert('Success', 'Update goal success', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => router.navigate('/(authenticated)/(tabs)/goal'),
          },
        ])
    }
  }, [isDeleted, isUpdated])

  const onChange = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date
    setShow(false)
    setDesiredDate(currentDate!.toString())
  }

  const showMode = (currentMode: AndroidMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }

  const onDelete = async () => {
    Alert.alert('Delete', 'Are you sure you want to delete this goal?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: async () => await deletePlan({ walletId, planId: id, type: 'goal' }) },
    ])
  }

  const onUpdate = async () => {
   await updatePlan({
      walletId,
      planId: id,
      type: 'goal',
      body: {
        name: title,
        end_date: desiredDate,
        type: 'goal',

        attributes: {
          target_amount: parseInt(amount.replace(/,/g, '')),
        },
      },
    })
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('goals.editgoal'),
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
                <HeaderButton type='text' text={t('goals.save')} onPress={onUpdate} />
              )}
            />
          ),
        }}
      />
      <View style={{ marginTop: 24, gap: 24 }}>
        <View style={styles.amount}>
          <View style={styles.amountLabel}>
            <ThemedText type={TextType.FootnoteRegular} color={TextColor.Secondary}>
              {t('goals.targetamount')}
            </ThemedText>
          </View>
          <MaskInput
            value={amount}
            style={styles.amountText}
            keyboardType='numeric'
            autoFocus={false}
            placeholder={formatter(0, currentCurrency)}
            placeholderTextColor={TextColor.Placeholder}
            maskAutoComplete={true}
            onChangeText={(masked, unmasked) => {
              setAmount(masked) // you can use the unmasked value as well
            }}
            mask={AMOUNT_VND}
          />
        </View>
        <Input
          label={t('goals.titlegoal')}
          value={title}
          onChangeText={setTitle}
          placeholder={t('goals.title')}
          validationOptions={{
            required: [true, 'Title is required'],
            minLength: [3, 'Title must be at least 3 characters'],
          }}
        />

        <SafeAreaView>
          <ThemedText
            type={TextType.FootnoteSemibold}
            color={TextColor.Primary}
            style={styles.label}
          >
            {t('goals.desireddate')}
          </ThemedText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Pressable onPress={showDatepicker} style={[styles.button]}>
              <Fontisto name='date' size={20} color={BrandColor.PrimaryColor[400]} />
              <View style={{ flex: 3 }}>
                <Text>{formatDate(new Date(desiredDate), 'dd/mm/yy')}</Text>
              </View>
              <ChevronDown width={24} height={24} color={TextColor.Placeholder} />
            </Pressable>
          </View>
          <View style={styles.datePicker}>
            {show && (
              <RNDateTimePicker
                testID='dateTimePicker'
                value={new Date(desiredDate)}
                mode={mode}
                display='spinner'
                is24Hour={true}
                onChange={onChange}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
      <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
        <Button
          text={t('goals.delete')}
          textColor={BackgroundColor.LightTheme.Primary}
          type='primary'
          state='normal'
          size='large'
          style={{ backgroundColor: BrandColor.Red[400] }}
          onPress={onDelete}
          buttonLeft={() => (
            <Image
              source={require('@/src/assets/icons/recycle-bin.png')}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          )}
        />
      </View>
    </View>
  )
}
export default EditGoal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    paddingHorizontal: 24,
  },
  amountLabel: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: BrandColor.Gray[200],
  },
  amount: {
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: screenWidth - 48,
    height: 150,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: BrandColor.Gray[300],
    marginBottom: 24,
  },
  amountText: {
    color: TextColor.Primary,
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '600',
    letterSpacing: -0.4,
  },
  datePicker: {
    maxHeight: screenHeight * 0.15,
  },
  button: {
    marginTop: 12,
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
  label: {
    position: 'absolute',
    top: -10,
    width: '100%',
    left: 12,
  },
})
