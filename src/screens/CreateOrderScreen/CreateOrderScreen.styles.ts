import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from 'constants/colors';

export const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  return useMemo(() => StyleSheet.create({
    screen: {
      backgroundColor: colors.color6
    },
    container: {
      marginTop: 26,
      flex: 1
    },
    content: {
      backgroundColor: 'transparent',
      paddingBottom: bottom || 16
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
      letterSpacing: 0.2
    },
    section: {
      marginTop: 8
    },
    cargoRow: {
      marginTop: 8,
      columnGap: 8,
      flexDirection: 'row',
      alignItems: 'center'
    },
    cargoPicker: {
      flexBasis: 'auto',
      flexGrow: 1
    },
    cargoWeight: {
      minWidth: 70,
      flex: 1,
      flexBasis: 'auto',
      flexGrow: 0
    },
    weightStyle: {
      maxWidth: 70
    },
    weightTextStyle: {
      marginLeft: 0
    },
    addCargoContainer: {
      marginTop: 16,
      marginBottom: 8,
      alignItems: 'flex-end'
    },
    primaryButton: {
      marginTop: 24,
      borderRadius: 50
    },
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1
    },
    deleteButton: {
      paddingTop: 16,
    }
  }), [bottom]);
};