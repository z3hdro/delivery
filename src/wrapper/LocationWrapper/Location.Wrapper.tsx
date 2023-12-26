import React, { FC, useEffect } from 'react';
import * as Location from 'expo-location';
import { Props } from './Location.types';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';

export const LocationWrapper: FC<Props> = ({ children }) => {
  useEffect(() => {
    void (async () => {

      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      console.log('foregroundStatus: ', foregroundStatus);

      if (foregroundStatus !== 'granted') {
        return;
      }

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      console.log('backgroundStatus: ', backgroundStatus);

      if (backgroundStatus !== 'granted') {
        return;
      }

      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION, 'true');

      const location = await Location.getCurrentPositionAsync({});
      console.log(location);
    })();
  }, []);

  return (
    <>
      {children}
    </>
  );
};