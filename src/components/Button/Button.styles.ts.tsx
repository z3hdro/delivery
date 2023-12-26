import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      width: '100%',
      height: 48,
      borderRadius: 4,
      backgroundColor: colors.red,
      justifyContent: 'center',
      alignItems: 'center',

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontFamily: 'Roboto',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 0.1,
      textTransform: 'uppercase',
      color: colors.white
    }
  }), []);
};