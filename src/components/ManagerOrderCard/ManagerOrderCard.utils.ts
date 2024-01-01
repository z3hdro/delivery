import { ORDER_STATUS } from 'constants/order';

export const selectStatusLabel = (status: ORDER_STATUS): string => {
  switch (status) {
    case ORDER_STATUS.WAITING_APPROVAL:
      return 'Order_waiting_approval';
    case ORDER_STATUS.APPROVED:
      return 'Order_approved';
    case ORDER_STATUS.IN_PROGRESS:
      return 'Order_in_progress';
    default:
      return 'Order_waiting_approval';
  }
};