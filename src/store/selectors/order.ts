import { RootState } from 'store/store';

export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;

export const selectOrder = (state: RootState) => state.order.selectedOrder;
