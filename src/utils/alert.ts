import { Alert } from 'react-native';
import i18next from 'i18next';

export const displayErrorMessage = (message: string): void => {
  Alert.alert(
    i18next.t('Error_alert_title'),
    message,
    [
      { text: i18next.t('ok'), style: 'destructive' },
    ]);
};
