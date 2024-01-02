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
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    container: {
      marginTop: 26,
      flex: 1,
    },
    content: {
      backgroundColor: 'transparent',
      paddingBottom: bottom || 16
    },
    headerButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.color5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      marginLeft: 14,
      marginBottom: 2,
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.2,
    },
    section: {
      marginTop: 8,
    },
    primaryButton: {
      marginTop: 24,
      borderRadius: 50,
    },
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1,
    },
    secondaryButton: {
      borderRadius: 50,
      backgroundColor: colors.color2,
      width: 'auto',
      flex: 1,
    },
    buttonsContainer: {
      marginTop: 16,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 8,
    }
  }), [bottom]);
};