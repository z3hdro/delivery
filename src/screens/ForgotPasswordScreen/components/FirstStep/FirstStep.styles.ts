import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    descriptionContainer: {
      marginHorizontal: 16,
      marginBottom: 16,
    },
    description: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.2,
      color: colors.color2,
      textAlign: 'center',
    },
    inputLabel: {
      marginHorizontal: 16,
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.2,
      color: colors.color7,
    },
    textInputContainer: {
      marginBottom: 8,
      height: 56,
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: colors.color6,
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 20,
      letterSpacing: 0.2,
    },
    button: {
      marginTop: 36,
    },
  }), []);
};