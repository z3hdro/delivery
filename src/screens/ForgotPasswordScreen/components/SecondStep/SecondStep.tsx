import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { LinkButton } from 'components/LinkButton';
import { formatPhoneNumber } from 'utils/phone';
import { NUMBER_OF_CELLS } from '../../ForgotPasswordScreen.consts';
import { TIMER_COUNT } from './SecondStep.consts';
import { useStyles } from './SecondStep.styles';
import { Props } from './SecondStep.types';

export const SecondStep: FC<Props> = ({
  userPhone,
  resendCode,
  onSendConfirmCode
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [time, setTime] = React.useState(TIMER_COUNT);
  const timerRef = React.useRef(time);

  const ref = useBlurOnFulfill({ value, cellCount: NUMBER_OF_CELLS });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const phone = useMemo(() => formatPhoneNumber(userPhone), [userPhone]);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
        setIsDisabled(false);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (value.length === NUMBER_OF_CELLS) {
      void (async () => {
        await onSendConfirmCode(value);
      })();
    }
  }, [onSendConfirmCode, value]);

  return (
    <>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {t('ForgotPassword_code_description', { phone })}
        </Text>
      </View>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={(text: string) => {
          if (isError) {
            setIsError(false);
          }
          setValue(text);
        }}
        cellCount={NUMBER_OF_CELLS}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View key={index} style={styles.cellContainer}>
            <Text
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor/> : null)}
            </Text>
          </View>
        )}
      />
      <View style={styles.linkContainer}>
        <LinkButton
          disabled={isDisabled}
          customTextStyle={time < 1 ? styles.activeLink : undefined}
          title={time > 0 ?
            t('ForgotPassword_retry_button_timer', { time })
            : t('ForgotPassword_retry_button')
          }
          onPress={resendCode} />
      </View>
    </>
  );
};