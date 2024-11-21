export const EMPTY_ADDRESS = {
  region: '',
  city: '',
  street: '',
  house: '',
  building: '',
  floor: '',
  apartment: '',
  description: '',
};

export const INITIAL_CONTACT_ERROR_MAP = {
  contactNumberNonDigit: false,
  contactNumberLength: false,
  contactName: false,
  contactSurname: false,
  contactPatronymic: false,
  contactEmail: false,
};

export const INITIAL_ERROR_MAP = {
  name: false,
  address: false,
  contact: false,
  geo: false,
};

export const INITIAL_CONTACTS_ERROR_MAP = [{ ...INITIAL_CONTACT_ERROR_MAP }];

export const CONTACT_ERROR_KEYS: Record<string, boolean> = {
  name: true,
  surname: true,
  phone: true,
  patronymic: true
};

export const POINT_REGEX = /^\d+(\.\d+)?$/;
