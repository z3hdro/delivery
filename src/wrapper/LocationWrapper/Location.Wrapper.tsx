import React, { FC, useCallback, useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { LOCATION_TASK_NAME } from 'constants/geolocation';
import { Props, TASK_DATA } from './Location.types';
import { ORDER_STATUS } from 'constants/order';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentOrder, selectCurrentPerson } from 'store/selectors';
import { setGeoCurrentOrderId } from 'store/slices';
import { updateOrderGeo } from 'utils/geo';
import { store } from 'store/store';

export const LocationWrapper: FC<Props> = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const hasAskedPermission = useRef(false);
  const hasFirstCheck = useRef(false);

  const person = useAppSelector(selectCurrentPerson);
  const currentOrder = useAppSelector(selectCurrentOrder);
  const dispatch = useAppDispatch();

  const checkNotificationStatus = useCallback(async () => {
    if (!person) {
      return;
    }

    // currentOrderId = currentOrder.id;
    if (currentOrder) {
      dispatch(setGeoCurrentOrderId(currentOrder.id));
    }

    const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
    const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();

    hasFirstCheck.current = true;

    if (backgroundStatus === 'granted') {
      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION_BACKGROUND, 'true');

      const isLocationServiceIsRunning = await checkLocationService();
      const isBackgroundServiceEnabled = await isBackgroundServiceEnable();

      if (!isLocationServiceIsRunning && isBackgroundServiceEnabled && currentOrder?.status === ORDER_STATUS.DEPARTED) {
        await runLocationService();
      }
    }

    if (foregroundStatus === 'granted') {
      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION, 'true');

      return;
    }

    await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
  }, [currentOrder, dispatch, person]);

  useEffect(() => {
    void (async () => {
      if (hasAskedPermission.current) {
        return;
      }

      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      console.log('foregroundStatus: ', foregroundStatus);

      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      console.log('backgroundStatus: ', backgroundStatus);

      if (backgroundStatus !== 'granted') {
        await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION_BACKGROUND);
      }

      if (foregroundStatus !== 'granted') {
        hasAskedPermission.current = true;
        await appStorage.removeData(STORAGE_KEYS.NOTIFICATION_PERMISSION);
        return;
      }

      await appStorage.storeData(STORAGE_KEYS.NOTIFICATION_PERMISSION, 'true');

      const isLocationServiceIsRunning = await checkLocationService();
      console.log('isLocationServiceIsRunning: ', isLocationServiceIsRunning);

      hasAskedPermission.current = true;
    })();
  }, [checkNotificationStatus]);

  useEffect(() => {
    if (hasAskedPermission.current && !hasFirstCheck.current && !!currentOrder && !!person) {
      void checkNotificationStatus();
    }
  }, [checkNotificationStatus, currentOrder, person]);

  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', async nextAppState => {
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
      appStateSubscription.remove();
    };
  }, [checkNotificationStatus]);

  return (
    <>
      {children}
    </>
  );
};

export const runLocationService = async (): Promise<void> => {
  console.log('start service');
  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 15 * 60 * 1000,
    distanceInterval: 3000,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'Location Tracking',
      notificationBody: 'Tracking your location for routing purposes',
      notificationColor: '#FF0000',
    },
    pausesUpdatesAutomatically: false,
    deferredUpdatesInterval: 1000,
    deferredUpdatesDistance: 0,
    deferredUpdatesTimeout: 1000,
  });
};

export const checkLocationService = (): Promise<boolean> => {
  console.log('check service');

  return Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
};

export const stopLocationService = async (): Promise<void> => {
  console.log('stop service');
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
};

export const isBackgroundServiceEnable = (): Promise<boolean> => {
  return Location.isBackgroundLocationAvailableAsync();
};

// Background check for location
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  console.log('task manager in background result');
  if (error) {
    console.log('background location error: ', error);
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data as TASK_DATA;

    if (locations?.length) {
      const latestLocation = locations[0];

      const currentOrderId = store.getState().geo?.currentOrderId;

      console.log('currentOrderId: ', currentOrderId);
      if (latestLocation && currentOrderId) {
        void updateOrderGeo(latestLocation); // async call of function in background
      }
    }

    console.log('locations in background: ', locations);
    // do something with the locations captured in the background
  }
});
