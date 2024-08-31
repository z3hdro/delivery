import { ORDER_STATUS_VALUES } from 'constants/order';

export type WSOrderManager = {
  id: number,
  status: ORDER_STATUS_VALUES
}

export type WSOrderDriver = {
  status: ORDER_STATUS_VALUES
}
