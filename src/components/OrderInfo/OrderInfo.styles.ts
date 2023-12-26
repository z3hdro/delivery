import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    labelText: {
      color: colors.color7,
      fontFamily: 'Roboto',
      fontSize: 10,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 12,
      letterSpacing: 0.2,
    },
    descriptionText: {
      color: colors.color2,
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 28,
      letterSpacing: 0.2,
    },
    addressText: {
      textDecorationLine: 'underline',
      letterSpacing: 0.45,
    },
    contactNameText: {
      lineHeight: 22,
    },
    additionalText: {
      marginTop: 2,
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.45,
    },
    separator: {
      marginTop: 8,
      marginBottom: 10,
      width: '100%',
      height: 1,
      backgroundColor: colors.color6
    },
    contactItem: {
      marginTop: 12
    }
  }), []);
};
