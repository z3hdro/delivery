import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { useStyles } from './LoginScreen.styles';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {t('Login_label')}
          </Text>
        </View>
        <TextInput value={phone} onChangeText={setPhone} style={styles.textInputContainer} keyboardType={'phone-pad'} placeholder={t('Login_phone_input_placeholder')}/>
        <TextInput />
      </View>
    </Screen>
  );
};