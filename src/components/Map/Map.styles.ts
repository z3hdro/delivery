import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    map: {
      flex: 1,
      zIndex: 1,
      height: 320
    },
  }), []);
};