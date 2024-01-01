import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Preloader } from 'src/components/Preloader';
import { useAppData } from 'providers/AppProvider';
import { LoginNavigator } from './LoginNavigator';
import { ManagerNavigator } from './ManagerNavigator';
import { DriverNavigator } from './DriverNavigator';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { MANAGER_PHONE } from 'mocks/mockUsers';

export const RootNavigator = () => {
  const { userId, setCurrentUser, approveDriver } = useAppData();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        const userId = await appStorage.getData(STORAGE_KEYS.USER_ID);
        const isApproved = await appStorage.getData(STORAGE_KEYS.IS_APPROVED);
        if (userId) {
          setCurrentUser(userId);
        }
        if (isApproved) {
          approveDriver();
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
        
      }
    })();
  }, [approveDriver, setCurrentUser]);
  const renderNavigator = () => {
    if (isLoading) {
      return <Preloader />;
    } else if (!userId) {
      return <LoginNavigator />;
    } else if (userId === MANAGER_PHONE) {
      return <ManagerNavigator />;
    } else {
      return <DriverNavigator />;
    }

  };

  return (
    <NavigationContainer>
      {renderNavigator()}
    </NavigationContainer>
  );
};