import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    container: {
      width: '100%',
      minHeight: 60,
      borderRadius: 4,
      paddingLeft: 10,
      paddingRight: 20,
      backgroundColor: colors.white,

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    expandedContainer: {
      paddingBottom: 17,
    },
    labelContainer: {
      paddingVertical: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labelText: {
      fontFamily: 'Roboto',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 24,
      color: colors.color2
    },
    disabledLabelText: {
      color: colors.color5
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