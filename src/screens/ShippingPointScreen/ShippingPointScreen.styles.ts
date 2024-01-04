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
      marginTop: 16,
      flex: 1,
      backgroundColor: 'transparent',
      paddingBottom: bottom || 16
    },
    header: {
      marginTop: 14,
      height: 60,
    },
    title: {
      maxWidth: 300,
    },
    titleText: {
      textAlign: 'center',
    },
    addPoint: {
      alignItems: 'flex-end',
    },
    list: {
      marginTop: 16,
    },
    itemContainer: {
      justifyContent: 'center',
      width: '100%',
      backgroundColor: colors.white,
      borderRadius: 4,
      paddingHorizontal: 14,
      paddingVertical: 8,
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
    label: {
      marginBottom: 2,
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 10,
      lineHeight: 12,
    },
    value: {
      marginBottom: 2,
      color: colors.color2,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 18,
      lineHeight: 26,
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    section: {
      marginTop: 8,
    }
  }), [bottom]);
};