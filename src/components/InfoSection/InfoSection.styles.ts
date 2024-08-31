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
    valueContainer: {
      width: '100%',
      paddingVertical: 4,
      height: 42,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: colors.white,
      justifyContent: 'center',
    },
    value: {
      overflow: 'hidden',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.4,
      color: colors.color2
    },
    textInput: {
      paddingVertical: 4,
      height: 42,
      paddingHorizontal: 16,
      borderRadius: 4,
      backgroundColor: colors.white,
      overflow: 'hidden',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 18,
      letterSpacing: 0.4,
      color: colors.color2
    },
    displayText: {
      textTransform: 'uppercase',
    },
    required: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      color: colors.red,
    },
    error: {
      borderWidth: 1,
      borderColor: colors.red,
    },
    errorText: {
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
