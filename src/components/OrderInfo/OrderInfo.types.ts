import { ViewStyle } from 'react-native';
import { Address } from 'types/address';

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