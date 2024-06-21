import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type GeoInitialState = {
  currentOrderId?: number
}

const initialState: GeoInitialState = {
  currentOrderId: undefined
};

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setGeoCurrentOrderId: (state, { payload }: PayloadAction<number>) => {
      state.currentOrderId = payload;
    },
    clearGeoCurrentOrderId: (state) => {
      state.currentOrderId = undefined;
    },
    resetGeoState: () => initialState,
  }
});

export const {
  setGeoCurrentOrderId,
  clearGeoCurrentOrderId,
  resetGeoState
} = geoSlice.actions;

export const geoReducer = geoSlice.reducer;
