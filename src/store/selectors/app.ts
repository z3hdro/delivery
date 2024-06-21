import { RootState } from '../store';

export const selectCurrentPerson = (state: RootState) => state.app.person;

export const selectUserRole = (state: RootState) => state.app.role;

export const selectDeviceToken = (state: RootState) => state.app.deviceToken;

export const selectManagerPhone = (state: RootState) => state.app.managerPhone;

export const selectIsAppLoading = (state: RootState) => state.app.appIsLoading;
