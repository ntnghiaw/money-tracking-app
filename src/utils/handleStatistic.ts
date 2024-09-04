import { Transaction } from '@/src/types/enum'

export const handleStatistic = (
  transactions: Transaction[]
): {
  total: number
  data: {
    name: string
    amount: number
    percentage: number
  }[]
} => {
  if (!transactions)
    return {
      total: 0,
      data: [],
    }
  // filter categories
  const categories = transactions.map((transaction) => JSON.stringify(transaction.category))
  const setOfCategories = [...new Set(categories)]
  const filterCategories = setOfCategories.map((category) => ({
    name: JSON.parse(category).name,
    amount: 0,
  }))

  // calculate amount of each category and total amount
  let total = 0
  transactions.forEach((transaction) => {
    const index = filterCategories.findIndex(
      (category) => category.name === transaction.category.name
    )
    filterCategories[index].amount += transaction.amount
    total += transaction.amount
  })

  // calculate percentage
  const result = filterCategories.map((category) => ({
    name: category.name,
    amount: category.amount,
    percentage: Number(((category.amount / total) * 100).toFixed(1)),
  }))

  // limit to 4 categories
  if (result.length > 4) {
    // sort by percentage -> descending
    const mainCates = result.sort((a, b) => b.percentage - a.percentage).slice(0, 3)
    const othersCategory = result.sort((a, b) => b.percentage - a.percentage).slice(3)
    mainCates.push({
      name: 'Others',
      amount: othersCategory.reduce((pre, cur) => pre + cur.amount, 0),
      percentage: Number(
        (100 - mainCates.reduce((pre, cur) => pre + cur.percentage, 0)).toFixed(1)
      ),
    })
    return {
      total,
      data: mainCates,
    }
  }

  // sort by percentage -> descending
  return {
    total,
    data: result.sort((a, b) => b.percentage - a.percentage),
  }
}
