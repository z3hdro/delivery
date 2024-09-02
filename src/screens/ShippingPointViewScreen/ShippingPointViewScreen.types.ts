import { GeoPosition } from 'types/geolocation';
import { EMPTY_CONTACT } from 'constants/contact';

export type ExpandedMap = Record<string, boolean>;

export type AddressView = {
  region: string
  city: string
  street: string
  house: string
  building: string
  floor: string
  apartment: string
  description: string
}

export type ContactView = {
  name: string
  surname: string
  patronymic: string
  jobTitle: string
  phone: string
  email: string
  telegram: string
  description: string
}

export type AddressKeys = keyof AddressView;
export type ContactKeys = keyof ContactView;

export type ContactError = {
  contactNumberNonDigit: boolean
  contactNumberLength: boolean
  contactName: boolean
  contactSurname: boolean
  contactEmail: boolean
}

export type ContactErrorMap = ContactError[]

export type ErrorMap = {
  name: boolean
  address: boolean
  contact: boolean
  geo: boolean
}

export type ValidationArgs = {
  name: string
  address: AddressView
  geoData: GeoPosition
  contacts: ContactView[]
}

export type RequiredContactKeys =  keyof typeof EMPTY_CONTACT
