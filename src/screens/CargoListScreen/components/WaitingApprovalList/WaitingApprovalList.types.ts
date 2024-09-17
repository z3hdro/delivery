import { Order } from 'types/order';

export type Props = {
  initialOrder?: Order;
  resetInitialOrder: () => void;
}
