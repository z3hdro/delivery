import React, { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { LinkButton } from 'components/LinkButton';
import { Button } from 'components/Button';
import { useLoginNavigator } from 'navigation/hooks';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';
import { useAppData } from 'providers/AppProvider';

import { useStyles } from './RegistrationScreen.styles';
import { DRIVER_PASSWORD, DRIVER_PHONE } from 'mocks/mockUsers';

export const RegistrationScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useLoginNavigator();
  const { setCurrentUser } = useAppData();

  const [phone, setPhone] = useState<string>(DRIVER_PHONE);
  const [password, setPassword] = useState<string>(DRIVER_PASSWORD);

  // TODO: change when API will be done
  const onRegisterPress = useCallback(async () => {
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

  const onLoginPress = useCallback(() => {
    navigate('LoginScreen');
  }, [navigate]);

  const renderBottomContent = () => {
    return (
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomLabel}>{t('Registration_bottom_label')}</Text>
        <LinkButton
          onPress={onLoginPress}
          title={t('Registration_bottom_button')}
          customTextStyle={styles.bottomLink}
        />
      </View>
    );
  };

  return (
    <Screen style={styles.screen} bottomContent={renderBottomContent()}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {t('Registration_label')}
          </Text>
        </View>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.textInputContainer}
          keyboardType={'phone-pad'}
          placeholder={t('Registration_phone_input_placeholder')}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.textInputContainer}
          placeholder={t('Registration_password_input_placeholder')}
          secureTextEntry
        />
        <Button onPress={onRegisterPress} title={t('Registration_button')} style={styles.button} />
      </View>
    </Screen>
  );
};
