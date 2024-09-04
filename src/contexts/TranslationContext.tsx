import i18next from 'i18next'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { StorageService } from '../services/storage.service'

const USER_LANGUAGE_KEY = 'USER_LANGUAGE'

export const TranslationContext = createContext({
  currentLanguage: 'en',
  changeLanguage: (_lng: string) => {},
})

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18next.language ?? 'en')

  const changeLanguage = async (lng: string) => {
    setCurrentLanguage(lng)
    i18next.changeLanguage(lng)
    await StorageService.setItem(USER_LANGUAGE_KEY, lng)
  }

  useEffect(() => {
    const getUserLanguage = async () => {
      const userLanguague = await StorageService.getItem(USER_LANGUAGE_KEY)
      if (userLanguague) {
        setCurrentLanguage(userLanguague)
        i18next.changeLanguage(userLanguague)
      }
    }
    getUserLanguage()
  }, [])

  return (
    <TranslationContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
}
