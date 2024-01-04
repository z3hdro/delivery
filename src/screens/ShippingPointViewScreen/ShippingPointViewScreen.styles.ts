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
    header: {
      marginTop: 12,
    },
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    container: {
      marginTop: 26,
      flex: 1,
    },
    content: {
      backgroundColor: 'transparent',
      paddingBottom: bottom || 16
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
    label: {
      marginLeft: 14,
      marginBottom: 2,
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 14,
      letterSpacing: 0.2,
    },
    section: {
      backgroundColor: colors.white,
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,

      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,

      elevation: 2,
    },
    block: {
      marginTop: 8
    },
    nameLabel: {
      marginLeft: 0,
      marginBottom: 0,
    },
    nameTextInput: {
      paddingHorizontal: 0,
      fontSize: 18,
      lineHeight: 24,
    },
    addPoint: {
      marginTop: 16,
      alignItems: 'flex-end',
    },
    primaryButton: {
      marginTop: 24,
      borderRadius: 50,
    },
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1,
    },
    secondaryButton: {
      borderRadius: 50,
      backgroundColor: colors.color2,
      width: 'auto',
      flex: 1,
    },
    buttonsContainer: {
      marginTop: 16,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: 8,
    },
    addressBlock: {
      flex: 1,
    },
    addressTextInput: {
      backgroundColor: colors.color6,
    },
    contactBlock: {
      flex: 1,
    },
    deleteButtonContainer: {
      marginTop: 24,
      alignItems: 'center',
    },
    deleteButton: {
      paddingVertical: 4,
      paddingHorizontal: 20,
    },
    deleteButtonText: {
      marginLeft: 4,
    }
  }), [bottom]);
};