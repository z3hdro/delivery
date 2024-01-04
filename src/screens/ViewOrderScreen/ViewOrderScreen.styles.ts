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
      marginTop: 28,
      flex: 1,
    },
    content: {
      paddingBottom: bottom || 16
    },
    map: {
      flex: 1,
      zIndex: 1,
      minHeight: 300,
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
    section: {
      marginTop: 8,
    },
    mapButtonContainer: {
      marginVertical: 28,
      alignItems: 'flex-end'
    },
    mapButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
    },
    primaryButton: {
      borderRadius: 50,
    },
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1,
    },
    secondaryButtonContainer: {
      marginTop: 16,
    },
    secondaryButton: {
      borderRadius: 50,
      backgroundColor: colors.color2,
      width: 'auto',
      flex: 1,
    },
    buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 8,
    }
  }), [bottom]);
};