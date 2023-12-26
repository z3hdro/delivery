import { MockOrder } from 'mocks/mockOrders';
import { TFunction } from 'i18next';

export type Props = {
  order: MockOrder;
  t: TFunction;
  onPress?: (order: MockOrder) => void;
  isDriver?: boolean;
  isManager?: boolean;
  detailedView?: boolean;
}