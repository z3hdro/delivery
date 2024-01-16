import { ReactNode } from 'react';
import { Person } from 'types/user';

export type Props = {
  children: ReactNode;
}

export type AppContext = {
  isLoading: boolean;
  person: Person | null;
  userRole: string | null;
  deviceToken: string;
  setCurrentPerson: (person: Person | null) => void;
  removeCurrentPerson: () => void;
  setPersonRole: (role: string | null) => void;
}