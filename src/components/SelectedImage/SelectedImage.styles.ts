import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return useMemo(() => StyleSheet.create({
    buttonContainer: {
      zIndex: 998,
    },
    deleteButton: {
      backgroundColor: colors.white,
      borderRadius: 10,
      position: 'absolute',
      zIndex: 999,
      top: -10,
      right: 0
    },
    imageContainer: {
      zIndex: 4,
    },
    selectedImage: {
      zIndex: 5,
      height: 48,
      width: 48,
      marginHorizontal: 10,
      borderRadius: 8
    }
  }), []);
};
