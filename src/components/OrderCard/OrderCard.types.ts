import { TFunction } from 'i18next';
import { Order } from 'types/order';

export type Props = {
  order: Order;
  t: TFunction;
  onPress?: (order: Order) => void;
  isDriver?: boolean;
  isManager?: boolean;
  detailedView?: boolean;
}