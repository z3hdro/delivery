import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLoginNavigator } from 'navigation/hooks';
import { Screen } from 'components/Screen';
import { NUMBER_OF_CELLS } from './ForgotPasswordScreen.consts';
import { useStyles } from './ForgotPasswordScreen.styles';
import { Preloader } from 'components/Preloader';
import { FirstStep, SecondStep, ThirdStep } from './components';

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useLoginNavigator();

  // TODO: change when API will be done
  const [step, setStep] = useState<number>(1);
  const [userPhone, setUserPhone] = useState<string>('');
  // const [errorText, setErrorText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSendCode = useCallback(async (phone: string) => {
    try {
      setIsLoading(true);
      if (!phone.trim().length) {
        return;
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      setStep(2);
      setUserPhone(phone);
    } catch (e) {
      console.log('onSendCode error:', e);
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

      if (code.length !== NUMBER_OF_CELLS) {
        return;
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
      setStep(3);

    } catch (e) {
      console.log('onSendConfirmCode error: ', e);
    } finally {
      setIsLoading(false);

    }
  }, []);

  const restorePassword = useCallback(async (password: string, confirmPassword: string) => {
    try {
      setIsLoading(true);

      if (!password.trim().length || !confirmPassword.trim().length || password !== confirmPassword) {
        return;
      }

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
  }, [goBack]);

  const renderContent = useCallback(() => {
    if (step === 1) {
      return <FirstStep onSendCode={onSendCode} />;
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
  }, [onSendCode, onSendConfirmCode, resendCode, restorePassword, step, userPhone]);

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