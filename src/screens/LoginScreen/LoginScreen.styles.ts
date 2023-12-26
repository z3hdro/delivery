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
    labelContainer: {
      marginTop: 68,
      marginBottom: 32,
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
      marginBottom: 8,
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
      lineHeight: 20,
      letterSpacing: 0.2,
    },
    linkContainer: {
      width: '100%',
      alignItems: 'flex-end'
    },
    button: {
      marginTop: 36,
    },
    bottomContainer: {
      alignItems: 'center'
    },
    bottomLink: {
      color: colors.red
    },
    bottomLabel: {
      color: colors.color7,
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.2,
    }
  }), [bottom]);
};