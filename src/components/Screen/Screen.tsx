import React, { FC, useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useStyles } from './Screen.styles';
import { Props } from './Screen.types';
import { LogoIcon, LogoutIcon } from 'src/assets/icons';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { useAppData } from 'providers/AppProvider';

export const Screen: FC<Props> = ({
  children,
  header,
  bottomContent,
  style,
  hideLogout = false
}) => {
  const styles = useStyles();
  const { removeCurrentPerson } = useAppData();

  // TODO: remove logout later and pressable
  const onLogout = useCallback(async () => {
    await appStorage.removeData(STORAGE_KEYS.ACCESS_TOKEN);
    await appStorage.removeData(STORAGE_KEYS.REFRESH_TOKEN);
    await appStorage.removeData(STORAGE_KEYS.ROLE);
    removeCurrentPerson();
  }, [removeCurrentPerson]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logo}>
        <View>
          <LogoIcon height={32} width={98} />
        </View>
        {!hideLogout && (
          <TouchableOpacity style={styles.logout} onPress={onLogout}>
            <LogoutIcon height={15} width={15} />
          </TouchableOpacity>
        )}
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