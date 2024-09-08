import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Preloader } from 'components/Preloader';
import { LoginNavigator } from '../LoginNavigator';
import { ManagerNavigator } from '../ManagerNavigator';
import { DriverNavigator } from '../DriverNavigator';
import { useAppSelector } from 'hooks/useAppSelector';
import {
  selectCurrentPerson,
  selectIsAppLoading,
  selectIsAuthorizationFinished,
  selectUserRole
} from 'store/selectors';
import { linkingConfiguration } from './RootNavigator.consts';

export const RootNavigator = () => {
  const isLoading = useAppSelector(selectIsAppLoading);
  const person = useAppSelector(selectCurrentPerson);
  const userRole = useAppSelector(selectUserRole);
  const isAuthorizationFinished = useAppSelector(selectIsAuthorizationFinished);

  console.log('userRole: ', userRole);

  const renderNavigator = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (!person && !isAuthorizationFinished) {
      return <LoginNavigator />;
    } else if (person && isAuthorizationFinished && userRole === 'driver') {
      return <DriverNavigator />;
    } else if (person && isAuthorizationFinished && userRole === 'manager') {
      return <ManagerNavigator />;
    } else {
      return <LoginNavigator />;
    }
  };

  return (
    <NavigationContainer linking={linkingConfiguration}>
      {renderNavigator()}
    </NavigationContainer>
  );
};
