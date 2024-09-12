import { useTranslation } from 'react-i18next'
import { LocalizationContext } from '@/src/contexts/LocalizationContext'
import { useContext } from 'react'

export const useCurrency = () => {
  const { currentCurrency, changeCurrency } = useContext(LocalizationContext)
  return { currentCurrency, changeCurrency }
}
