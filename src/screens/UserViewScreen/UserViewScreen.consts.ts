export const DISPLAY_DATE_FORMAT = 'dd.MM.yyyy';

export const EMPTY_PERSON = {
  phone: '',
  name: '',
  surname: '',
  patronymic: '',
  personInn: '',
  selfEmployed: false,
  individual: false,
  company: false,
  jobPosition: '',
  email: '',
  telegram: '',
};

export enum PERSON_KEYS {
  PHONE = 'phone',
  NAME = 'name',
  SURNAME = 'surname',
  PATRONYMIC = 'patronymic',
  PERSON_INN = 'personInn',
  JOB_POSITION = 'jobPosition',
  EMAIL = 'email',
  TELEGRAM = 'telegram',
}

export const EMPTY_PASSPORT = {
  series: '',
  number: '',
  authority: '',
  dateOfIssue: new Date().toISOString(),
  code: '',
};

export enum PASSPORT_KEYS {
  SERIES = 'series',
  NUMBER = 'number',
  AUTHORITY = 'authority',
  DATE_OF_ISSUE = 'dateOfIssue',
  CODE = 'code',
}

export const EMPTY_COMPANY = {
  name: '',
  inn: '',
  kpp: '',
  supplier: false,
  buyer: false,
  transportCompany: false,
};

export enum COMPANY_KEYS {
  NAME = 'name',
  INN = 'inn',
  KPP = 'kpp',
}

export enum EMPLOYMENT {
  SELF_EMPLOYED = 'selfEmployed',
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

export const EMPLOYMENT_VALUES = Object.values(EMPLOYMENT);

export enum COMPANY_TYPE {
  SUPPLIER = 'supplier',
  BUYER = 'buyer',
  TRANSPORT_COMPANY = 'transportCompany',
}

export const COMPANY_TYPE_VALUES = Object.values(COMPANY_TYPE);

