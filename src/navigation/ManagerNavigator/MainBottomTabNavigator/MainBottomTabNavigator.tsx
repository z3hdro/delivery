import React from 'react';
import { useTranslation } from 'react-i18next';
import { MainBottomTabNavigatorParamList } from 'types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTab } from './components';

import { CargoListScreen } from 'screens/CargoListScreen';
import { CreateOrderScreen } from 'screens/CreateOrderScreen';
import { NomenclatureScreen } from 'screens/NomenclatureScreen';
import { DriverListScreen } from 'screens/DriverListScreen';
import { ShippingPointScreen } from 'screens/ShippingPointScreen';

import { CargoIcon, DriversIcon, HomeIcon, NomenclatureIcon, PlusIcon } from 'src/assets/icons';
import { WEBSOCKET_URL } from 'constants/websocket';
import useWebSocket from 'react-native-use-websocket';
import { networkService } from 'services/network';
import { WSOrderManager } from 'types/websocket';

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>();

const customOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const MainBottomTabNavigator = () => {
  const { t } = useTranslation();

  const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL.ORDER, {
    onOpen: () => console.log('ws opened'),
    options: {
      headers: {
        Authorization: networkService.getAuthorizationToken(),
      }
    },
    onMessage: (e) => {
      const message = JSON.parse((e.data as string)) as WSOrderManager;
      console.log('Received message:', message);

    },
    onClose: (e) => console.log('ws closed', e),
    onError: (e) => console.log('ws error', e),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 5
  });
  console.log('lastMessage: ', lastMessage);

  // console.log('readyState websocket', readyState);

  // const connectionStatus = CONNECTION_STATUS[readyState];

  // console.log('connectionStatus: ', connectionStatus);

  return (
    <Tab.Navigator
      tabBar={props => <BottomTab {...props} />}
      initialRouteName={'CargoListScreen'}
      screenOptions={customOptions}>
      <Tab.Screen
        name='CargoListScreen'
        component={CargoListScreen}
        options={{
          tabBarLabel: t('CargoList'),
          tabBarIcon: ({ color, size }) => (
            <CargoIcon height={size} width={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='AddOrderScreen'
        component={CreateOrderScreen}
        options={{
          tabBarLabel: t('AddOrder'),
          tabBarIcon: ({ color, size }) => (
            <PlusIcon height={size} width={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='DriverListScreen'
        component={DriverListScreen}
        options={{
          tabBarLabel: t('DriverList'),
          tabBarIcon: ({ color, size }) => (
            <DriversIcon height={size} width={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='ShippingPointScreen'
        component={ShippingPointScreen}
        options={{
          tabBarLabel: t('ShippingPoints'),
          tabBarIcon: ({ color, size }) => (
            <HomeIcon height={size} width={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='NomenclatureScreen'
        component={NomenclatureScreen}
        options={{
          tabBarLabel: t('Nomenclature'),
          tabBarIcon: ({ color, size }) => (
            <NomenclatureIcon height={size} width={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
