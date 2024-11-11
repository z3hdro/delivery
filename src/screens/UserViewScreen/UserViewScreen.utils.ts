import { USER } from 'constants/user';
import {
  CompanyData,
  DrivingLicense,
  ErrorMap,
  PassportData,
  PersonData,
  ValidationArgs
} from './UserViewScreen.types';
import {
  COMPANY_TYPE,
  EMPLOYMENT,
  EMPTY_COMPANY, EMPTY_DRIVING_LICENSE,
  EMPTY_PASSPORT,
  EMPTY_PERSON, INITIAL_ERROR_MAP,
} from './UserViewScreen.consts';
import { ApprovedDriver, ExtendedPerson, UnapprovedDriver } from 'types/user';
import { EMAIL_REGEX, IS_DIGIT_ONLY_REGEX } from 'constants/regex';

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

    return <PersonData>{
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

    console.log('drivingLicense: ', drivingLicense);

    if (drivingLicense) {
      const {
        serial,
        number,
      } = drivingLicense;

      return {
        series: String(serial),
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

export const createManagerFullName = (person?: ExtendedPerson): string => {
  let fullName = '';

  if (!person) {
    return fullName;
  }

  const { surname, name, patronymic } = person;

  if (surname) {
    fullName += surname;
  }

  if (name) {
    fullName += fullName.length ? ` ${name}` : name;
  }

  if (patronymic) {
    fullName += fullName.length ? ` ${patronymic}` : patronymic;
  }

  return fullName;
};

export const checkValidation = ({
  email,
  company,
  companyName,
  companyInn,
  companyKpp,
  name,
  surname,
  jobPosition,
  selfEmployed,
  driverLicenseSeries,
  driverLicenseNumber,
  passportSeries,
  passportNumber,
  passportAuthority,
  passportDateOfIssue,
  passportDepartmentCode,
  photos,
}: ValidationArgs): ErrorMap => {
  const errorMap = { ...INITIAL_ERROR_MAP };

  if (email && !EMAIL_REGEX.test(email)) {
    errorMap.email = true;
  }

  if (photos < 1) {
    errorMap.photos = true;
  }

  if (company) {
    if (!companyName) {
      errorMap.companyName = true;
    }

    if (!companyInn) {
      errorMap.companyInn = true;
    }
    if (companyKpp.length > 0 && !IS_DIGIT_ONLY_REGEX.test(companyKpp)) {
      errorMap.companyKpp = true;
    }
  }

  if (!company && !selfEmployed) {
    errorMap.type = true;
  }

  if (!name.trim()) {
    errorMap.name = true;
  }

  if (!surname.trim()) {
    errorMap.surname = true;
  }

  if (!jobPosition) {
    errorMap.jobPosition = true;
  }

  if (!driverLicenseSeries.trim()) {
    errorMap.driverLicenseSeries = true;
  }

  if (!driverLicenseNumber.trim()) {
    errorMap.driverLicenseNumber = true;
  }

  if (!passportSeries.trim()) {
    errorMap.passportSeries = true;
  }

  if (!passportNumber.trim()) {
    errorMap.passportNumber = true;
  }

  if (!passportAuthority.trim()) {
    errorMap.passportAuthority = true;
  }

  if (!passportDateOfIssue.trim()) {
    errorMap.passportDateOfIssue = true;
  }

  if (!passportDepartmentCode.trim()) {
    errorMap.passportDepartmentCode = true;
  }

  return errorMap;
};
