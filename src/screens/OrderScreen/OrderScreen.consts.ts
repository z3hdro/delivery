import { ExpandMap } from './OrderScreen.types';

export const INITIAL_STATE: ExpandMap = {
  delivery: false,
  departure: false
};

export enum EXPAND_MAP {
  DEPARTURE = 'departure',
  DELIVERY = 'delivery',
}