import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MainBottomTabNavigator } from './MainBottomTabNavigator';
import { ViewOrderScreen } from 'screens/ViewOrderScreen';
import { NomenclatureViewScreen } from 'screens/NomenclatureViewScreen';
import { UserViewScreen } from 'screens/UserViewScreen';
import { ShippingPointViewScreen } from 'screens/ShippingPointViewScreen';

import { ManagerStackParamList } from 'types/navigation';

const Stack = createNativeStackNavigator<ManagerStackParamList>();

const customOptions = {
  headerShown: false
};
export const ManagerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={customOptions}>
      <Stack.Screen name='MainBottomTabNavigator' component={MainBottomTabNavigator} />
      <Stack.Screen name='ViewOrderScreen' component={ViewOrderScreen} />
      <Stack.Screen name='NomenclatureViewScreen' component={NomenclatureViewScreen} />
      <Stack.Screen name='UserViewScreen' component={UserViewScreen} />
      <Stack.Screen name='ShippingPointViewScreen' component={ShippingPointViewScreen} />
    </Stack.Navigator>
  );
};