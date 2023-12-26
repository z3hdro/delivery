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
      alignItems: 'center',

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    iconContainer: {
      marginTop: -20,
      alignItems: 'center',
    },
    track: {
      marginBottom: -6
    },
    nomenclature: {
      marginTop: 8,
      color: colors.color2,
      fontFamily: 'Roboto-Bold',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '600',
      lineHeight: 26,
    },
    statusLabel: {
      marginTop: 14,
      color: colors.color7,
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 18,
    },
    statusText: {
      marginTop: 8,
      color: colors.color2,
      fontFamily: 'Roboto-Bold',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: 16,
      letterSpacing: 1,
      textTransform: 'uppercase'
    },
    statusApprovalText: {
      color: colors.red
    },
    button: {
      marginTop: 10,
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