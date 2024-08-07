import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';

import { RoundButton } from 'components/RoundButton';
import { formatPhoneNumber } from 'utils/phone';
import { useStyles } from './DriverCard.styles';
import { Props } from './DriverCard.types';

export const DriverCard: FC<Props> = ({
  driver,
  t,
  onPress,
}) => {
  const styles = useStyles();

  const driverName = useMemo(() =>
    `${driver.surname ?? ''} ${driver.name ?? ''} ${driver.patronymic ?? ''}`.trim()
  , [driver]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {t('DriverList_approved_first_label')}
      </Text>
      <Text style={styles.value}>
        {driverName || '-'}
      </Text>
      <Text style={[styles.label, styles.section]}>
        {t('DriverList_approved_second_label')}
      </Text>
      <Text style={styles.value}>
        {formatPhoneNumber(driver.user.phone)}
      </Text>
      <RoundButton
        style={styles.button}
        textStyle={styles.buttonText}
        title={t('DriverList_approved_view_button')}
        onPress={onPress}
      />
    </View>
  );
};
