import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Preloader } from 'components/Preloader';
import { LoginNavigator } from '../LoginNavigator';
import { ManagerNavigator } from '../ManagerNavigator';
import { DriverNavigator } from '../DriverNavigator';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentPerson, selectIsAppLoading, selectUserRole } from 'store/selectors';

export const RootNavigator = () => {
  const isLoading = useAppSelector(selectIsAppLoading);
  const person = useAppSelector(selectCurrentPerson);
  const userRole = useAppSelector(selectUserRole);

  console.log('userRole: ', userRole);

  const renderNavigator = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (!person) {
      return <LoginNavigator />;
    } else if (person && userRole === 'driver') {
      return <DriverNavigator />;
    } else if (person && userRole === 'manager') {
      return <ManagerNavigator />;
    } else {
      return <LoginNavigator />;
    }
  };

  return (
    <NavigationContainer>
      {renderNavigator()}
    </NavigationContainer>
  );
};
