import { ORDER_STATUS } from 'constants/order';

export const selectStatusLabel = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.CONFIRMATION:
      return 'Order_waiting_approval';
    case ORDER_STATUS.LOADING:
      return 'Order_approved';
    case ORDER_STATUS.DEPARTED:
      return 'Order_in_progress';
    case ORDER_STATUS.COMPLETED:
      return 'Order_completed';
    default:
      return 'Order_created';
  }
};
