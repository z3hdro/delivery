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
    list: {
      paddingBottom: bottom
    },
    container: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    tabBar: {
      marginTop: 28,
      marginBottom: 16,
    },
    tabText: {
      width: 'auto'
    },
  }), [bottom]);
};