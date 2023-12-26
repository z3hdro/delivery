import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }), []);
};