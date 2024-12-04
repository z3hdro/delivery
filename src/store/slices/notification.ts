import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationInitialState = {
  newOrdersQty: number
  newDriversQty: number
}

const initialState: NotificationInitialState = {
  newOrdersQty: 0,
  newDriversQty: 0
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNewOrdersQty: (state, { payload }: PayloadAction<number>) => {
      const newQty = state.newOrdersQty + payload;
      state.newOrdersQty =  newQty < 0 ? 0 : newQty;
    },
    resetNewOrdersQty: (state) => {
      state.newOrdersQty = 0;
    },
    setNewDriversQty: (state, { payload }: PayloadAction<number>) => {
      const newQty = state.newDriversQty + payload;
      state.newDriversQty =  newQty < 0 ? 0 : newQty;
    },
    resetNewDriversQty: (state) => {
      state.newDriversQty = 0;
    },
    resetNotificationState: () => initialState,
  }
});

export const {
  setNewOrdersQty,
  resetNewOrdersQty,
  setNewDriversQty,
  resetNewDriversQty,
  resetNotificationState
} = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
