import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    link: {
      color: colors.color7,
      fontFamily: 'Roboto-Bold',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.4,
      textDecorationLine: 'underline'
    }
  }), []);
};