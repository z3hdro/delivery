import { RootState } from 'store/store';

export const selectNewDriversQty = (state: RootState) => state.notification.newDriversQty;

export const selectNewOrdersQty = (state: RootState) => state.notification.newOrdersQty;
