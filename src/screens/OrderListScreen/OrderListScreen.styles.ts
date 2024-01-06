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
      backgroundColor: 'transparent',
      paddingBottom: bottom
    },
    controlsContainer: {
      marginTop: 12,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    sortButton: {
      marginLeft: 8,
    },
    filter: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderWidth: 1,
      backgroundColor: colors.white,
      borderColor: colors.color5,
      justifyContent: 'center',
      alignItems: 'center',
    }
  }), [bottom]);
};
