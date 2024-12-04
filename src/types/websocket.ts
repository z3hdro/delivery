import { ORDER_STATUS_VALUES } from 'types/order';
import { USER_STATUS_VALUES } from 'types/user';

export type WSOrderManager = {
  id: number,
  status: ORDER_STATUS_VALUES
}

export type WSRegisteredDriver = {
  user_id: number,
  status: USER_STATUS_VALUES
}

export type WSOrderApprovedDriver = {
  user_id: number,
  status: USER_STATUS_VALUES
}

export type WSOrderLocation = {
  latitude: number,
  longitude: number
}
