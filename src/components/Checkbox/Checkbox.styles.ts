import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      width: '100%',
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.color5,
      backgroundColor: 'transparent',
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      height: 42,
    },
    text: {
      marginLeft: 10,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 28,
      letterSpacing: 0.2,
      color: colors.color2
    }
  }), []);
};