import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      marginBottom: 8,
      backgroundColor: colors.white,
      width: '100%',
      borderRadius: 4,
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 14,

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    section: {
      marginTop: 8
    },
    label: {
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0.2,
    },
    value: {
      color: colors.color2,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 28,
      letterSpacing: 0.2,
    },
    button: {
      marginTop: 8,
      minHeight: 34,
      width: '100%',
      paddingHorizontal: 16,
      paddingVertical: 7,
      borderWidth: 1,
      borderColor: colors.red,
    },
    buttonText: {
      color: colors.red,
      fontFamily: 'Roboto-Bold',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 1,
      textTransform: 'uppercase'
    },
  });
};