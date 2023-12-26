import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      height: 48,
      width: '100%',
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    },
    titleContainer: {
      flexGrow: 1,
      alignItems: 'center',
    },
    empty: {
      width: 40,
      height: 40,
    },
    title: {
      marginBottom: 2,
      fontFamily: 'Roboto-Bold',
      fontStyle: 'normal',
      fontWeight: '500',
      letterSpacing: 0.25,
      lineHeight: 28,
      fontSize: 24,
      color: colors.color2
    }
  }), []);
};
