import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const createStyles = (bottom: number) => {
  return StyleSheet.create({
    container: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
    },
    tabContainer: {
      flex: 1,
      minHeight: 72,
      paddingBottom: bottom,
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    content: {
      marginTop: 12,
      alignItems: 'center',
    },
    labelText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: 8,
      lineHeight: 10,
      textAlign: 'center',
    },
    labelFocused: {
      marginTop: 6,
      color: colors.red,
    },
    labelBlur: {
      marginTop: 6,
      color: colors.color7,
    },
  });
};
