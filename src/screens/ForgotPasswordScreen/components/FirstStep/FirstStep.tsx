import React, { FC, useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MaskedTextInput } from 'react-native-mask-text';

import { Button } from 'components/Button';
import { PHONE_MASK } from 'constants/user';
import { useStyles } from './FirstStep.styles';
import { Props } from './FirstStep.types';

export const FirstStep: FC<Props> = ({ onSendCode, errorText, onResetError }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [phone, setPhone] = useState<string>('');
  const [formattedPhone, setFormattedPhone] = useState<string>('');

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
      <MaskedTextInput
        mask={PHONE_MASK}
        onChangeText={(text, rawText) => {
          if (errorText) {
            onResetError();
          }
          setFormattedPhone(text);
          setPhone(rawText);
        }}
        placeholder={t('ForgotPassword_phone_input_placeholder')}
        value={formattedPhone}
        style={styles.textInputContainer}
        keyboardType={'phone-pad'}
      />
      {errorText && (
        <Text style={styles.errorText}>{t(errorText)}</Text>
      )}
      <Button
        style={styles.button}
        hasShadows
        disabled={!!errorText}
        onPress={onPress}
        title={t('ForgotPassword_send_button')}
      />
    </>
  );
};
