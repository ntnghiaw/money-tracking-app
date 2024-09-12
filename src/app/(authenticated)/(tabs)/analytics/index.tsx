import InfoButton from '@/src/components/buttons/InfoButton'
import TabButtons, { TabButtonType } from '@/src/components/navigation/TabButtons'
import { ThemedText } from '@/src/components/ThemedText'
import TransactionItem from '@/src/components/TransactionItem'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useCurrency } from '@/src/hooks/useCurrency'
import { useLocale } from '@/src/hooks/useLocale'
import { TextType } from '@/src/types/text'
import { formatter } from '@/src/utils/formatAmount'
import { Href, Link, Stack } from 'expo-router'
import { useRouter } from 'expo-router'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Dimensions, Image, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Plus } from 'react-native-feather'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomizedModalView from '@/src/components/modals/CustomizedModalView'
import Input from '@/src/components/Input'

const screenWidth = Dimensions.get('window').width

export enum CustomTab {
  Tab1,
  Tab2,
}

const Page = () => {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.Tab1)

  const { t } = useLocale()
  const { currentCurrency } = useCurrency()
  const buttons: TabButtonType[] = [
    { title: t('analytics.income') },
    { title: t('analytics.expense') },
  ]

  //   const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  //   const bottomSheetChooseIconModalRef = useRef<BottomSheetModal>(null)

  //   const snapPoints = useMemo(() => ['50%'], [])
  //   const snapPointsChooseIcon = useMemo(() => ['45%'], [])

  //   const renderBackdrop = useCallback(
  //     (props: any) => (
  //       <BottomSheetBackdrop
  //         {...props}
  //         opacity={0.3}
  //         appearsOnIndex={0}
  //         disappearsOnIndex={-1}
  //         pressBehavior='collapse'
  //         onPress={() => bottomSheetModalRef.current?.dismiss()}
  //       />
  //     ),
  //     []
  //   )
  //    const renderBackdropChooseIcon = useCallback(
  //      (props: any) => (
  //        <BottomSheetBackdrop
  //          {...props}
  //          opacity={0.3}
  //          appearsOnIndex={0}
  //          disappearsOnIndex={-1}
  //          pressBehavior='collapse'
  //          onPress={() => bottomSheetModalRef.current?.dismiss()}
  //        />
  //      ),
  //      []
  //    )
  // const showChooseIconModal = async () => {
  //   bottomSheetChooseIconModalRef.current?.present()
  // }
  //   const showModal = async () => {
  //     bottomSheetModalRef.current?.present()
  //   }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 14 }}>
        <TabButtons buttons={buttons} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </View>
      <View style={[styles.chartSection]}></View>
      <View>
        <InfoButton
          title={t('analytics.addnewcategories')}
          icon={() => <Image source={require('@/src/assets/icons/grid.png')} />}
          buttonRight={() => <Plus width={20} height={20} color={BrandColor.PrimaryColor[400]} />}
          description={t('analytics.descriptioncategories')}
          onPress={() => router.push('/(authenticated)/(tabs)/analytics/create-category')}
        />
      </View>
      <View style={styles.historySection}>
        <View style={styles.headerSection}>
          <ThemedText type={TextType.CalloutSemibold} color={TextColor.Primary}>
            {t('home.history')}
          </ThemedText>
          <Link href='/(authenticated)/(tabs)/home/history' asChild>
            <Text style={styles.link}>{t('home.seeall')}</Text>
          </Link>
        </View>
        <View>
          {/* {recentTransactions?.length === 0 && (
              <ThemedText
                type={TextType.FootnoteRegular}
                color={TextColor.Secondary}
                style={{ textAlign: 'center', marginTop: 30 }}
              >
                {t(`home.notransactions`)}
              </ThemedText>
            )} */}
          <TransactionItem
            title='Supermarket'
            category='Groceries'
            amount={200000}
            date='12 June 2024'
            img={() => <Image source={require('@/src/assets/icons/cart.png')} />}
          />
        </View>
      </View>
      {/* <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <CustomizedModalView
          headerLabel={t('analytics.addnewcategories')}
          buttonText={t('analytics.addcategories')}
          onPress={() => console.log('add')}
        >
          <View style={{ paddingVertical: 24, gap: 24 }}>
            <TabButtons
              buttons={buttons}
              selectedTab={selectedCategoryType}
              setSelectedTab={setSelectedCategoryType}
            />
            <TouchableOpacity style={[styles.icon, { alignSelf: 'center' }]} onPress={() => showChooseIconModal()}>
              <Image source={require('@/src/assets/icons/smile.png')} style={styles.img} />
            </TouchableOpacity>
            <Input
              placeholder={t('analytics.categoryname')}
              validationOptions={{
                required: [true, 'Name is required'],
                minLength: [3, 'Name must be at least 3 characters'],
                pattern: [/^[a-zA-Z0-9\s]+$/, 'Name must be alphanumeric'],
              }}
            />
          </View>
        </CustomizedModalView>
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetChooseIconModalRef}
        index={0}
        snapPoints={snapPointsChooseIcon}
        backdropComponent={renderBackdropChooseIcon}
        handleComponent={null}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <CustomizedModalView
          headerLabel={t('analytics.addnewcategories')}
          buttonText={t('analytics.addcategories')}
          onPress={() => console.log('add')}
        >
          <View style={{ paddingVertical: 24, gap: 24 }}>
            <TabButtons
              buttons={buttons}
              selectedTab={selectedCategoryType}
              setSelectedTab={setSelectedCategoryType}
            />
            <TouchableOpacity style={[styles.icon, { alignSelf: 'center' }]}>
              <Image source={require('@/src/assets/icons/smile.png')} style={styles.img} />
            </TouchableOpacity>
            <Input
              placeholder={t('analytics.categoryname')}
              validationOptions={{
                required: [true, 'Name is required'],
                minLength: [3, 'Name must be at least 3 characters'],
                pattern: [/^[a-zA-Z0-9\s]+$/, 'Name must be alphanumeric'],
              }}
            />
          </View>
        </CustomizedModalView>
      </BottomSheetModal> */}
    </View>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: BackgroundColor.LightTheme.Primary,
  },
  chartSection: {
    width: '100%',
    // height: 250,
    marginVertical: 20,
  },
  historySection: {
    marginTop: 18,
    gap: 6,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#2A85FF',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.4,
    textTransform: 'capitalize',
  },

})
