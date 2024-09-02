import { parseGeo } from 'utils/geo';
import {
  EMPTY_ADDRESS, INITIAL_CONTACT_ERROR_MAP, INITIAL_CONTACTS_ERROR_MAP,
  INITIAL_ERROR_MAP
} from './ShippingPointViewScreen.consts';
import { EMPTY_CONTACT } from 'constants/contact';
import {
  AddressView, ContactError, ContactErrorMap,
  ContactView,
  ErrorMap,
  ExpandedMap,
  ValidationArgs
} from './ShippingPointViewScreen.types';
import { LogisticPoint } from 'services/network/types';
import { GeoPosition } from 'types/geolocation';
import { CONTAINS_LETTERS_REGEX, DIGIT_REGEX, EMAIL_REGEX } from 'constants/regex';

export const createInitialExpandMap = (point?: LogisticPoint): ExpandedMap => {
  if (!point) {
    return { 0: false } as ExpandedMap;
  }

  return Object.fromEntries(point.contacts.map((_, index) => ([index, false])));
};

export const createInitialAddressData = (point?: LogisticPoint): AddressView => {
  if (!point) {
    return { ...EMPTY_ADDRESS };
  }

  const {
    City,
    Street,
    Region,
    house = '',
    building = '',
    floor= '',
    apartment = '',
    description = '',
  } = point.Address;

  return {
    region: Region?.name ?? '',
    city: City?.name ?? '',
    street: Street?.name ?? '',
    house,
    building,
    floor: floor ?? '',
    apartment: apartment ?? '',
    description
  };
};

export const createInitialContactData = (point?: LogisticPoint): ContactView[] => {
  if (!point) {
    return [{ ...EMPTY_CONTACT }];
  }

  return point.contacts.map(({
    contact: {
      name = '',
      surname = '',
      patronymic = '',
      jobTitle,
      phone= '',
      email = '',
      telegram= '',
      description = ''
    }
  }) => ({
    name,
    surname,
    patronymic,
    jobTitle,
    phone,
    email,
    telegram,
    description
  }));
};

export const createInitialGeoData = (point?: LogisticPoint): GeoPosition => {
  if (!point || !point.geo) {
    return { lat: 0, lon: 0 };
  }

  return parseGeo(point.geo);
};

export const checkValidation = ({ name, address, geoData, contacts }: ValidationArgs): ErrorMap => {
  const errorMap = { ...INITIAL_ERROR_MAP };

  if (!name.trim()) {
    errorMap.name = true;
  }

  if (Object.values(address).every(field => !field)) {
    errorMap.address = true;
  } else {
    if (!geoData.lon || !geoData.lat) {
      errorMap.geo = true;
    }
  }

  const contactQty = contacts.length;

  if (contactQty) {
    if (contactQty === 1 && Object.values(contacts[0]).every(field => !field)) {
      errorMap.contact = true;
    }
  }

  console.log('p1');

  return errorMap;
};

export const checkContactValidation = (contact: ContactView): ContactError => {
  const errorMap = { ...INITIAL_CONTACT_ERROR_MAP };

  if (!contact.name.trim()) {
    errorMap.contactName = true;
  }

  if (!contact.surname.trim()) {
    errorMap.contactSurname = true;
  }

  const email = contact.email?.trim();
  if (email && !EMAIL_REGEX.test(email)) {
    errorMap.contactEmail = true;
  }

  const phone = contact.phone.trim();

  if (!CONTAINS_LETTERS_REGEX.test(phone)) {
    errorMap.contactNumberNonDigit = true;
  }

  if ((phone.match(DIGIT_REGEX) || []).length !== 11) {
    errorMap.contactNumberLength = true;
  }

  return errorMap;
};

export const checkContactError = (key: string, contactError: ContactError): [boolean, string] => {
  if (key === 'name' && contactError.contactName) {
    return [true, 'ShippingPointView_error_contact_name'];
  }

  if (key === 'surname' && contactError.contactSurname) {
    return [true, 'ShippingPointView_error_contact_surname'];
  }

  if (key === 'phone' && contactError.contactNumberLength) {
    return [true, 'ShippingPointView_error_phone_length'];
  }

  if (key === 'phone' && contactError.contactNumberNonDigit) {
    return [true, 'ShippingPointView_error_phone_contain_words'];
  }

  if (key === 'email' && contactError.contactEmail) {
    return [true, 'ShippingPointView_error_incorrect_email'];
  }

  return [false, ''];
};

export const creatInitialContactErrorMap = (isEdit: boolean, contactsQty: number): ContactErrorMap => {
  if (isEdit) {
    return Array.from({ length: contactsQty }, () => ({ ...INITIAL_CONTACT_ERROR_MAP }));
  }
  return INITIAL_CONTACTS_ERROR_MAP;
};
