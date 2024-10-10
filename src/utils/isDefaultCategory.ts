import categoriesDefault from '@/constants/Categories'


export const isDefaultCategory = (categoryName: string): boolean => {
  return categoriesDefault.includes(categoryName)
}