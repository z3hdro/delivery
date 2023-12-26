import React, { FC } from 'react';
import { View } from 'react-native';

import { useStyles } from './Screen.styles';
import { Props } from './Screen.types';
import { LogoIcon } from 'assets/images';

export const Screen: FC<Props> = ({ children, style }) => {
  const styles = useStyles();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.logo}>
        <LogoIcon height={32} width={98} />
      </View>
      {children}
    </View>
  );
};