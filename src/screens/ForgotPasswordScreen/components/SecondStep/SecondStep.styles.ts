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
    codeFieldRoot: {
      marginTop: 16,
      justifyContent: 'center',
      columnGap: 8,
    },
    cellContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 5,
      // borderWidth: 2,
      // borderColor: colors.color5,
      backgroundColor: colors.color6,
    },
    cell: {
      fontFamily: 'Roboto-Bold',
      fontWeight: '500',
      fontSize: 24,
      lineHeight: 30,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: colors.color2,
    },
    linkContainer: {
      marginTop: 24,
      width: '100%',
      alignItems: 'center'
    },
    activeLink: {
      color: colors.red,
    }
  }), []);
};