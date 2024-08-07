import React, { useCallback, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { LinkButton } from 'components/LinkButton';
import { Button } from 'components/Button';
import { useLoginNavigator } from 'navigation/hooks';
import { appStorage, STORAGE_KEYS } from 'services/appStorage';

import { useStyles } from './RegistrationScreen.styles';
import { DRIVER_PASSWORD, DRIVER_PHONE } from 'mocks/mockUsers';
import { networkService } from 'services/network';
import { AxiosError } from 'axios';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectDeviceToken } from 'store/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { setCurrentPerson, setManagerPhone, setUserRole } from 'store/slices';

export const RegistrationScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useLoginNavigator();
  const deviceToken = useAppSelector(selectDeviceToken);
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState<string>(DRIVER_PHONE);
  const [password, setPassword] = useState<string>(DRIVER_PASSWORD);

  const onRegisterPress = useCallback(async () => {
    try {
      if (!phone.trim().length || !password.trim().length) {
        return;
      }
      const { accessToken, refreshToken, user } = await networkService.register({
        phone: phone.replace('+', ''),
        password,
        fcmToken: deviceToken ?? ''
      });

      networkService.setAuthHeader(accessToken);

      await appStorage.storeData(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      await appStorage.storeData(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      await appStorage.storeData(STORAGE_KEYS.ROLE, user.role.name);

      dispatch(setUserRole(user.role.name));

      try {
        const { person = null } = await networkService.getUserData();

        if (person) {
          dispatch(setCurrentPerson(person));
        }

        const { phone: managerPhone } = await networkService.getDriverManagerPhone();

        if (managerPhone) {
          dispatch(setManagerPhone(managerPhone));
        }
      } catch (e) {
        console.log('registered user data upload error: ', e);
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log('registration screen error: ', error?.response?.data ?? error);
    }
  }, [phone, password, deviceToken, dispatch]);

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
    <Screen style={styles.screen} bottomContent={renderBottomContent()} hideLogout>
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
        <Button hasShadows onPress={onRegisterPress} title={t('Registration_button')} style={styles.button} />
      </View>
    </Screen>
  );
};
