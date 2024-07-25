import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ApprovalScreen } from 'screens/ApprovalScreen';
import { OrderListScreen } from 'screens/OrderListScreen';
import { OrderScreen } from 'screens/OrderScreen';
import { DriverStackParamList } from 'types/navigation';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentPerson } from 'store/selectors';

const Stack = createNativeStackNavigator<DriverStackParamList>();

const customOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const DriverNavigator = () => {
  const person = useAppSelector(selectCurrentPerson);

  return (
    <Stack.Navigator
      initialRouteName={person?.user.approved ? 'OrderListScreen' : 'ApprovalScreen'}
      screenOptions={customOptions}>
      <Stack.Screen name='OrderListScreen' component={OrderListScreen} />
      <Stack.Screen name='ApprovalScreen' component={ApprovalScreen} />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
    </Stack.Navigator>
  );
};
