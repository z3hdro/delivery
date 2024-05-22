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
    headerButton: {
      height: 40,
      width: 40,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.color5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      marginTop: 16,
      flex: 1,
      backgroundColor: 'transparent',
      paddingBottom: bottom || 16
    },
    list: {
      flex: 1,
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    item: {
      justifyContent: 'center',
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 4,
      height: 40,
      paddingHorizontal: 14,
      paddingVertical: 4,
      marginBottom: 8,

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    itemText: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 18,
      textTransform: 'uppercase',
      color: colors.color2
    },
  }), [bottom]);
};