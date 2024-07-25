import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { formatPhoneNumber } from 'utils/phone';
import { colors } from 'constants/colors';
import { useStyles } from './ApprovalScreen.styles';

import { WarningIcon } from 'src/assets/icons';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectManagerPhone } from 'store/selectors';

export const ApprovalScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const managerPhone = useAppSelector(selectManagerPhone);
  console.log('managerPhone: ', managerPhone);

  useEffect(() => {

  }, []);

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
