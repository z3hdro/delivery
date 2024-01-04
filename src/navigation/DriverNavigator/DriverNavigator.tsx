import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ApprovalScreen } from 'screens/ApprovalScreen';
import { OrderListScreen } from 'screens/OrderListScreen';
import { OrderScreen } from 'screens/OrderScreen';
import { useAppData } from 'providers/AppProvider';

import { DriverStackParamList } from 'types/navigation';

const Stack = createNativeStackNavigator<DriverStackParamList>();

const MockScreen = () => <></>;

const customOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const DriverNavigator = () => {
  const { isDriverApproved } = useAppData();

  return (
    <Stack.Navigator
      initialRouteName={isDriverApproved ? 'OrderListScreen' : 'ApprovalScreen'}
      screenOptions={customOptions}>
      <Stack.Screen name='OrderListScreen' component={OrderListScreen} />
      <Stack.Screen name='ApprovalScreen' component={ApprovalScreen} />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
      <Stack.Screen name='DriverMap' component={MockScreen} />
    </Stack.Navigator>
  );
};