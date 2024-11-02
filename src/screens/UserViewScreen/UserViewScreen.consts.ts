import { CompanyData, DrivingLicense, Passport, PersonData } from './UserViewScreen.types';
import { ErrorMap } from './UserViewScreen.types';

export const DISPLAY_DATE_FORMAT = 'dd.MM.yyyy';

export const EMPTY_PERSON: PersonData = {
  id: 0,
  phone: '',
  name: '',
  surname: '',
  patronymic: '',
  inn: '',
  self_employed: false,
  individual: false,
  company: false,
  jobPosition: null,
  email: '',
  telegram: '',
};

export enum PERSON_KEYS {
  PHONE = 'phone',
  NAME = 'name',
  SURNAME = 'surname',
  PATRONYMIC = 'patronymic',
  INN = 'inn',
  jobPosition = 'jobPosition',
  EMAIL = 'email',
  TELEGRAM = 'telegram',
}

export const EMPTY_DRIVING_LICENSE: DrivingLicense = {
  series: '',
  number: '',
};

export const EMPTY_PASSPORT: Passport = {
  series: '',
  number: '',
  authority: '',
  date_of_issue: new Date().toISOString(),
  department_code: '',
};

export enum PASSPORT_KEYS {
  SERIES = 'series',
  NUMBER = 'number',
  AUTHORITY = 'authority',
  DATE_OF_ISSUE = 'date_of_issue',
  DEPARTMENT_CODE = 'department_code',
}

export enum DRIVING_LICENSE_KEYS {
  SERIES = 'series',
  NUMBER = 'number',
}

export const EMPTY_COMPANY: CompanyData = {
  name: '',
  inn: '',
  kpp: '',
  supplier: false,
  buyer: false,
  transport_company: false,
};

export enum COMPANY_KEYS {
  NAME = 'name',
  INN = 'inn',
  KPP = 'kpp',
}

export enum EMPLOYMENT {
  SELF_EMPLOYED = 'self_employed',
  INDIVIDUAL = 'individual',
  COMPANY = 'company',
}

export const EMPLOYMENT_VALUES = Object.values(EMPLOYMENT);

export enum COMPANY_TYPE {
  SUPPLIER = 'supplier',
  BUYER = 'buyer',
  TRANSPORT_COMPANY = 'transport_company',
}

export const COMPANY_TYPE_VALUES = Object.values(COMPANY_TYPE);

export const INITIAL_ERROR_MAP: ErrorMap = {
  phone: false,
  manager: false,
  companyName: false,
  companyInn: false,
  companyKpp: false,
  email: false,
  name: false,
  surname: false,
  jobPosition: false,
  type: false,
  driverLicenseSeries: false,
  driverLicenseNumber: false,
  passportSeries: false,
  passportNumber: false,
  passportAuthority: false,
  passportDateOfIssue: false,
  passportDepartmentCode: false,
};

export enum USER_APPROVE_ERROR_TEXT {
  INCORRECT_EMAIL = 'UserView_error_email',
  PHONE_CONTAIN_WORDS = 'Registration_error_contain_words',
  PHONE_LENGTH = 'Registration_error_phone_length',
  COMPANY_NAME_EMPTY = 'UserView_error_company_name',
  COMPANY_INN_EMPTY = 'UserView_error_company_inn',
  COMPANY_KPP_ONLY_NUMBERS = 'UserView_error_company_kpp',
  MANAGER_EMPTY = 'UserView_error_manager'
}
