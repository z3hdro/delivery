import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'constants/colors';

export const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    screen: {
      backgroundColor: colors.color6,
    },
    container: {
      flex: 1,
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    content: {
      paddingTop: 24,
      backgroundColor: 'transparent',
      paddingBottom: bottom
    },
    headerButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.color5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    delivery: {
      marginTop: 8,
    },
    infoBlock: {
      marginTop: 18,
    },
    button: {
      marginTop: 24,
      height: 50,
      borderRadius: 50,
      paddingVertical: 9,
      paddingHorizontal: 16
    },
    disabled: {
      marginTop: 24,
      height: 50,
      borderRadius: 50,
      paddingVertical: 9,
      paddingHorizontal: 16,
      backgroundColor: colors.color5
    },
    buttonText: {
      letterSpacing: 1,
      textAlign: 'center'
    },
    completeButton: {
      marginTop: 24,
      height: 50,
      borderRadius: 50,
      paddingVertical: 9,
      paddingHorizontal: 16,
      backgroundColor: colors.color2
    },
    declineButton: {
      marginTop: 8,
      height: 50,
      borderRadius: 50,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.color2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    declineButtonText: {
      letterSpacing: 1,
      color: colors.color2
    },
    declineButtonDisabled: {
      marginTop: 8,
      height: 50,
      borderRadius: 50,
      paddingVertical: 9,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.color5,
      borderColor: colors.color5,
      borderWidth: 1,
    },
    declineButtonTextDisabled: {
      letterSpacing: 1,
      color: colors.white
    }
  }), [bottom]);
};
