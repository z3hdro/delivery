import { ORDER_STATUS } from 'constants/order';

export const getTabIndex = (status: ORDER_STATUS): number => {
  switch (status) {
    case ORDER_STATUS.CONFIRMATION:
      return 0;
    case ORDER_STATUS.DEPARTED:
      return 1;
    case ORDER_STATUS.COMPLETED:
      return 3;
    default:
      return 0;
  }
};
