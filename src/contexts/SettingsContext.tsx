import { t } from "i18next";
import { createContext, useState } from "react";
import { getCurrencies, getLocales } from "react-native-localize";

export const SettingsContext = createContext({
  timeFormat: 'dd/mm/yyyy',
  changeTimeFormat: (_format: string) => {},
  firstDayOfWeek: 0,
  changeFirstDayOfWeek: (_day: number) => {},
  dailyReminder: false,
  toggleDailyReminder: () => {},
  dailyReminderTime: '08:00',
  setDailyReminderTime: (_time: string) => {},
  PIN: '',
  setPIN: (_pin: string) => {},
  styleMoneyLabel: {
    shortenAmount: false,
    showCurrency: true,
    disableDecimal: false,
    decimalSeparator: '.',
    groupSeparator: ',',
  },
  setStyleMoneyLabel: (_style: any) => {},


})


export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeFormat, setTimeFormat] = useState('dd/mm/yyyy');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState(0);
  const [dailyReminder, setDailyReminder] = useState(false);
  const [dailyReminderTime, setDailyReminderTime] = useState('08:00');
  const [PIN, setPIN] = useState('');
  const [styleMoneyLabel, setStyleMoneyLabel] = useState({
    shortenAmount: false,
    showCurrency: true,
    disableDecimal: false,
    decimalSeparator: '.',
    groupSeparator: ',',
  });

  const changeTimeFormat = (format: string) => {
    setTimeFormat(format);
  }

  const changeFirstDayOfWeek = (day: number) => {
    setFirstDayOfWeek(day);
  }

  const toggleDailyReminder = () => {
    setDailyReminder((prev) => !prev);
  }

  return (
    <SettingsContext.Provider value={{
      timeFormat,
      changeTimeFormat,
      firstDayOfWeek,
      changeFirstDayOfWeek,
      dailyReminder,
      toggleDailyReminder,
      dailyReminderTime,
      setDailyReminderTime,
      PIN,
      setPIN,
      styleMoneyLabel,
      setStyleMoneyLabel,
    }}>
      {children}
    </SettingsContext.Provider>
  )
}