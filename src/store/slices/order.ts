import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from 'types/order';
import { ORDER_STATUS } from 'constants/order';
import { GeoResponse } from 'services/network/types';

type OrderInitialState = {
  currentOrder: Order | null
  selectedOrder: Order | null
}

const initialState: OrderInitialState = {
  currentOrder: null,
  selectedOrder: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentOrder: (state, { payload }: PayloadAction<Order>) => {
      state.currentOrder = payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setSelectedOrder: (state, { payload }: PayloadAction<Order>) => {
      state.selectedOrder = payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    updateCurrentOrderStatus: (state, { payload }: PayloadAction<ORDER_STATUS>) => {
      if (state.currentOrder) {
        state.currentOrder.status = payload;
      }
    },
    updateCurrentOrderGeo: (state, { payload }: PayloadAction<GeoResponse>) => {
      console.log('payload: ', payload);
      if (state.currentOrder) {
        state.currentOrder.geo = payload;
      }
    },
    resetCurrentOrder: () => initialState,
  }
});

export const {
  setCurrentOrder,
  clearCurrentOrder,
  setSelectedOrder,
  clearSelectedOrder,
  updateCurrentOrderStatus,
  updateCurrentOrderGeo,
  resetCurrentOrder
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
