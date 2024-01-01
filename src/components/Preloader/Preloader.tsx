import React, { FC } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from 'constants/colors';
import { useStyles } from './Preloader.styles';
import { Props } from './Preloader.types';

export const Preloader: FC<Props> = ({ style }) => {
  const styles = useStyles();

  return (
    <View style={[styles.loader, style]}>
      <ActivityIndicator size={'large'} color={colors.color2} />
    </View>
  );
};