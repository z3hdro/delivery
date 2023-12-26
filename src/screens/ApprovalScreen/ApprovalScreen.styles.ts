import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'constants/colors';

export const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    screen: {
      paddingBottom: bottom
    },
    messageContainer: {
      width: '100%',
      paddingTop: 32,
      paddingBottom: 40,
      backgroundColor: colors.red,
      borderRadius: 4,
      alignItems: 'center',

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    messageText: {
      width: 251,
      marginTop: 16,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 26,
      color: colors.white
    },
    descriptionText: {
      marginTop: 24,
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
      color: colors.color2
    },
    phoneText: {
      marginTop: 4,
      textAlign: 'center',
      fontFamily: 'Roboto-Bold',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
      color: colors.color2
    }
  }), [bottom]);
};