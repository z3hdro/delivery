import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLoginNavigator } from 'navigation/hooks';
import { networkService } from 'services/network';
import { Screen } from 'components/Screen';
import { Preloader } from 'components/Preloader';
import { FirstStep, SecondStep, ThirdStep } from './components';
import { NUMBER_OF_CELLS } from './ForgotPasswordScreen.consts';
import { useStyles } from './ForgotPasswordScreen.styles';
import {CONTAINS_LETTERS_REGEX, DIGIT_REGEX} from "constants/regex";
import {REGISTRATION_ERROR_TEXT} from "screens/RegistrationScreen/RegistrationScreen.consts";
import {AxiosError} from "axios";

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useLoginNavigator();

  const [step, setStep] = useState<number>(1);
  const [userPhone, setUserPhone] = useState<string>('');
  const [userCode, setUserCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const onSendCode = useCallback(async (phone: string) => {
    try {
      setIsLoading(true);
      const trimPhone = phone.trim();

      if (!trimPhone.length) {
        return;
      }

      if (!CONTAINS_LETTERS_REGEX.test(trimPhone)) {
        setErrorText('Registration_error_contain_words');
        return;
      }

      if ((trimPhone.match(DIGIT_REGEX) || []).length !== 11) {
        setErrorText('ShippingPointView_error_phone_length');
        return;
      }

      await networkService.recover(phone);

      setStep(2);
      setUserPhone(phone);
    } catch (e) {
      console.log('onSendCode error:', e);
      setErrorText((e as AxiosError)?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendCode = useCallback(async() => {
    if (!userPhone.trim().length) {
      return;
    }
    await onSendCode(userPhone);
  }, [onSendCode, userPhone]);

  const onSendConfirmCode = useCallback(async (code: string) => {
    try {
      setIsLoading(true);

      if (!userPhone.trim().length || code.length !== NUMBER_OF_CELLS) {
        return;
      }

      await networkService.checkcode({ phone: userPhone, code });
      setStep(3);
      setUserCode(code);

    } catch (e) {
      console.log('onSendConfirmCode error: ', e);
    } finally {
      setIsLoading(false);

    }
  }, [userPhone]);

  const restorePassword = useCallback(async (password: string, confirmPassword: string) => {
    try {
      setIsLoading(true);

      if (!password.trim().length || !confirmPassword.trim().length || password !== confirmPassword) {
        return;
      }

      await networkService.resetPassword({
        phone: userPhone,
        code: userCode,
        password,
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      goBack();

    } catch (e) {
      console.log('onSendConfirmCode error: ', e);
    } finally {
      setIsLoading(false);

    }
  }, [userPhone, userCode, goBack]);

  const onResetError = useCallback(() => {
    setErrorText(null);
  },[]);

  const renderContent = useCallback(() => {
    if (step === 1) {
      return <FirstStep
        onSendCode={onSendCode}
        errorText={errorText}
        onResetError={onResetError}
      />;
    }
    if (step === 2) {
      return <SecondStep
        userPhone={userPhone}
        resendCode={resendCode}
        onSendConfirmCode={onSendConfirmCode}
      />;
    }
    if (step === 3) {
      return <ThirdStep restorePassword={restorePassword} />;
    }
    return null;
  }, [
    errorText,
    onResetError,
    onSendCode,
    onSendConfirmCode,
    resendCode,
    restorePassword,
    step,
    userPhone
  ]);

  return (
    <Screen style={styles.screen} hideLogout>
      {isLoading && <Preloader style={styles.preloader} />}

      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {t('ForgotPassword_label')}
          </Text>
        </View>
        {renderContent()}
      </View>
    </Screen>
  );
};
