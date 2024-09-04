// import {
//   View,
//   Text,
//   Switch,
//   SafeAreaView,
//   StyleSheet,
//   StatusBar,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   Pressable,
//   ActivityIndicator,
//   Image,
// } from 'react-native'

// import React, { useEffect, useState, useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Dropdown } from 'react-native-element-dropdown'
// import { Check } from 'react-native-feather'
// import { useAppSelector, useAppDispatch } from '@/hooks/hooks'
// import { useGetAllCategoriesQuery } from '@/features/category/category.service'
// import { Category, SubCategory } from '@/types/enum'
// import { setCategory } from '@/features/category/categorySlice'
// import {
//   CategorieColors,
//   CategoryBGColors,
//   CategoryTitleColors,
//   Colors,
//   IconColor,
// } from '@/constants/Colors'
// import Loading from '@/components/Loading'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// const screenWidth = Dimensions.get('window').width
// const screenHeight = Dimensions.get('window').height

// // const filterCategoriesByType = (categories, type) => {
// //   return categories.filter((category) => {
// //     return category.type === type
// //   })
// // }

// interface ItemProps<T> {
//   item: T
// }

// const Item = ({ item }: ItemProps<Category>) => {
//   const router = useRouter()
//   const chooseCategoryHandler = (subCategory: SubCategory) => {
//     router.navigate({
//       pathname: '/(authenticated)/(tabs)/transaction',
//       params: {
//         _id: subCategory._id,
//         name: subCategory.name,
//         icon: subCategory.icon,
//         belong_to: subCategory.belong_to,
//       },
//     })
//   }
//   return (
//     <View style={styles.itemContainer}>
//       <View style={[styles.categoryHeader, { backgroundColor: CategoryBGColors[item.name] }]}>
//         <Image source={{ uri: item.icon }} style={{ height: 24, width: 24 }} />
//         <Text style={[styles.categoryText, { color: CategoryTitleColors[item.name] }]}>
//           {item.name}
//         </Text>
//       </View>
//       <View style={styles.subCate}>
//         {item.sub_categories.map((subCate) => (
//           <TouchableOpacity
//             key={subCate._id}
//             style={{
//               alignItems: 'center',
//               alignSelf: 'center',
//             }}
//             onPress={() => chooseCategoryHandler(subCate)}
//           >
//             <Icon name={subCate.icon} size={40} color={IconColor[subCate.icon]} />
//             <Text style={{ textAlign: 'center' }}>{subCate.name}</Text>

//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   )
// }

// const Categories = () => {
//   const params = useLocalSearchParams()
//   const { tokens, userId } = useAppSelector((state) => state.auth)
//   const { data, isLoading, isError, error } = useGetAllCategoriesQuery({
//     accessToken: tokens?.accessToken,
//     userId,
//   })
//   const categories = data?.metadata ?? []
//   const expenseCategories = useMemo(() => {
//     return categories.filter((category) => category.type === 'expense')
//   }, [categories])
//   console.log(expenseCategories)
//   function renderItem({ item }: { item: Category }) {
//     return <Item item={item} />
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ marginTop: 40 }}></View>
//       {data?.metadata.length !== 0 && (
//         <FlatList
//           data={expenseCategories ?? []}
//           keyExtractor={(item) => item.icon}
//           renderItem={renderItem}
//         ></FlatList>
//       )}
//     </SafeAreaView>
//   )
// }

// export default Categories

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   itemContainer: {
//     marginBottom: 24,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     marginHorizontal: 16,
//     padding: 2,
//     paddingBottom: 20,
//   },
//   categoryHeader: {
//     height: 32,
//     alignItems: 'center',
//     flexDirection: 'row',
//     gap: 10,
//     paddingHorizontal: 16,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   categoryText: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: Colors.black,
//   },
//   subCate: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     gap: 32,
//     minHeight: 90,
//     paddingVertical: 20,
//   },
// })


import { StyleSheet, Text, View } from 'react-native'
const categories = () => {
  return (
    <View>
      <Text>categories</Text>
    </View>
  )
}
export default categories
const styles = StyleSheet.create({})