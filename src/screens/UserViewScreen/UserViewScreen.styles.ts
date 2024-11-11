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
    avoidingContainer: {
      flex: 1,
    },
    container: {
      marginTop: 26,
      flex: 1,
    },
    content: {
      backgroundColor: 'transparent',
      paddingBottom: bottom + 16
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
    preloader: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 10
    },
    titleText: {
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0.25,
      width: 220,
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
      marginTop: 8,
    },
    photoSection: {
      marginTop: 18,
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      rowGap: 18,
      columnGap: 12,
    },
    jobPositionSection: {
      marginTop: 16,
    },
    companySection: {
      backgroundColor: colors.color6,
    },
    buttonSection: {
      marginTop: 18,
    },
    companyContainer: {
      marginTop: 8,
      borderRadius: 4,
      backgroundColor: colors.white,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    sectionTitle: {
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 8,
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: 18,
      lineHeight: 22,
      letterSpacing: 0.25,
      color: colors.color2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 8,
    },
    rowItem: {
      minWidth: '50%',
      marginTop: 8,
      flexGrow: 1,
    },
    addPhotoButton: {
      marginTop: 6,
      height: 34,
    },
    addPhotoButtonText: {
      fontFamily: 'Roboto-Bold',
      fontWeight: '500',
      fontStyle: 'normal',
      fontSize: 14,
      lineHeight: 16,
      letterSpacing: 1,
      color: colors.color2,
      textTransform: 'uppercase'
    },
    primaryButton: {
      borderRadius: 50,
    },
    primaryButtonText: {
      fontFamily: 'Roboto-Bold',
      letterSpacing: 1,
    },
    secondaryButton: {
      marginTop: 16,
      borderRadius: 50,
      backgroundColor: colors.color2,
    },
    required: {
      color: colors.red,
    },
    errorText: {
      marginVertical: 4,
      color: colors.red,
      fontFamily: 'Roboto',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 16,
      letterSpacing: 0.2,
    }
  }), [bottom]);
};
