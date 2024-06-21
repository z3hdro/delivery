import { AppContext } from './App.types';
import { createContext } from 'react';

const INITIAL_CONTEXT: AppContext = {
  isLoading: true,
  person: null,
  userRole: null,
  currentOrder: null,
  deviceToken: '',
  managerPhone: '',
  setCurrentPerson: () => {},
  removeCurrentPerson: () => {},
  setPersonRole: () => {},
  setDriverOrder: () => {},
  setCompanyManagerPhone: () => {},
  updateOrderGeo: async () => {},
};

export const APP_CONTEXT = createContext<AppContext>(INITIAL_CONTEXT);
