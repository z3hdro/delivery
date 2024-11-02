import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLang, defaultNS, SUPPORTED_LANGUAGES, supportedLngs } from 'constants/language';
import russian from './translations/ru.json';
import { Translations } from 'localization/types';

void i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  //language to use if translations in user language are not available
  fallbackLng: defaultLang,
  ns: defaultNS,
  defaultNS,
  supportedLngs,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export const langResources: Translations = {
  [SUPPORTED_LANGUAGES.RU]: russian
} as const;

supportedLngs.forEach(lang => {
  i18next.addResourceBundle(lang, defaultNS, langResources[lang], true, true );
});

export { i18next };
