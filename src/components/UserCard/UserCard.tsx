import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { RoundButton } from 'components/RoundButton';
import { useStyles } from './UserCard.styles';
import { Props } from './UserCard.types';

export const UserCard: FC<Props> = ({
  user,
  t,
  onPress,
}) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {t('DriverList_waiting_approval_first_label')}
      </Text>
      <Text style={styles.value}>
        {user.phone}
      </Text>
      <RoundButton
        style={styles.button}
        textStyle={styles.buttonText}
        title={t('DriverList_waiting_approval_open_button')}
        onPress={onPress}
      />
    </View>
  );
};