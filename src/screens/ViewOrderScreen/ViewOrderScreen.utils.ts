import { ORDER_LIST } from 'constants/order';

export const getPrimaryButtonText = (type: ORDER_LIST): string => {
  switch (type) {
    case ORDER_LIST.WAITING_APPROVAL:
      return 'ViewOrder_approve_button';
    case ORDER_LIST.IN_PROGRESS:
      return 'ViewOrder_close_button';
    case ORDER_LIST.AVAILABLE:
      return 'ViewOrder_save_button';
    default:
      return 'ViewOrder_close_button';
  }
};