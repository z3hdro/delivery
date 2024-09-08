import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useWebSocket from 'react-native-use-websocket';

import { MainBottomTabNavigator } from './MainBottomTabNavigator';
import { ViewOrderScreen } from 'screens/ViewOrderScreen';
import { NomenclatureViewScreen } from 'screens/NomenclatureViewScreen';
import { UserViewScreen } from 'screens/UserViewScreen';
import { ShippingPointViewScreen } from 'screens/ShippingPointViewScreen';
import { SelectMeasureScreen } from 'screens/SelectMeasureScreen';
import { SelectCargoScreen } from 'screens/SelectCargoScreen';
import { SelectLogisticPointScreen } from 'screens/SelectLogisticPointScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setNewDriversQty, setNewOrdersQty } from 'store/slices';
import { networkService } from 'services/network';
import { WEBSOCKET_URL } from 'constants/websocket';
import { ORDER_STATUS } from 'constants/order';
import { USER_STATUS } from 'constants/user';

import { ManagerStackParamList } from 'types/navigation';
import { WSOrderManager, WSRegisteredDriver } from 'types/websocket';

const Stack = createNativeStackNavigator<ManagerStackParamList>();

const customOptions = {
  headerShown: false
};
export const ManagerNavigator = () => {
  const dispatch = useAppDispatch();

  useWebSocket(WEBSOCKET_URL.ORDER, {
    onOpen: () => console.log('ws opened on ManagerNavigator ORDER'),
    options: {
      headers: {
        Authorization: networkService.getAuthorizationToken(),
      }
    },
    onMessage: (e) => {
      const message = JSON.parse((e?.data as string)) as WSOrderManager;
      console.log('Received message:', message);
      if (message?.id && message?.status) {
        const status = message.status.toLowerCase()
        if (status === ORDER_STATUS.CONFIRMATION) {
          dispatch(setNewOrdersQty(1))
        } else if (status === ORDER_STATUS.CREATED) {
          dispatch(setNewOrdersQty(-1))
        }
      }
    },
    onClose: (e) => console.log('ws closed', e),
    onError: (e) => console.log('ws error', e),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 5
  });

  // TODO: when will be available for manager
  useWebSocket(WEBSOCKET_URL.AUTH, {
    onOpen: () => console.log('ws opened on ManagerNavigator AUTH'),
    options: {
      headers: {
        Authorization: networkService.getAuthorizationToken(),
      }
    },
    onMessage: (e) => {
      const message = JSON.parse((e?.data as string)) as WSRegisteredDriver;
      console.log('Received message:', message);
      if (message?.user_id && message?.status) {
        if (message.status === USER_STATUS.NEW_USER) {
          dispatch(setNewDriversQty(1))
        }
      }
    },
    onClose: (e) => console.log('ws closed', e),
    onError: (e) => console.log('ws error', e),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 5
  });

  return (
    <Stack.Navigator screenOptions={customOptions}>
      <Stack.Screen name='MainBottomTabNavigator' component={MainBottomTabNavigator} />
      <Stack.Screen name='ViewOrderScreen' component={ViewOrderScreen} />
      <Stack.Screen name='NomenclatureViewScreen' component={NomenclatureViewScreen} />
      <Stack.Screen name='UserViewScreen' component={UserViewScreen} />
      <Stack.Screen name='ShippingPointViewScreen' component={ShippingPointViewScreen} />
      <Stack.Screen name='SelectMeasureScreen' component={SelectMeasureScreen} />
      <Stack.Screen name='SelectCargoScreen' component={SelectCargoScreen} />
      <Stack.Screen name='SelectLogisticPointScreen' component={SelectLogisticPointScreen} />
    </Stack.Navigator>
  );
};
