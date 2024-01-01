import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ManagerStackParamList } from 'types/navigation';
import { MainBottomTabNavigator } from './MainBottomTabNavigator';
import { ViewOrderScreen } from 'screens/ViewOrderScreen';

const Stack = createNativeStackNavigator<ManagerStackParamList>();

const customOptions = {
  headerShown: false
};
export const ManagerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={customOptions}>
      <Stack.Screen name='MainBottomTabNavigator' component={MainBottomTabNavigator}  />
      <Stack.Screen name='ViewOrderScreen' component={ViewOrderScreen}  />
    </Stack.Navigator>
  );
};