import { MockUser } from 'mocks/mockUsers';
import { USER } from 'constants/user';
import { MockDriver } from 'mocks/mockDrivers';
import { Company, Passport, Person } from './UserViewScreen.types';
import { EMPTY_COMPANY, EMPTY_PASSPORT, EMPTY_PERSON } from './UserViewScreen.consts';

export const createPersonInitialState = (type: USER, driver?: MockDriver, user?: MockUser): Person => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_PERSON, phone: user.phone };
  }
  if (type === USER.APPROVED && driver) {
    const {
      phone,
      name,
      surname,
      patronymic,
      personInn,
      selfEmployed,
      individual,
      company,
      jobPosition,
      email,
      telegram
    } = driver;

    return {
      phone,
      name,
      surname,
      patronymic,
      personInn,
      selfEmployed,
      individual,
      company,
      jobPosition,
      email,
      telegram,
    };
  }
  return { ...EMPTY_PERSON };
};

export const createPassportInitialState = (type: USER, driver?: MockDriver, user?: MockUser): Passport => {
  if (type === USER.WAITING_APPROVAL && user) {
    return {  ...EMPTY_PASSPORT, photo: []};
  }
  if (type === USER.APPROVED && driver) {
    const {
      passport: {
        series,
        number,
        dateOfIssue,
        authority,
        code,
        photo
      }
    } = driver;

    return {
      series,
      number,
      dateOfIssue,
      authority,
      code,
      photo: [...photo]
    };
  }
  return { ...EMPTY_PASSPORT, photo: []};
};

export const createCompanyInitialState = (type: USER, driver?: MockDriver, user?: MockUser): Company => {
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
        transportCompany
      }
    } = driver;

    return {
      name,
      inn,
      kpp,
      supplier,
      buyer,
      transportCompany
    };
  }
  return { ...EMPTY_COMPANY };
};