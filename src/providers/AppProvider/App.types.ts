import { ReactNode } from 'react';
import { LocationObject } from 'expo-location';
import { Person } from 'types/user';
import { Order } from 'types/order';

export type Props = {
  children: ReactNode;
}

export type AppContext = {
  isLoading: boolean;
  person: Person | null;
  managerPhone: string;
  userRole: string | null;
  currentOrder: Order | null;
  deviceToken: string;
  setCurrentPerson: (person: Person | null) => void;
  removeCurrentPerson: () => void;
  setPersonRole: (role: string | null) => void;
  setDriverOrder: (order: Order | null) => void;
  setCompanyManagerPhone: (phone: string) => void;
  updateOrderGeo: (location: LocationObject) => Promise<void>;
}
