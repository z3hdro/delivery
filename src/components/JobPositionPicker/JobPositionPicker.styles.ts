import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    dropdown: {
      width: '100%',
      height: 42,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: colors.white,
    },
    text: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.4,
      color: colors.color2
    },
    error: {
      borderWidth: 1,
      borderColor: colors.red,
    },
    errorText: {
      marginTop: 4,
      color: colors.red,
      fontFamily: 'Roboto',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: 0.2,
    }
  }), []);
};
