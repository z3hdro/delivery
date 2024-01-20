import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'constants/colors';

export const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    screen: {
      paddingBottom: bottom
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    labelContainer: {
      marginTop: 68,
      marginBottom: 16,
      height: 48,
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
      color: colors.color2
    }
  }), [bottom]);
};