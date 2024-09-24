import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { SettingsContext } from '@/src/contexts/SettingsContext'

export const useSettings = () => {
  const {
   PIN,
   setPIN,
   styleMoneyLabel,
   setStyleMoneyLabel,
   timeFormat,
   changeTimeFormat,
   firstDayOfWeek,
   changeFirstDayOfWeek,
   dailyReminder,
   toggleDailyReminder,
   dailyReminderTime,
   setDailyReminderTime

  } = useContext(SettingsContext)
  return {
    PIN,
    setPIN,
    styleMoneyLabel,
    setStyleMoneyLabel,
    timeFormat,
    changeTimeFormat,
    firstDayOfWeek,
    changeFirstDayOfWeek,
    dailyReminder,
    toggleDailyReminder,
    dailyReminderTime,
    setDailyReminderTime
  }
}
