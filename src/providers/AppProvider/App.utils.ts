import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

// Notifications.setNotificationHandler({
//   handleNotification: async (notification) => {
//     console.log('handleNotification notification: ', notification);
//     return {
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     };
//   },
// });

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (Device.isDevice || Platform.OS === 'android') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    console.log('finalStatus p0:', finalStatus);

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
        },
      });
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    console.log('finalStatus p1:', finalStatus);

    token = (await Notifications.getDevicePushTokenAsync()).data as string;
    console.log('token: ', token);
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  return token;
};
