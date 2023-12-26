import { AppContext } from './App.types';
import { createContext } from 'react';

const INITIAL_CONTEXT: AppContext = {
  userId: null,
  isDriverApproved: false,
  approveDriver: () => {},
  setCurrentUser: () => {},
  removeCurrentUser: () => {}
};

export const APP_CONTEXT = createContext<AppContext>(INITIAL_CONTEXT);
