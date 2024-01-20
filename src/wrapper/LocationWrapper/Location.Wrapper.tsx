import React, { FC, useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import * as Location from 'expo-location';

import { Props } from './Location.types';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';

export const LocationWrapper: FC<Props> = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const hasAskedPermission = useRef(false);

  const checkNotificationStatus = useCallback(async () => {
    const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
    const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();

    if (foregroundStatus === 'granted' && backgroundStatus === 'granted') {
      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION, 'true');

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    } else {
      await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
    }
  }, []);

  useEffect(() => {
    void (async () => {

      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      console.log('foregroundStatus: ', foregroundStatus);

      if (foregroundStatus !== 'granted') {
        hasAskedPermission.current = true;
        await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
        return;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      console.log('backgroundStatus: ', backgroundStatus);

      if (backgroundStatus !== 'granted') {
        hasAskedPermission.current = true;
        await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
        return;
      }

      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION, 'true');

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
      hasAskedPermission.current = true;
    })();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        hasAskedPermission.current
      ) {
        await checkNotificationStatus();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
    </>
  );
};