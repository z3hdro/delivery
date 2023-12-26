import { ViewStyle } from 'react-native';

export type Address = {
  name: string;
  country: string;
  city: string;
  street: string;
  house: string;
  building: string;
  floor: string;
  postcode: string;
}

export type Contact = {
  name: string;
  surname: string;
  partonymic: string;
  jobTitle: string;
  phone: number;
  email: string;
  telegram: string;
}

export type Props = {
  address: Address,
  planDate: string,
  contacts: Contact[]
  isDeparture?: boolean;
  style?: ViewStyle;
}