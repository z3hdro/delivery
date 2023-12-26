import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { colors } from 'constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
  const { top } = useSafeAreaInsets();
  
  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 10,
    },
    logo: {
      marginTop: top ? 0 : 16,
      alignItems: 'center'
    }
  }), [top]);
};