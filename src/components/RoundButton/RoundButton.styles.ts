import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    button: {
      height: 32,
      borderRadius: 50,
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.color5,
    },
    text: {
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.2,
      color: colors.color2
    },
    leftIcon: {
      marginLeft: 8,
    },
    rightIcon: {
      marginRight: 8,
    }
  }), []);
};