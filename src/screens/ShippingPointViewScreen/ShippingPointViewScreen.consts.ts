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
  contactEmail: false,
};

export const INITIAL_ERROR_MAP = {
  name: false,
  address: false,
  contact: false,
  geo: false,
};

export const INITIAL_CONTACTS_ERROR_MAP = [{ ...INITIAL_CONTACT_ERROR_MAP }];
