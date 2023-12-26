import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { LoginScreen } from 'screens/LoginScreen';
import { RegistrationScreen } from 'screens/RegistrationScreen';

import { LoginStackParamList } from 'types/navigation';

const Stack = createNativeStackNavigator<LoginStackParamList>();

const customOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={customOptions} >
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
    </Stack.Navigator>
  );
};