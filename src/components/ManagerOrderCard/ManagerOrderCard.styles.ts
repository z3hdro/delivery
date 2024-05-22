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
      paddingBottom: 12,
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
    infoContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    cell: {
      width: '33%',
    },
    infoLabel: {
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: 0.2,
      fontSize: 10,
      lineHeight: 12,
    },
    infoValue: {
      color: colors.color2,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: 0.2,
      fontSize: 16,
      lineHeight: 28,
    },
    button: {
      marginTop: 16,
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
