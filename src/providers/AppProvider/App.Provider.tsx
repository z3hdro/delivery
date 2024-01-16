import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import { networkService } from 'services/network';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { registerForPushNotificationsAsync } from 'providers/AppProvider/App.utils';
import { APP_CONTEXT } from './App.consts';
import { Person } from 'types/user';
import { Props } from './App.types';

Notifications.setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export const AppProvider: FC<Props> = ({ children }) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [deviceToken, setDeviceToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setDeviceToken(token);
        }
        const role = await appStorage.getData(STORAGE_KEYS.ROLE);

        if (role) {
          setUserRole(role);
        }

        const refreshToken = await appStorage.getData(STORAGE_KEYS.REFRESH_TOKEN);

        if (refreshToken) {
          const { person } = await networkService.getUserData();
          setPerson(person);
        }
      } catch (e) {
        console.log(e);
      } finally {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    })();
  }, []);

  const setCurrentPerson = useCallback((person: Person | null) => {
    setPerson(person);
  }, []);

  const removeCurrentPerson = useCallback(() => {
    setPerson(null);
  }, []);

  const setPersonRole = useCallback((role: string | null) => {
    setUserRole(role);
  }, []);

  const value = useMemo(() => ({
    isLoading,
    person,
    userRole,
    deviceToken,
    setCurrentPerson,
    removeCurrentPerson,
    setPersonRole,
  }), [
    deviceToken,
    isLoading,
    person,
    removeCurrentPerson,
    setCurrentPerson,
    setPersonRole,
    userRole
  ]);

  return (
    <APP_CONTEXT.Provider value={value}>
      {children}
    </APP_CONTEXT.Provider>
  );
};