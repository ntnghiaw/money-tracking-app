// import { useRouter } from 'expo-router'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { MaterialCommunityIcons } from '@expo/vector-icons'
// const Statistic = () => {
//   const router = useRouter()
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={[styles.item, { marginTop: 20 }]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-line' size={32} color={'#50C474'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Financial Analysis</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.item]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-bar' size={32} color={'#699BF7'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Expense vs Income</Text>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={[styles.item]} onPress={() => console.log(1)}>
//         <View style={styles.icon}>
//           <MaterialCommunityIcons name='chart-bar' size={32} color={'#FF810D'} />
//         </View>
//         <View>
//           <Text style={styles.itemText}>Income Analysis</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   item: {
//     flexDirection: 'row',
//     padding: 16,
//     height: 72,
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   icon: {
//     width: 54,
//     height: 54,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F6F6F6',
//     borderRadius: 4,
//   },
//   itemText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: 'black',
//     marginLeft: 16,
//     letterSpacing: 1,

//   }
// })
// export default Statistic

import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { ThemedText } from '@/src/components/ThemedText'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { AntDesign, Fontisto } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { useCreatePlanMutation, useGetAllPlansQuery } from '@/src/features/plan/plan.service'
import { useAppSelector } from '@/src/hooks/hooks'
import { TextType } from '@/src/types/text'
import { use } from 'i18next'
import { useCallback, useMemo, useRef, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import CustomizedModalView from '@/src/components/modals/CustomizedModalView'
import Input from '@/src/components/Input'
import { formatter } from '@/src/utils/formatAmount'
import MaskInput from 'react-native-mask-input'
import { useCurrency } from '@/src/hooks/useCurrency'
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import formatDate from '@/src/utils/formatDate'
import { ChevronDown } from 'react-native-feather'
import Slider from '@react-native-community/slider'
import { FinancialPlan } from '@/src/types/enum'
import ProgressBar from '@/src/components/charts/ProgressBar'
type AndroidMode = 'date' | 'time'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const Page = () => {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const { currentCurrency } = useCurrency()
  const { t } = useLocale()
  const { walletId } = useAppSelector((state) => state.auth)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [desiredDate, setDesiredDate] = useState(new Date().toString())
  const [mode, setMode] = useState<AndroidMode>('date')
  const [show, setShow] = useState(false)
  const { data: goals, isLoading } = useGetAllPlansQuery({
    walletId,
    type: 'goal',
  })

  const [createPlan, { data: createPlanResponse, isSuccess }] = useCreatePlanMutation()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['80%'], [])

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

  const showModal = async () => {
    bottomSheetModalRef.current?.present()
  }

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

  const showTimepicker = () => {
    showMode('time')
  }

  const handleCreatePlan = async () => {
    try {
      await createPlan({
        walletId,
        body: {
          type: 'goal',
          name: title,
          end_date: new Date(desiredDate).toString(),
          attributes: {
            target_amount: parseInt(amount.replace(/,/g, '')),
            current_amount: 0,
            records: [],
          },
        },
      }).unwrap()
      setTitle('')
      setAmount('')
      setDesiredDate(new Date().toString())
    } catch (error) {
      console.log('🚀 ~ handleCreatePlan ~ error:', error)
    }
    bottomSheetModalRef.current?.dismiss()
  }
  // const goals = data?.metadata || []
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: t('goals.header'),
          header: (props) => (
            <Header
              {...props}
              headerLeft={() => (
                <HeaderButton
                  onPress={() => router.back()}
                  type='btn'
                  button={() => <AntDesign name='arrowleft' size={24} color={TextColor.Primary} />}
                />
              )}
              headerRight={() => (
                <HeaderButton type='text' onPress={() => showModal()} text={t('goals.addnew')} />
              )}
            />
          ),
        }}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.scrollView}>
          {goals?.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t('goals.nogoals')}
              </ThemedText>
            </View>
          )}
          {goals?.map((goal: any, index: number) => {
            return (
              <TouchableOpacity
                key={goal._id}
                style={styles.item}
                onPress={() =>
                  router.push({
                    pathname: '/(authenticated)/(tabs)/goal/[id]',
                    params: { id: goal._id },
                  })
                }
              >
                <View style={styles.itemName}>
                  <ThemedText type={TextType.FootnoteRegular} color={TextColor.Secondary}>
                    {goal.name}
                  </ThemedText>
                </View>
                <ThemedText type={TextType.Title22Bold} color={TextColor.Primary}>
                  {formatter(goal.attributes.target_amount, currentCurrency)}
                </ThemedText>
                <View style={styles.outer}>
                  <View
                    style={[
                      styles.inner,
                      {
                        width: `${
                          Math.round(
                            ((goal.attributes.current_amount || 0) * 100) / (goal.attributes.target_amount || 1)
                          ) >= 100
                            ? 100
                            : Math.round(
                                (goal.attributes.current_amount * 100) /
                                  goal.attributes.target_amount
                              )
                        }%`,
                      },
                    ]}
                  />
                </View>
                <ThemedText type={TextType.FootnoteRegular} color={TextColor.Secondary}>
                  {formatDate(new Date(goal.end_date), 'dd/mm/yy')}
                </ThemedText>
              </TouchableOpacity>
            )
          })}
        </View>
          <View style={{ height: 100 }}></View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <CustomizedModalView
          headerLabel={t('goals.addnewgoal')}
          onPress={handleCreatePlan}
          buttonText={t('goals.createnewgoal')}
        >
          <View style={{ marginTop: 14, gap: 14 }}>
            <Input
              placeholder={t('goals.titlegoal')}
              value={title}
              onChangeText={setTitle}
              validationOptions={{
                required: [true, 'Title is required'],
                minLength: [3, 'Title must be at least 3 characters'],
              }}
            />
            <View style={styles.goalCard}>
              <View style={styles.totalBalance}>
                <ThemedText color={TextColor.Secondary} type={TextType.FootnoteRegular}>
                  {t('home.totalbalance')}
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
              />
            </View>

            <SafeAreaView>
              <View style={{ position: 'absolute', left: 0, top: 4 }}></View>
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
        </CustomizedModalView>
      </BottomSheetModal>
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    // backgroundColor: BackgroundColor.LightTheme.Primary,
    flex: 1,
    paddingHorizontal: 24,
  },
  totalBalance: {
    minWidth: 102,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: BrandColor.Gray[200],
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
  scrollView: {
    marginTop: 12,
    width: screenWidth - 48,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  item: {
    width: '48%',
    height: 150,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    borderRadius: 14,
    marginVertical: 12,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    minWidth: '50%',
    alignItems: 'center',
    borderRadius: 25,
    borderColor: BrandColor.Gray[200],
    overflow: 'hidden',
  },
  goalCard: {
    gap: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: screenWidth - 48,
    height: 200,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BrandColor.Gray[300],
  },
  amountText: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.4,
    color: TextColor.Primary,
    textAlign: 'center',
  },
  outer: {
    backgroundColor: BrandColor.Gray[50],
    height: 14,
    width: '100%',
    borderRadius: 14,
  },
  inner: {
    backgroundColor: BrandColor.PrimaryColor[400],
    height: 14,
    borderRadius: 14,
  },
})
