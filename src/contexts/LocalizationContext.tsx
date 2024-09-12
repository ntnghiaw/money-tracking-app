import i18next from 'i18next'
import React, { createContext, useEffect, useState } from 'react'
import { StorageService } from '../services/storage.service'
import { getLocales, getCurrencies } from 'react-native-localize'
const USER_LANGUAGE_KEY = 'USER_LANGUAGE'
const USER_CURRENCY_KEY = 'USER_CURRENCY'

export const LocalizationContext = createContext({
  currentLanguage: 'en',
  changeLanguage: (_lng: string) => {},
  currentCurrency: 'USD',
  changeCurrency: (_currency: string) => {},
})

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language ?? 'en')
  const [currentCurrency, setCurrentCurrency] = useState('USD')

  const changeLanguage = async (lng: string) => {
    setCurrentLanguage(lng)
    i18next.changeLanguage(lng)
    await StorageService.setItem(USER_LANGUAGE_KEY, lng)
  }

  const changeCurrency = async (currency: string) => {
    setCurrentCurrency(currency)
    await StorageService.setItem(USER_CURRENCY_KEY, currency)
  }

  useEffect(() => {
    const getUserLocale = async () => {
      const userLocale = await StorageService.getMultipleItems([
        USER_LANGUAGE_KEY,
        USER_CURRENCY_KEY,
      ]) 
      if (Array.isArray(userLocale)) {
        setCurrentLanguage(userLocale[0])
        setCurrentCurrency(userLocale[1] ?? 'USD')
        i18next.changeLanguage(userLocale[0])
      }
    }
    getUserLocale()
  }, [])

  return (
    <LocalizationContext.Provider
      value={{ currentLanguage, changeLanguage, currentCurrency, changeCurrency }}
    >
      {children}
    </LocalizationContext.Provider>
  )
}
