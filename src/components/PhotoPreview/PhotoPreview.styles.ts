import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useStyles = () => {
  const { top, bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: top,
      paddingBottom: bottom,
    },
    fullImage: {
      width: '100%',
      height: '70%',
    },
    closeButton: {
      fontSize: 20,
      color: 'blue',
      padding: 10,
    },
    previewButton: {
      marginTop: 16,
      height: 42,
      paddingHorizontal: 24,
    },
    previewButtonText: {
      fontFamily: 'Roboto-Bold',
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 1,
      color: colors.color2,
      textTransform: 'uppercase'
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
  }), [top, bottom]);
};
