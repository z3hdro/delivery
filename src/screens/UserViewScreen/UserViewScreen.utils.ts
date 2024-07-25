import { USER } from 'constants/user';
import { CompanyData, DrivingLicense, PassportData, PersonData } from './UserViewScreen.types';
import {
  COMPANY_TYPE,
  EMPLOYMENT,
  EMPTY_COMPANY, EMPTY_DRIVING_LICENSE,
  EMPTY_PASSPORT,
  EMPTY_PERSON,
} from './UserViewScreen.consts';
import { ApprovedDriver, UnapprovedDriver } from 'types/user';

export const createPersonInitialState = (type: USER, driver?: ApprovedDriver, user?: UnapprovedDriver): PersonData => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_PERSON, id: user.id, phone: user.phone };
  }
  if (type === USER.APPROVED && driver) {
    const {
      user,
      name,
      surname,
      patronymic,
      inn,
      self_employed,
      individual,
      company,
      jobPosition,
      email,
      telegram
    } = driver;

    return {
      id: user.id,
      phone: user.phone,
      name,
      surname,
      patronymic,
      inn,
      self_employed,
      individual,
      company,
      jobPosition: jobPosition ? {
        label: jobPosition?.name,
        value: jobPosition?.id,
      } : null,
      email,
      telegram,
    };
  }
  return { ...EMPTY_PERSON };
};

export const createPassportInitialState = (
  type: USER,
  driver?: ApprovedDriver,
  user?: UnapprovedDriver
): PassportData => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_PASSPORT, photo: []};
  }
  if (type === USER.APPROVED && driver) {
    const {
      passport
    } = driver;

    if (passport) {
      const {
        series,
        number,
        date_of_issue,
        authority,
        department_code
      } = passport;

      return {
        series: String(series),
        number: String(number),
        date_of_issue,
        authority,
        department_code,
        photo: []
      };
    }
  }
  return { ...EMPTY_PASSPORT, photo: []};
};

export const createDrivingLicenseInitialState = (
  type: USER,
  driver?: ApprovedDriver,
  user?: UnapprovedDriver
): DrivingLicense => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_DRIVING_LICENSE };
  }
  if (type === USER.APPROVED && driver) {
    const {
      drivingLicense
    } = driver;

    if (drivingLicense) {
      const {
        series,
        number,
      } = drivingLicense;

      return {
        series: String(series),
        number: String(number),
      };
    }
  }
  return { ...EMPTY_DRIVING_LICENSE };
};

export const createCompanyInitialState = (
  type: USER,
  driver?: ApprovedDriver,
  user?: UnapprovedDriver
): CompanyData => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_COMPANY };
  }
  if (type === USER.APPROVED && driver && driver.contragent) {
    const {
      contragent: {
        name,
        inn,
        kpp,
        supplier,
        buyer,
        transport_company
      }
    } = driver;

    return {
      name,
      inn,
      kpp,
      supplier,
      buyer,
      transport_company
    };
  }
  return { ...EMPTY_COMPANY };
};

export const selectEmploymentType = (personData: PersonData): string => {
  if (personData.self_employed) {
    return EMPLOYMENT.SELF_EMPLOYED;
  }
  if (personData.individual) {
    return EMPLOYMENT.INDIVIDUAL;
  }
  if (personData.company) {
    return EMPLOYMENT.COMPANY;
  }
  return '';
};

export const selectCompanyType = (companyData: CompanyData): string => {
  if (companyData.buyer) {
    return COMPANY_TYPE.BUYER;
  }
  if (companyData.supplier) {
    return COMPANY_TYPE.SUPPLIER;
  }
  if (companyData.transport_company) {
    return COMPANY_TYPE.TRANSPORT_COMPANY;
  }
  return '';
};
