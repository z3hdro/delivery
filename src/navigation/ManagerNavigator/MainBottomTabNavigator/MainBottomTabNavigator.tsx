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
import { useAppSelector } from 'hooks/useAppSelector';
import { selectNewOrdersQty, selectNewDriversQty } from 'store/selectors';

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>();

const customOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const MainBottomTabNavigator = () => {
  const { t } = useTranslation();
  const newOrdersQty = useAppSelector(selectNewOrdersQty);
  const newDriversQty = useAppSelector(selectNewDriversQty);

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
          tabBarIcon: ({ focused, color, size }) => (
            <CargoIcon height={size} width={size} color={color} />
          ),
          tabBarBadge: newOrdersQty
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
          ),
          tabBarBadge: newDriversQty
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
