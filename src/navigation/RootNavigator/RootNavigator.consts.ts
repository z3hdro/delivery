import { LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

const config = {
  screens: {
    OrderListScreen: 'orderlist',
    OrderScreen: 'driverorder/:orderId',
    MainBottomTabNavigator: {
      screens: {
        CargoListScreen: 'order/:orderId',

      }
    },
  }
};

export const linkingConfiguration: LinkingOptions<any> = {
  prefixes: [prefix],
  config,
  async getInitialURL() {
    // First, you may want to do the default deep link handling
    // Check if app was opened from a deep link
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync();
    console.log('response from expo push notifications ', response);

    return response?.notification?.request?.content?.data?.url;
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('notification response: ', JSON.stringify(response));
      const url = response?.notification?.request?.content?.data?.url;

      // Any custom logic to see whether the URL needs to be handled
      //...

      // Let React Navigation handle the URL
      listener(url);
    });

    return () => {
      // Clean up the event listeners
      eventListenerSubscription.remove();
      subscription.remove();
    };
  },
};
