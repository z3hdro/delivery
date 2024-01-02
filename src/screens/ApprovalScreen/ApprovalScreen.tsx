import React, { useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useAppData } from 'providers/AppProvider';
import { Screen } from 'components/Screen';
import { colors } from 'constants/colors';
import { useStyles } from './ApprovalScreen.styles';

import { WarningIcon } from 'src/assets/icons';

// TODO: remove later
import { useDriverNavigator } from 'navigation/hooks';
import { DISPLAY_MANAGER_PHONE } from 'mocks/mockUsers';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';

export const ApprovalScreen = () => {
  const { approveDriver } = useAppData();
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useDriverNavigator();

  // TODO: remove when API will be ready
  const onApprove = useCallback(async () => {
    approveDriver();
    await appStorage.storeData(STORAGE_KEYS.IS_APPROVED, 'true');
    navigate('OrderListScreen');
  }, [approveDriver, navigate]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Pressable onPress={onApprove}>
            <WarningIcon height={32} width={32} color={colors.white} />
          </Pressable>
          <Text style={styles.messageText}>
            {t('Approval_message')}
          </Text>
        </View>
        <Text style={styles.descriptionText}>
          {t('Approval_description')}
        </Text>
        <Text style={styles.phoneText}>
          {DISPLAY_MANAGER_PHONE}
        </Text>
      </View>
    </Screen>
  );
};