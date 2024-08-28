import { Colors, IconColor } from '@/constants/Colors'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { X } from 'react-native-feather'
import { useGetAllCategoriesQuery } from '@/features/category/category.service'
import { useAppSelector } from '@/hooks/hooks'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

interface CategoriesProps {
  hideModal: () => void
}
const Categories = (props: CategoriesProps) => {
  const { tokens, userId } = useAppSelector((state) => state.auth)
  const { data, isLoading, isError, error } = useGetAllCategoriesQuery({
    accessToken: tokens?.accessToken,
    userId,
  })
  const categories = data?.metadata
  console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity style={styles.closeBtn} onPress={props.hideModal}>
          <X width={24} height={24} color={Colors.gray} />
        </TouchableOpacity>
      </View>
      <View style={styles.inner}>
        {categories?.map((category) => (
          <View>
            <Icons name={category.icon} size={24} color={IconColor[category.icon]} />
            <Text>{category.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}
export default Categories
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
  },
  closeBtn: {
    position: 'absolute',
    right: 24,
  },
  inner: {
    flex: 1,
  },
})
