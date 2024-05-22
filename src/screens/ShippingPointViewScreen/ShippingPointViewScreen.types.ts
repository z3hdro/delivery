
export type ExpandedMap = Record<string, boolean>;

export type AddressView = {
  name: string
  city: string
  street: string
  house: string
  building: string
  floor: string
  postcode: string
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
