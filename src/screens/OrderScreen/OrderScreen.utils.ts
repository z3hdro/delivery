import { ORDER_STATUS } from 'constants/order';

export const getPrimaryButtonText = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.CREATED:
      return 'Order_take_button';
    case ORDER_STATUS.CONFIRMATION:
      return 'Order_begin_order_button';
    case ORDER_STATUS.DEPARTED:
      return 'Order_complete_order_button';
    default:
      return 'Order_begin_order_button';
  }
};
