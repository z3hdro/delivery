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
import { INITIAL_ERROR_MAP, NETWORK_ERROR_TEXT, REGISTRATION_ERROR_TEXT } from './RegistrationScreen.consts';
import { CONTAINS_LETTERS_REGEX, DIGIT_REGEX } from 'constants/regex';
import { ErrorMap } from './RegistrationScreen.types';

export const RegistrationScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useLoginNavigator();
  const deviceToken = useAppSelector(selectDeviceToken);
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState<string>(DRIVER_PHONE);
  const [password, setPassword] = useState<string>(DRIVER_PASSWORD);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [isError, setIsError] = useState<ErrorMap>(INITIAL_ERROR_MAP);

  const onRegisterPress = useCallback(async (enteredPhone: string, enteredPassword: string) => {
    try {
      const trimPhone = enteredPhone.trim();
      const trimPassword = enteredPassword.trim();
      if (!trimPhone.length || !trimPassword.length) {
        return;
      }

      if (!CONTAINS_LETTERS_REGEX.test(trimPhone)) {
        setErrorText(REGISTRATION_ERROR_TEXT.PHONE_CONTAIN_WORDS);
        setIsError(prevState => ({ ...prevState, phone: true }));
        return;
      }

      if ((trimPhone.match(DIGIT_REGEX) || []).length !== 11) {
        setErrorText(REGISTRATION_ERROR_TEXT.PHONE_LENGTH);
        setIsError(prevState => ({ ...prevState, phone: true }));
        return;
      }

      if (trimPassword.length < 6) {
        setErrorText(REGISTRATION_ERROR_TEXT.PASSWORD_LENGTH);
        setIsError(prevState => ({ ...prevState, password: true }));
        return;
      }

      const { accessToken, refreshToken, user } = await networkService.register({
        phone: enteredPhone.replace('+', ''),
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
      if ((error?.response?.data as { message: string })?.message === NETWORK_ERROR_TEXT.USER_ALREADY_EXISTS) {
        setErrorText(REGISTRATION_ERROR_TEXT.USER_EXISTS);
      }
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
          onChangeText={(text) => {
            if (errorText) {
              setErrorText(null);
              setIsError(INITIAL_ERROR_MAP);
            }
            setPhone(text);
          }}
          style={[styles.textInputContainer, isError.phone && styles.errorField]}
          // keyboardType={'phone-pad'}
          placeholder={t('Registration_phone_input_placeholder')}
        />
        <TextInput
          value={password}
          onChangeText={(text) => {
            if (errorText) {
              setErrorText(null);
              setIsError(INITIAL_ERROR_MAP);
            }
            setPassword(text);
          }}
          style={[styles.textInputContainer, isError.password && styles.errorField]}
          placeholder={t('Registration_password_input_placeholder')}
          secureTextEntry
        />
        {errorText && (
          <Text style={styles.errorText}>{t(errorText)}</Text>
        )}
        <Button
          hasShadows
          onPress={() => onRegisterPress(phone, password)}
          title={t('Registration_button')}
          style={errorText ? styles.buttonWithError : styles.button}
        />
      </View>
    </Screen>
  );
};
