import React, { FC, useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Button';
import { useStyles } from './FirstStep.styles';
import { Props } from './FirstStep.types';

export const FirstStep: FC<Props> = ({ onSendCode }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [phone, setPhone] = useState<string>('');
  
  const onPress = useCallback(async () => {
    await onSendCode(phone);
  }, [onSendCode, phone]);

  return (
    <>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {t('ForgotPassword_description')}
        </Text>
      </View>
      <Text style={styles.inputLabel}>
        {t('ForgotPassword_phone_input_label')}
      </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={styles.textInputContainer}
        keyboardType={'phone-pad'}
        placeholder={t('ForgotPassword_phone_input_placeholder')}
      />
      <Button hasShadows onPress={onPress} title={t('ForgotPassword_send_button')} style={styles.button} />
    </>
  );
};