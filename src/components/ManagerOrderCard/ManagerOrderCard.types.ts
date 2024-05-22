import { TFunction } from 'i18next';
import { Order } from 'types/order';

export type Props = {
  order: Order;
  t: TFunction;
  buttonTitle: string;
  onPress: (order: Order) => void;
}
