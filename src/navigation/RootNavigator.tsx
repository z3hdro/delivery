import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { LoginScreen } from 'screens/LoginScreen';
import { RegistrationScreen } from 'screens/RegistrationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const customOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push'
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={customOptions} />
      <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} options={customOptions} />
    </Stack.Navigator>
  );
};