import { Platform } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('');
console.log('prefix: ', prefix);

const config = {
  screens: {
    OrderListScreen: 'orderlist/:orderId?',
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

    console.log('url on getInitialURL: ', url);

    if (url != null) {
      return url;
    }

    // Handle URL from expo push notifications
    const response = await Notifications.getLastNotificationResponseAsync() as any;
    console.log('response from expo push notifications ', response);

    const deepLinkUrl = Platform.OS === 'android' ?
      (response as any)?.notification?.request?.trigger?.remoteMessage?.data?.url :
      (response as any)?.notification?.request?.trigger?.payload?.url;

    if (deepLinkUrl) {
      console.log('deepLinkUrl: ', deepLinkUrl);
      return deepLinkUrl;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({ url }: { url: string }) => listener(url);

    // Listen to incoming links from deep linking
    const eventListenerSubscription = Linking.addEventListener('url', onReceiveURL);

    // Listen to expo push notifications
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('notification response: ', JSON.stringify(response));
      const url = Platform.OS === 'android' ?
        (response as any)?.notification?.request?.trigger?.remoteMessage?.data?.url :
        (response as any)?.notification?.request?.trigger?.payload?.url;


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
