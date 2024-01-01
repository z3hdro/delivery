import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    label: {
      marginLeft: 14,
      marginBottom: 2,
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.2,
    },
    textInput: {
      width: '100%',
      height: 42,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: colors.white,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.4,
      textTransform: 'uppercase',
      color: colors.color2
    },
  }), []);
};