import { Category } from '@/types/enum'
import { StyleSheet, Text, View } from 'react-native'

interface CategoryItemProps {
  item: Category
}


const CategoryItem = (props: CategoryItemProps) => {
  return (
    <View>
      <Text>CategoryItem</Text>
    </View>
  )
}
export default CategoryItem
const styles = StyleSheet.create({})