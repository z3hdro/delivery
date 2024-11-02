import { langResources,  } from 'localization/i18n.config';
import { defaultNS, SUPPORTED_LANGUAGES } from 'constants/language';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: typeof langResources[SUPPORTED_LANGUAGES.RU];
  }
}
