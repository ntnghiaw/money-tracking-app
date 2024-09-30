import { Transaction } from '@/src/types/enum'
import {
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  setYear,
  startOfMonth,
  startOfQuarter,
  startOfYear,
} from 'date-fns'
import { BrandColor } from '@/src/constants/Colors'
import { handleStatistic } from '@/src/utils/handleStatistic'

interface DataBarChart {
  value: number
  label: string
}

interface DataFormat {
  [key: string]: number
}

interface DataGroupedBarChart {
  value: number
  label?: string
  spacing?: number
  labelWidth?: number
  labelTextStyle?: object
  frontColor: string
}

interface DataPieChart {
  value: number
  color: string
  gradientCenterColor: string
  focused?: boolean
  text?: string
}

/**
 * rawData: Array<Transaction>
 * filter: 'day' | 'week' | 'month' | 'year'
 * return Array<{
 *  value: number,
 * label: string
 * }>
 *
 */

const formatBarChart = (rawData: Array<Transaction>, filter: string): Array<DataBarChart> => {
  if (!rawData) return []
  switch (filter) {
    case 'day': {
      let result = [
        {
          label: '0-2h',
          value: 0,
        },
        {
          label: '2-4h',
          value: 0,
        },
        {
          label: '4-6h',
          value: 0,
        },
        {
          label: '6-8h',
          value: 0,
        },
        {
          label: '8-10h',
          value: 0,
        },
        {
          label: '10-12h',
          value: 0,
        },
        {
          label: '12-14h',
          value: 0,
        },
        {
          label: '14-16h',
          value: 0,
        },
        {
          label: '16-18h',
          value: 0,
        },
        {
          label: '18-20h',
          value: 0,
        },
        {
          label: '20-22h',
          value: 0,
        },
        {
          label: '22-24h',
          value: 0,
        },
      ]
      const grouped = rawData.forEach((item) => {
        const hour = format(new Date(item.createdAt), 'H') // => '0', '1', '2', ... '23'
        const index = Math.floor(parseInt(hour) / 2)
        result[index].value += item.amount
      })

      return result
    }

    case 'week': {
      let result = {
        Mo: 0,
        Tu: 0,
        We: 0,
        Th: 0,
        Fr: 0,
        Sa: 0,
        Su: 0,
      } as DataFormat
      const grouped = rawData.forEach((item) => {
        const key = format(new Date(item.createdAt), 'cccccc') // => Mo, Tu, We, Th, Fr, Sa, Su
        result[key] += item.amount
      })
      return Object.entries(result).map(([key, value]) => ({ label: key, value }))
    }

    case 'month': {
      const result = eachWeekOfInterval(
        {
          start: startOfMonth(new Date()),
          end: endOfMonth(new Date()),
        },
        { weekStartsOn: 1 }
      ).map((week) => {
        let total = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= week && new Date(item.createdAt) < endOfWeek(week)) {
            total += item.amount
          }
        })
        return {
          label: format(week, 'dd/MM'),
          value: total,
        }
      })
      return result
    }
    case 'quarter': {
      const result = eachQuarterOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).map((quarter) => {
        let total = 0
        rawData.forEach((item) => {
          if (
            new Date(item.createdAt) >= quarter &&
            new Date(item.createdAt) < endOfQuarter(quarter)
          ) {
            total += item.amount
          }
        })
        return {
          label: format(quarter, 'MMMM'),
          value: total,
        }
      })
      return result
    }
    case 'year': {
      const result = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).map((month) => {
        let total = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= month && new Date(item.createdAt) < endOfMonth(month)) {
            total += item.amount
          }
        })
        return {
          label: format(month, 'MMMMM'),
          value: total,
        }
      })
      return result
    }
    case 'all': {
      const curYear = new Date().getFullYear()
      const result = eachYearOfInterval({
        start: startOfYear(setYear(new Date(), curYear - 7)),
        end: endOfYear(new Date()),
      }).map((year) => {
        let total = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= year && new Date(item.createdAt) < endOfYear(year)) {
            total += item.amount
          }
        })
        return {
          label: format(year, 'yyyy'),
          value: total,
        }
      })
      return result
    }
    default: {
      return []
    }
  }
}

