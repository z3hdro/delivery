import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLang, defaultNS, SUPPORTED_LANGUAGES, supportedLngs } from 'constants/language';
import russian from './translations/ru.json';
import { Translations } from 'localization/types';

void i18n.use(initReactI18next).init({
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

const langResources: Translations = {
  [SUPPORTED_LANGUAGES.RU]: russian
};

supportedLngs.forEach(lang => {
  i18n.addResourceBundle(lang, defaultNS, langResources[lang], true, true );
});

export { i18n };