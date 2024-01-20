import { AppContext } from './App.types';
import { createContext } from 'react';

const INITIAL_CONTEXT: AppContext = {
  isLoading: true,
  person: null,
  userRole: null,
  deviceToken: '',
  setCurrentPerson: () => {},
  removeCurrentPerson: () => {},
  setPersonRole: () => {},
};

export const APP_CONTEXT = createContext<AppContext>(INITIAL_CONTEXT);
