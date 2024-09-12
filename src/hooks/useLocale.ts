import { useTranslation } from 'react-i18next'
import { LocalizationContext } from '@/src/contexts/LocalizationContext'
import { useContext } from 'react'

export const useLocale = () => {
  const { currentLanguage, changeLanguage } = useContext(LocalizationContext)
  const { t } = useTranslation()
  return { currentLanguage, changeLanguage, t }
}
