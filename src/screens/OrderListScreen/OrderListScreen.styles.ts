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
    },
    modal: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      margin: 0,
    },
    centeredView: {
      justifyContent: 'flex-end',
      backgroundColor: colors.white,
      paddingBottom: bottom || 16,
      paddingTop: 20,
      paddingHorizontal: 10,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    modalText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 28,
      color: colors.color2
    },
    modalControlButtons: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center'
    },
    primaryButton: {
      height: 32,
      width: 180,
      paddingHorizontal: 24,
      paddingVertical: 8,
      borderRadius: 50,
      marginRight: 16,
    },
    primaryButtonText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      color: colors.white,
      textTransform: 'none'
    },
    secondaryButton: {
      color: colors.red,
    }
  }), [bottom]);
};
