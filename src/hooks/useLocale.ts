import { useTranslation } from 'react-i18next';
import { TranslationContext } from '../contexts/TranslationContext';
import { useContext } from 'react';


export const useLocale = () => {
  const { currentLanguage, changeLanguage } = useContext(TranslationContext);
  const {t} = useTranslation();
  return { currentLanguage, changeLanguage, t };
}