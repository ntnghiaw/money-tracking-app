import { abbrValue } from "react-native-currency-input-fields"
import { getCurrencySymbol } from "./getCurrencySymbol"
import { useLocale } from "@/src/hooks/useLocale"


export const abbrValueFormat = (value: number, showCurrency?: boolean, currencyCode?: string) => {
 const roundedDigits = Math.pow(10, Math.floor(Math.log10(value)) - 3)
 const newValue = Math.round(value / roundedDigits) * roundedDigits
 return `${abbrValue(newValue, '.', 2)} ${showCurrency ? getCurrencySymbol(currencyCode ?? 'VND') : ''}`
}