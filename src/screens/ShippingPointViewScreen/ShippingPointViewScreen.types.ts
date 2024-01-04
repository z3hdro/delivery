export type ExpandedMap = Record<string, boolean>;

export type Address = {
  country: string;
  city: string;
  street: string;
  house: string;
  building: string;
  floor: string;
  postcode: string;
  apartment: string;
  description: string;
};

export type Contact = {
  name: string;
  surname: string;
  patronymic: string;
  jobTitle: string;
  phone: string;
  email: string;
  telegram: string;
  description: string;
};

export type AddressKeys = keyof Address;
export type ContactKeys = keyof Contact;