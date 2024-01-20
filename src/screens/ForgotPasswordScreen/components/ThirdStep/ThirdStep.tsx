import React, { FC, useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Button';
import { useStyles } from './ThirdStep.styles';
import { Props } from './ThirdStep.types';

export const ThirdStep: FC<Props> = ({ restorePassword }) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const onPress = useCallback(async() => {
    if (!password.trim().length || !confirmPassword.trim().length) {
      setErrorText('ForgotPassword_error_password_empty');
      return;
    }

    if (password !== confirmPassword) {
      setErrorText('ForgotPassword_error_password');
      return;
    }

    await restorePassword(password, confirmPassword);
  }, [restorePassword, password, confirmPassword]);

  return (
    <>
      <View>
        <Text style={styles.inputLabel}>
          {t('ForgotPassword_password_input_label')}
        </Text>
        <TextInput
          value={password}
          onChangeText={(text: string) => {
            if (errorText) {
              setErrorText('');
            }
            setPassword(text);
          }}
          style={styles.textInputContainer}
          secureTextEntry
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.inputLabel}>
          {t('ForgotPassword_password_confirm_input_label')}
        </Text>
        <TextInput
          value={confirmPassword}
          onChangeText={(text: string) => {
            if (errorText) {
              setErrorText('');
            }
            setConfirmPassword(text);
          }}
          style={styles.textInputContainer}
          secureTextEntry
        />
        {!!errorText && (
          <Text style={styles.errorText}>
            {t(errorText)}
          </Text>
        )}
        <Button
          hasShadows
          onPress={onPress}
          title={t('ForgotPassword_restore_button')}
          style={styles.button}
        />
      </View>
    </>
  );
};