import React, { FC, useCallback } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { useStyles } from './Screen.styles';
import { Props } from './Screen.types';
import { LogoIcon } from 'src/assets/icons';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { useAppData } from 'providers/AppProvider';

export const Screen: FC<Props> = ({ children, header, bottomContent, style }) => {
  const styles = useStyles();
  const { removeCurrentUser } = useAppData();

  // TODO: remove logout later and pressable
  const onLogout = useCallback(async () => {
    await appStorage.removeData(STORAGE_KEYS.USER_ID);
    await appStorage.removeData(STORAGE_KEYS.IS_APPROVED);
    removeCurrentUser();
  }, [removeCurrentUser]);

  // TODO: remove logout later and pressable
  const onDisplayAlert = useCallback(() => {
    Alert.alert(
      'Выйти из аккаунта', 
      'тестовый процесс logout', 
      [
        {
          text: 'Cancel'
        },
        { 
          text: 'Logout',
          onPress: onLogout
        }
      ]);
  }, [onLogout]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logo}>
        <Pressable onPress={onDisplayAlert}>
          <LogoIcon height={32} width={98} />
        </Pressable>
      </View>
      {header}
      {children}
      {bottomContent && (
        <View style={styles.bottom}>
          {bottomContent}
        </View>
      )}
    </View>
  );
};