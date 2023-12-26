import React, { useCallback, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { LinkButton } from 'components/LinkButton';
import { Button } from 'components/Button';
import { useLoginNavigator } from 'navigation/hooks';
import { useStyles } from './LoginScreen.styles';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { useAppData } from 'providers/AppProvider';
import { DRIVER_PASSWORD, MANAGER_PHONE } from 'mocks/mockUsers';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useLoginNavigator();
  const { setCurrentUser } = useAppData();

  // TODO: change when API will be done
  const [phone, setPhone] = useState<string>(MANAGER_PHONE);
  const [password, setPassword] = useState<string>(DRIVER_PASSWORD);

  const onForgotPassword = useCallback(() => {
    console.log('forgot password');
  }, []);

  // TODO: change when API will be done
  const onLoginPress = useCallback(async () => {
    try {
      if (!phone.trim().length || !password.trim().length) {
        return;
      }
      await appStorage.storeData(STORAGE_KEYS.USER_ID, phone);
      setCurrentUser(phone);
    } catch (e) {
      console.log(e);
    }
  }, [password, phone, setCurrentUser]);

  const onRegisterPress = useCallback(() => {
    navigate('RegistrationScreen');
  }, [navigate]);

  const renderBottomContent = () => {
    return (
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomLabel}>{t('Login_bottom_label')}</Text>
        <LinkButton onPress={onRegisterPress} title={t('Login_bottom_button')} customTextStyle={styles.bottomLink} />
      </View>
    );
  };

  return (
    <Screen style={styles.screen} bottomContent={renderBottomContent()}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {t('Login_label')}
          </Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.textInputContainer}
          keyboardType={'phone-pad'}
          placeholder={t('Login_phone_input_placeholder')}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.textInputContainer}
          placeholder={t('Login_password_input_placeholder')}
          secureTextEntry
        />
        <View style={styles.linkContainer}>
          <LinkButton title={t('Login_forgot_password_button')} onPress={onForgotPassword} />
        </View>
        <Button onPress={onLoginPress} title={t('Login_button')} style={styles.button} />
      </View>
    </Screen>
  );
};