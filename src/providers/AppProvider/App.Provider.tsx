import React, { FC, useCallback, useMemo, useState } from 'react';
import { Props } from './App.types';
import { APP_CONTEXT } from './App.consts';

export const AppProvider: FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isDriverApproved, setIsDriverApproved] = useState<boolean>(false);

  const approveDriver = useCallback(() => {
    setIsDriverApproved(true);
  }, []);

  const setCurrentUser = useCallback((selectedUserId: string) => {
    setUserId(selectedUserId);
  }, []);

  const removeCurrentUser = useCallback(() => {
    setUserId(null);
    setIsDriverApproved(false);
  }, []);

  const value = useMemo(() => ({
    userId,
    isDriverApproved,
    approveDriver,
    setCurrentUser,
    removeCurrentUser
  }), [approveDriver, isDriverApproved, removeCurrentUser, setCurrentUser, userId]);

  return (
    <APP_CONTEXT.Provider value={value}>
      {children}
    </APP_CONTEXT.Provider>
  );
};