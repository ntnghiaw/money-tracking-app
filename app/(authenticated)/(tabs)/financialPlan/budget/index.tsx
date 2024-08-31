import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'
import { useGetAllPlansQuery, useDeletePlanMutation } from '@/features/wallet/wallet.service'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import Button from '@/components/Button'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Colors } from '@/constants/Colors'
import { Circle, Edit, MoreHorizontal, Plus, PlusCircle, X } from 'react-native-feather'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Href, useRouter } from 'expo-router'
import { Link } from 'expo-router'
import { FinancialPlanType } from '@/types/enum'
import { formatter } from '@/utils/formatAmount'

const Page = () => {
  const router = useRouter()
  const { bottom } = useSafeAreaInsets()
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null)

  const { tokens, userId, walletId } = useAppSelector((state) => state.auth)
  const { currentCurrency: currency } = useAppSelector((state) => state.wallets)
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['33%'], [])
  const { data: plans } = useGetAllPlansQuery({
    walletId,
    auth: {
      accessToken: tokens.accessToken,
      userId: userId,
    },
  })
  console.log(plans)

  const [detelePlan] = useDeletePlanMutation()

  const showBottomSheet = () => {
    bottomSheetModalRef.current?.present()
  }

  const hideBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss()
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

  const handleDeletePlan = async (id: string) => {
   try {
     await detelePlan({
       walletId,
       planId: id,
       auth: {
         accessToken: tokens.accessToken,
         userId: userId,
       },
     })
     hideBottomSheet()
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        {plans?.metadata.length === 0 && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>No budgets</Text>
          </View>
        )}

        <ScrollView style={{ paddingHorizontal: 16, flex: 1 }}>
          {plans?.metadata.map((plan) => (
            <TouchableOpacity
              key={plan._id}
              style={styles.item}
              onPress={() => {
                setSelectedBudgetId(plan._id)
                router.push({
                  pathname: '/(authenticated)/(tabs)/financialPlan/budget/budgetDetails',
                  params: { id: plan._id },
                })
              }}
            >
              <View style={[styles.headerItem, { width: '100%' }]}>
                <Image
                  source={{
                    uri:
                      plan?.type === FinancialPlanType.Budget && 'categories' in plan.attributes
                        ? plan.attributes.categories.icon
                        : '',
                  }}
                  style={{ height: 24, width: 24 }}
                />
                <View>
                  <Text style={styles.nameText}>{plan.name}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.gray,
                      fontWeight: '500',
                      letterSpacing: 1,
                    }}
                  >{`${new Date(plan.attributes.start_date).toLocaleDateString()} - ${new Date(
                    plan.attributes.due_date
                  ).toLocaleDateString()}`}</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedBudgetId(plan._id)
                    showBottomSheet()
                  }}
                  style={{
                    position: 'absolute',
                    right: -12,
                    top: -12,
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MoreHorizontal width={24} height={24} color={Colors.black} />
                </TouchableOpacity>
              </View>

              <View style={styles.itemContent}>
                <View style={styles.itemAmount}>
                  <Text
                    style={{
                      color: Colors.black,
                      fontSize: 14,
                      letterSpacing: 1,
                      fontWeight: '500',
                    }}
                  >
                    {' '}
                    {formatter(plan.attributes.target_amount, currency)}
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.currentAmount,
                      {
                        width: `${Number(
                          (plan.attributes.spent_amount * 100) / plan.attributes.target_amount
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <View style={styles.status}>
                  <Text style={{ color: Colors.gray, fontWeight: '400' }}>
                    {`${Math.round(
                      Math.abs(
                        (new Date(plan.attributes.start_date).getTime() -
                          new Date(plan.attributes.due_date).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    )} days left`}
                  </Text>
                  <Text style={{ color: Colors.gray, fontWeight: '400' }}>
                    {`${Math.round(
                      (plan.attributes.spent_amount * 100) / plan.attributes.target_amount
                    )} %`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={[styles.button, { position: 'absolute', right: 40, bottom: bottom }]}>
          <Link href={'/(authenticated)/(tabs)/financialPlan/budget/[id]' as Href} asChild>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                backgroundColor: Colors.primary,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* <Text style={{fontSize: 16, letterSpacing: 2, textTransform: 'capitalize', color: 'white', fontWeight: '500'}}>New budget</Text> */}
              <Plus width={40} height={40} color={'white'} />
            </TouchableOpacity>
          </Link>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          backdropComponent={renderBackdrop}
          snapPoints={snapPoints}
          handleComponent={null}
          enableOverDrag={false}
          enablePanDownToClose
        >
          <BottomSheetView style={{ flex: 1 }}>
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
                onPress={() => hideBottomSheet()}
              >
                <X width={24} height={24} color={Colors.gray} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonControl}>
              <Link
                href={{
                  pathname: '/(authenticated)/(tabs)/financialPlan/budget/[id]',
                  params: { id: selectedBudgetId },
                }}
                asChild
                style={[styles.btn]}
              >
                <TouchableOpacity onPress={hideBottomSheet}>
                  <Edit width={24} height={24} color={Colors.black} />
                  <Text style={{ fontSize: 16, padding: 12, width: '40%' }}>Edit wallet</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleDeletePlan(selectedBudgetId)}
              >
                <MaterialCommunityIcons name='delete-outline' size={24} color={'red'} />
                <Text style={{ fontSize: 16, padding: 12, color: 'red', width: '40%' }}>
                  Delete budget
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
  },
  btn: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 12,
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  item: {
    height: 140,
    backgroundColor: 'white',
    marginTop: 12,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    // justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  headerItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    letterSpacing: 2,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  itemContent: {
    width: '100%',
    gap: 12,
  },
  itemAmount: {
    alignSelf: 'flex-end',
  },
  progressBar: {
    height: 12,
    width: '100%',
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
  },
  currentAmount: {
    height: 12,
    borderRadius: 8,
    backgroundColor: '#49F064',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
