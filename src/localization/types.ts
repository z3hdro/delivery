import { SUPPORTED_LANGUAGES } from 'constants/language';
import russian from './translations/ru.json';

export type Translation = typeof russian

export type Translations = Record<SUPPORTED_LANGUAGES, Translation>