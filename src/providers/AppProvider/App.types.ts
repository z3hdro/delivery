import { ReactNode } from 'react';

export type Props = {
  children: ReactNode;
}

export type AppContext = {
  userId: string | null;
  isDriverApproved: boolean;
  approveDriver: () => void;
  setCurrentUser: (userId: string) => void;
  removeCurrentUser: () => void;
}