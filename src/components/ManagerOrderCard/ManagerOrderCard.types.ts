import { MockOrder } from 'mocks/mockOrders';
import { TFunction } from 'i18next';

export type Props = {
  order: MockOrder;
  t: TFunction;
  buttonTitle: string;
  onPress: (order: MockOrder) => void;
}