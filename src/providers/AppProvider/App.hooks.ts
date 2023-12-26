import { useContext } from 'react';
import { APP_CONTEXT } from './App.consts';

export const useAppData = () => {
  return useContext(APP_CONTEXT);
};