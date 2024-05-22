import { ViewStyle } from 'react-native';
import { Address } from 'types/address';
import { OrderContact } from 'types/order';

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
  contacts: OrderContact[]
  isDeparture?: boolean;
  style?: ViewStyle;
}
