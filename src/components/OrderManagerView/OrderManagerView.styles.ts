import { StyleSheet } from 'react-native';
import { colors } from 'constants/colors';

export const useStyles = () => {
  return StyleSheet.create({
    destinationContainer: {
      marginBottom: 12,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    cell: {
      flexGrow: 1,
      width: '33%'
    },
    price: {
      color: colors.color7,
      fontFamily: 'Roboto',
      fontSize: 10,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 12,
      letterSpacing: 0.2,
    },
    city: {
      marginTop: 2,
      color: colors.color2,
      fontFamily: 'Roboto',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 26,
    },
    rightCityDescription: {
      alignItems: 'flex-end'
    },
    route: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    routeLabel: {
      color: colors.color2,
      fontFamily: 'Roboto',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 14,
      letterSpacing: 0.2,
    },
    cash: {
      fontSize: 14,
      lineHeight: 16,
    }
  });
};
