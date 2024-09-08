import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      position: 'absolute',
      top: -8,
      right: -12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.red,
      height: 16,
      width: 16,
      borderRadius: 8,
      zIndex: 999,
    },
    text: {
      fontFamily: 'Roboto',
      fontSize: 10,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 12,
      letterSpacing: 0.1,
      textTransform: 'uppercase',
      color: colors.white
    }
  }), []);
};