const formartGroupedBarChart = (
  rawData: Array<Transaction>,
  filter: string
): Array<DataGroupedBarChart> => {
  if (!rawData) return []
  switch (filter) {
    case 'month': {
      const result = eachWeekOfInterval(
        {
          start: startOfMonth(new Date()),
          end: endOfMonth(new Date()),
        },
        { weekStartsOn: 1 }
      ).map((week) => {
        let totalExpense = 0
        let totalIncome = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= week && new Date(item.createdAt) < endOfWeek(week)) {
            if (item.type === 'expense') {
              totalExpense += item.amount
            } else {
              totalIncome += item.amount
            }
          }
        })
        return [
          {
            value: totalIncome,
            label: format(week, 'dd/MM'),
            spacing: 2,
            labelWidth: 36,
            labelTextStyle: { color: BrandColor.Gray[600], fontSize: 13, textAlign: 'center' },
            frontColor: BrandColor.PrimaryColor[400],
          },
          {
            value: totalExpense,
            frontColor: BrandColor.Red[300],
          },
        ]
      })
      return result.flat()
    }

    case 'quarter': {
      const result = eachQuarterOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).map((quarter) => {
        let totalExpense = 0
        let totalIncome = 0
        rawData.forEach((item) => {
          if (
            new Date(item.createdAt) >= quarter &&
            new Date(item.createdAt) < endOfQuarter(quarter)
          ) {
            if (item.type === 'expense') {
              totalExpense += item.amount
            } else {
              totalIncome += item.amount
            }
          }
        })
        return [
          {
            value: totalIncome,
            label: format(quarter, 'MMMM'),
            spacing: 2,
            labelWidth: 50,
            labelTextStyle: { color: BrandColor.Gray[600], fontSize: 12 },
            frontColor: BrandColor.PrimaryColor[400],
          },
          {
            value: totalExpense,
            frontColor: BrandColor.Red[300],
          },
        ]
      })
      return result.flat()
    }

    case 'year': {
      const result = eachMonthOfInterval({
        start: startOfYear(new Date()),
        end: endOfYear(new Date()),
      }).map((month) => {
        let totalExpense = 0
        let totalIncome = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= month && new Date(item.createdAt) < endOfMonth(month)) {
            if (item.type === 'expense') {
              totalExpense += item.amount
            } else {
              totalIncome += item.amount
            }
          }
        })
        return [
          {
            value: totalIncome,
            label: format(month, 'LLL'),
            spacing: 2,
            labelWidth: 36,
            labelTextStyle: { color: BrandColor.Gray[600], fontSize: 12 },
            frontColor: BrandColor.PrimaryColor[400],
          },
          {
            value: totalExpense,
            frontColor: BrandColor.Red[300],
          },
        ]
      })
      return result.flat()
    }

    case 'all': {
      const curYear = new Date().getFullYear()
      const result = eachYearOfInterval({
        start: startOfYear(setYear(new Date(), curYear - 5)),
        end: endOfYear(new Date()),
      }).map((year) => {
        let totalExpense = 0
        let totalIncome = 0
        rawData.forEach((item) => {
          if (new Date(item.createdAt) >= year && new Date(item.createdAt) < endOfYear(year)) {
            if (item.type === 'expense') {
              totalExpense += item.amount
            } else {
              totalIncome += item.amount
            }
          }
        })
        return [
          {
            value: totalIncome,
            label: format(year, 'yyyy'),
            spacing: 2,
            labelWidth: 30,
            labelTextStyle: { color: BrandColor.Gray[600], fontSize: 12 },
            frontColor: BrandColor.PrimaryColor[400],
          },
          {
            value: totalExpense,
            frontColor: BrandColor.Red[300],
          },
        ]
      })
      return result.flat()
    }
    default: {
      return []
    }
  }
}
const colors = [
  BrandColor.Blue[500],
  BrandColor.Blue[300],
  BrandColor.PrimaryColor[200],
  BrandColor.Red[100],
  BrandColor.Red[500],
]
const gradientCenterColors = [
  BrandColor.Blue[600],
  BrandColor.Blue[400],
  BrandColor.PrimaryColor[300],
  BrandColor.Red[300],
  BrandColor.Yellow[600],
]

const formatPieChart = (rawData: Transaction[]): DataPieChart[] => {
  if (!rawData) return []
  const { total, data } = handleStatistic(rawData)
  const result = data.map((item, index) => {
    return {
      focused : index === 0,
      value: item.percentage,
      color: colors[index],
      gradientCenterColor: gradientCenterColors[index],
      text: item.name,
      id: item.id
    }
  })
  return result
}

export { formatBarChart, formartGroupedBarChart, formatPieChart }
