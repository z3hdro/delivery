import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';

import { networkService } from 'services/network';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { registerForPushNotificationsAsync } from 'providers/AppProvider/App.utils';
import { APP_CONTEXT } from './App.consts';
import { Person } from 'types/user';
import { Props } from './App.types';
import { AxiosError } from 'axios';
import { Order } from 'types/order';
import { LocationObject } from 'expo-location';
import { OrderGeoPayload } from 'services/network/types';
import { ORDER_STATUS } from 'constants/order';

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

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        console.log('token: ', token);
        if (token) {
          setDeviceToken(token);
        }
        const role = await appStorage.getData(STORAGE_KEYS.ROLE);
        console.log('role: ', role);

        if (role) {
          setUserRole(role);
        }

        const accessToken = await appStorage.getData(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = await appStorage.getData(STORAGE_KEYS.REFRESH_TOKEN);

        if (accessToken) {
          networkService.setAuthHeader(accessToken);
        }

        if (refreshToken) {
          const { person } = await networkService.getUserData();
          setPerson(person);

          if (role === 'driver') {
            try {
              const { order } = await networkService.getCurrentOrder();
              setCurrentOrder(order);
            } catch (e) {
              const error = e as AxiosError;
              if (error?.response?.status === 404) {
                setCurrentOrder(null);
              }
            }
          }
        }
      } catch (e) {
        const error = e as AxiosError;
        if (error?.response?.status === 401) {
          await appStorage.removeData(STORAGE_KEYS.ACCESS_TOKEN);
          await appStorage.removeData(STORAGE_KEYS.REFRESH_TOKEN);
        }
        console.log('app provider error: ', error?.response?.data || e);
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

  const setDriverOrder = useCallback((order: Order | null) => {
    setCurrentOrder(order);
  }, []);

  const updateOrderGeo = useCallback(async (location: LocationObject) => {
    if (
      person
      && person.user.role.name === 'driver'
      && currentOrder
      && currentOrder.status !== ORDER_STATUS.CONFIRMATION
    ) {
      try {
        const payload: OrderGeoPayload = {
          orderId: currentOrder.id,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };

        await networkService.updateOrderGeo(payload);
      } catch (e) {
        console.log('error while updating geo for order: ', e);
      }
    }
  }, [currentOrder]);

  const value = useMemo(() => ({
    isLoading,
    currentOrder,
    person,
    userRole,
    deviceToken,
    setCurrentPerson,
    removeCurrentPerson,
    setPersonRole,
    setDriverOrder,
    updateOrderGeo,
  }), [
    currentOrder,
    deviceToken,
    isLoading,
    person,
    removeCurrentPerson,
    setCurrentPerson,
    setDriverOrder,
    setPersonRole,
    userRole,
    updateOrderGeo
  ]);

  return (
    <APP_CONTEXT.Provider value={value}>
      {children}
    </APP_CONTEXT.Provider>
  );
};
