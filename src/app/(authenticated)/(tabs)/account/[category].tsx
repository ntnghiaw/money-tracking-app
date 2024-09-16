import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Header from '@/src/components/navigation/Header'
import HeaderButton from '@/src/components/navigation/HeaderButton'
import { AntDesign } from '@expo/vector-icons'
import { BackgroundColor, BrandColor, TextColor } from '@/src/constants/Colors'
import { useLocale } from '@/src/hooks/useLocale'
import { useState, useMemo, useEffect } from 'react'
import categories from '@/src/constants/Categories'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import Input from '@/src/components/Input'
import { Category } from '@/src/types/enum'
import Button from '@/src/components/buttons/Button'
import { getImg } from '@/src/utils/getImgFromUri'
import {useUpdateCategoryMutation, useDeleteCategoryMutation} from '@/src/features/category/category.service'

const CategoryDetails = () => {
  const { t } = useLocale()
  const { category: id, icon, name, type } = useLocalSearchParams()
  const router = useRouter()
  const [editable, setEditable] = useState(false)
  const [category, setCategory] = useState<Partial<Category>>({
    name: '',
    icon: '',
  })
  const [showEdit, setShowEdit] = useState(true)
  const [updateCategory, {data ,isSuccess}] = useUpdateCategoryMutation()
  const [deleteCategory, {data: deletedCategory, isSuccess: isDeleted}] = useDeleteCategoryMutation()

  useEffect(() => {
    if(id&& icon&& name&& type)
    {
      setCategory({name: name.toString(), icon:icon.toString(), type:type.toString() === 'income' ? 'income' : 'expense'})
    }
  },[])
  useEffect(() => {
    if (data || deletedCategory) {
      router.back()
    }
  },[isSuccess, isDeleted])

  useMemo(() => {
    const category = categories.find((category) => category._id === id)
    if (category) {
      setShowEdit(false)
    }
  }, [])

  const onSelectIcon = () => {
    if (!editable) {
      return
    }
    router.push('/(authenticated)/(tabs)/analytics/icons')
  }

  const handleUpdateCategory = async () => {
    try {
      await updateCategory({
        id: id.toString(),
        body: {
          name: category.name,
          icon: category.icon,
        },
      })
    } catch (error) {
      console.log('error', error)
    }
    setEditable(false)
    setShowEdit(true)
  }

  const handleDeleteCategory = async () => {
    Alert.alert(t('settings.deletecategory'), t('settings.deletecategorymessage'), [
      {
        text: t('settings.cancel'),
        style: 'cancel',
      },
      {
        text: t('settings.delete'),
        onPress: async () => await deleteCategory(id.toString()),
        style: 'destructive',
      },
    ])
 
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: name?.toString() ?? t('settings.category'),
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
              headerRight={() => {
                return (
                  showEdit && (
                    <HeaderButton
                      onPress={() => {
                        setEditable(true)
                        setShowEdit(false)
                      }}
                      type='text'
                      text={t('settings.editcategory')}
                    />
                  )
                )
              }}
            />
          ),
        }}
      />
      <View style={{ paddingVertical: 24, gap: 24 }}>
        <TouchableOpacity
          style={[styles.icon, { alignSelf: 'center' }]}
          onPress={onSelectIcon}
          disabled={!editable}
        >
          {category?.icon ? (
            <Image source={getImg(category.icon)} style={styles.img} />
          ) : (
            <Image source={require('@/src/assets/icons/smile.png')} style={styles.img} />
          )}
        </TouchableOpacity>
        <Input
          placeholder={t('analytics.categoryname')}
          value={category?.name}
          onChangeText={(text) => setCategory((prev) => ({ ...prev, name: text }))}
          validationOptions={{
            required: [true, 'Name is required'],
            minLength: [3, 'Name must be at least 3 characters'],
          }}
          editable={editable}
        />
      </View>
      {editable && (
        <View style={{ marginTop: 40, gap: 14 }}>
          <Button
            type={'primary'}
            text={t('settings.savecategory')}
            size={'medium'}
            state={'normal'}
            onPress={handleUpdateCategory}
          />

          <Button
            type={'secondary'}
            text={t('settings.deletecategory')}
            size={'medium'}
            state={'normal'}
            textColor={BrandColor.Red[400]}
            onPress={handleDeleteCategory}
          />
        </View>
      )}
    </View>
  )
}
export default CategoryDetails
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor.LightTheme.Primary,
    paddingHorizontal: 24,
  },
  icon: {
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
