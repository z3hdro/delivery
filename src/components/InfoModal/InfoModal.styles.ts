import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'constants/colors';

export const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1,
      color: colors.red
    },
    modal: {
      backgroundColor: 'transparent',
      justifyContent: 'flex-end',
      margin: 0
    },
    centeredView: {
      justifyContent: 'flex-end',
      backgroundColor: colors.white,
      paddingBottom: bottom || 16,
      paddingTop: 18,
      paddingHorizontal: 20,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4
    },
    modalNomenclature: {
      marginBottom: 16,
      fontFamily: 'Roboto-Bold',
      fontWeight: '600',
      fontStyle: 'normal',
      fontSize: 18,
      lineHeight: 26,
      color: colors.color2
    },
    logisticPoint: {
      marginBottom: 12,
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: 18,
      lineHeight: 24,
      color: colors.color2
    },
    label: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: 10,
      lineHeight: 12,
      letterSpacing: 0.2,
      color: colors.color7
    },
    description: {
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: 16,
      lineHeight: 20,
      letterSpacing: 0.45,
      color: colors.color2
    },
    dateContainer: {
      borderColor: colors.color6,
      borderTopWidth: 1,
      marginTop: 8,
      paddingTop: 10,
      marginBottom: 16,
    },
    modalButton: {
      borderRadius: 50,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.red
    },
  }), [bottom]);
};