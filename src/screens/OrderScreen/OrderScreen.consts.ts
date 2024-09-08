import { ExpandMap } from './OrderScreen.types';
import { ORDER_STATUS } from 'constants/order';

export const INITIAL_STATE: ExpandMap = {
  delivery: false,
  departure: false
};

export enum EXPAND_MAP {
  DEPARTURE = 'departure',
  DELIVERY = 'delivery',
}

export const ALERT_DISPLAY_STATUS = [ORDER_STATUS.CREATED, ORDER_STATUS.LOADING, ORDER_STATUS.DEPARTED];
