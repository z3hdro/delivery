import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from 'types/user';

export type AppInitialState = {
  appIsLoading: boolean
  isAuthorizationFinished: boolean
  deviceToken?: string;
  role?: string
  managerPhone?: string
  person?: Person
}

const initialState: AppInitialState = {
  appIsLoading: true,
  isAuthorizationFinished: false,
  deviceToken: undefined,
  role: undefined,
  managerPhone: undefined,
  person: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeviceToken: (state, { payload }: PayloadAction<string>) => {
      state.deviceToken = payload;
    },
    setIsAppLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.appIsLoading = payload;
    },
    setUserRole: (state, { payload }: PayloadAction<string>) => {
      state.role = payload;
    },
    clearUserRole: (state) => {
      state.role = undefined;
    },
    setManagerPhone: (state, { payload }: PayloadAction<string>) => {
      state.managerPhone = payload;
    },
    clearManagerPhone: (state) => {
      state.managerPhone = undefined;
    },
    setCurrentPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload;
    },
    clearCurrentPerson: (state) => {
      state.person = undefined;
    },
    setIsAuthorizationFinished: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthorizationFinished = payload;
    },
    clearIsAuthorizationFinished: (state) => {
      state.isAuthorizationFinished = false;
    },
    resetAppState: () => initialState,
  }
});

export const {
  setDeviceToken,
  setUserRole,
  setIsAppLoading,
  clearUserRole,
  setManagerPhone,
  clearManagerPhone,
  setCurrentPerson,
  clearCurrentPerson,
  resetAppState,
  setIsAuthorizationFinished,
  clearIsAuthorizationFinished,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
