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
      alignItems: 'center',
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
      paddingHorizontal: 16,
    },
    disabled: {
      marginTop: 24,
      height: 50,
      borderRadius: 50,
      paddingVertical: 9,
      paddingHorizontal: 16,
      backgroundColor: colors.color5,
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
    }
  }), [bottom]);
};
