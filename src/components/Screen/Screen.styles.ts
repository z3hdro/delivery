import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { colors } from 'constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
  const { top, bottom } = useSafeAreaInsets();
  
  return useMemo(() => StyleSheet.create({
    container: {
      paddingTop: top,
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      position: 'relative',
    },
    logo: {
      top: top ? 0 : 16,
      alignItems: 'center'
    },
    bottom: {
      bottom: bottom + 12,
    }
  }), [bottom, top]);
};