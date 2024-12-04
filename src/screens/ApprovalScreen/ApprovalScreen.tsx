import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import useWebSocket from 'react-native-use-websocket';

import { Screen } from 'components/Screen';
import { formatPhoneNumber } from 'utils/phone';
import { networkService } from 'services/network';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useDriverNavigator } from 'navigation/hooks';
import { selectManagerPhone } from 'store/selectors';
import { setCurrentPerson } from 'store/slices';
import { colors } from 'constants/colors';
import { WEBSOCKET_URL } from 'constants/websocket';
import { WSOrderApprovedDriver } from 'types/websocket';

import { useStyles } from './ApprovalScreen.styles';

import { WarningIcon } from 'src/assets/icons';
import { RESET_ACTION } from 'navigation/actions/actions';
import { USER_STATUS } from 'constants/user';

export const ApprovalScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const managerPhone = useAppSelector(selectManagerPhone);
  const dispatch = useAppDispatch()

  const { dispatch: navigationDispatch } = useDriverNavigator();
  console.log('managerPhone: ', managerPhone);

  useWebSocket(WEBSOCKET_URL.DRIVER, {
    onOpen: () => console.log('ws opened on ApprovalScreen'),
    options: {
      headers: {
        Authorization: networkService.getAuthorizationToken(),
      }
    },
    onMessage: (e) => {
      const message = JSON.parse((e.data as string)) as WSOrderApprovedDriver;
      console.log('Received message:', message);
      if (message?.status) {
        if (message.status.toLowerCase() === USER_STATUS.APPROVED) {
          networkService.getUserData().then((response) => {
            const { person } = response;
            dispatch(setCurrentPerson(person));
            navigationDispatch(RESET_ACTION);
          })
        }
      }
    },
    onClose: (e) => console.log('ws closed', e),
    onError: (e) => console.log('ws error', e),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    reconnectAttempts: 5
  });

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <WarningIcon height={32} width={32} color={colors.white} />
          <Text style={styles.messageText}>
            {t('Approval_message')}
          </Text>
        </View>
        <Text style={styles.descriptionText}>
          {t('Approval_description')}
        </Text>
        <Text style={styles.phoneText}>
          {formatPhoneNumber(managerPhone ?? '')}
        </Text>
      </View>
    </Screen>
  );
};
