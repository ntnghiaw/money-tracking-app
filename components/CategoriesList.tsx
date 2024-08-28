import { Category, SubCategory } from '@/types/enum'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CategoryItem from './CategoryItem'
import { IconColor } from '@/constants/Colors'
interface CategoryListProps {
  categories: Array<Category>

}

const titleColors = ['#ffb329', '#949021', '#a7c1fc', '#63ca83']

const CategoriesList = (props: CategoryListProps) => {
  return (
    <>
      {props.categories.map((category, index) => {
        return (
          <View>
            <View style={[styles.title, {backgroundColor: titleColors[index], opacity: 0.5}]}>
              <Icon name='home' size={32} color={titleColors[index]} />
              <Text style={[styles.titleText, {color: titleColors[index]}]}>{category.name}</Text>
            </View>
            <View style={styles.inner}>
               {category.sub_categories.map((subCategory: SubCategory) => {
                 return <View style={styles.item}>
                  <Icon name={subCategory.icon} size={24} color={IconColor[subCategory.icon]} />
                  <Text style={styles.itemText}>{subCategory.name}</Text>
               </View>
               })}
            </View>
          </View>
        )
      })}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: 12,
  },
  title: {
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  titleText: {
   fontSize: 18,
   fontWeight: '500',
   letterSpacing: 1
  },
  inner: {
   flexWrap: 'wrap',
   flexDirection: 'row',
   paddingHorizontal: 16,
   gap: 16,
   alignItems: 'center',
  },
  item: {
   gap: 8,
   justifyContent: 'center',
   alignItems: 'center'
  },
  itemText: {
    fontSize: 16,
  },
})

export default CategoriesList