import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from 'constants/colors';
import { useStyles } from './Loader.styles';

export const Loader = () => {
  const styles = useStyles();

  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={colors.color2} />
    </View>
  );
};