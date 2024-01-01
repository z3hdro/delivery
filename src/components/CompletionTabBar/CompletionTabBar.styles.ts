import { colors } from 'constants/colors';
import { StyleSheet } from 'react-native';

export const useStyles = () => {

  return StyleSheet.create({
    tabBarContainer: {
      flexDirection: 'row',
      overflow: 'hidden',
      alignItems: 'center',
    },
    tabsContainer: {
      width: '100%',
      backgroundColor: colors.transparent,
      elevation: 0,
      height: 50,
      flexShrink: 1,
    },
    tabItem: {
      flex: 1,
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.color7,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tabItemActive: {
      backgroundColor: colors.red
    },
    tabText: {
      width: 100,
      textAlign: 'center',
      color: colors.color7,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
      letterSpacing: 0.2,
      fontSize: 12,
      lineHeight: 14
    },
    tabTextActive: {
      color: colors.white
    }
  });
};
