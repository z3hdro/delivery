import React, { FC, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { AxiosError } from 'axios';

import { networkService } from 'services/network';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { registerForPushNotificationsAsync } from 'providers/AppProvider/App.utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {
  setIsAppLoading,
  setCurrentOrder,
  setCurrentPerson,
  setDeviceToken,
  setManagerPhone,
  setUserRole
} from 'store/slices';
import { selectCurrentOrder, selectCurrentPerson } from 'store/selectors';
import { Props } from './App.types';
import { useAppSelector } from 'hooks/useAppSelector';

Notifications.setNotificationHandler({
  // eslint-disable-next-line @typescript-eslint/require-await
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export const AppProvider: FC<Props> = ({ children }) => {
  const person = useAppSelector(selectCurrentPerson);
  const currentOrder = useAppSelector(selectCurrentOrder);

  const dispatch = useAppDispatch();

  console.log('currentOrder on appProvider: ', !!currentOrder);
  console.log('currentPerson on appProvider: ', !!person);

  useEffect(() => {
    void (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        console.log('token: ', token);
        if (token) {
          dispatch(setDeviceToken(token));
        }
        const role = await appStorage.getData(STORAGE_KEYS.ROLE);
        console.log('role: ', role);

        if (role) {
          dispatch(setUserRole(role));
        }

        const accessToken = await appStorage.getData(STORAGE_KEYS.ACCESS_TOKEN);
        const refreshToken = await appStorage.getData(STORAGE_KEYS.REFRESH_TOKEN);

        if (accessToken) {
          networkService.setAuthHeader(accessToken);
        }

        if (refreshToken) {
          const { person } = await networkService.getUserData();
          dispatch(setCurrentPerson(person));

          if (role === 'driver') {
            try {
              const { order } = await networkService.getCurrentOrder();

              dispatch(setCurrentOrder(order));
            } catch (e) {
              const error = e as AxiosError;
              if (error?.response?.status === 404) {
                console.log('current order not found');
              }
            }

            const { phone } = await networkService.getManagerPhone();
            if (phone) {
              dispatch(setManagerPhone(phone));
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
        dispatch(setIsAppLoading(false));
      }
    })();
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
};
