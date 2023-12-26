import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    labelContainer: {
      marginTop: 68,
      height: 48,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    label: {
      fontFamily: 'Roboto-Bold',
      fontSize: 24,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 29,
      letterSpacing: 0.25,
    },
    textInputContainer: {
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
      lineHeight: 26,
      letterSpacing: 0.2,
    },
  }), []);
};