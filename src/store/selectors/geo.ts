import { RootState } from 'store/store';

export const selectGeoCurrentOrderId = (state: RootState) => state.geo.currentOrderId;
