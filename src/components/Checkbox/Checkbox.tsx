import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

import { useStyles } from './Checkbox.styles';
import { Props } from './Checkbox.types';

import { CheckboxFilledIcon, CheckboxIcon } from 'assets/icons';


export const Checkbox: FC<Props> = ({
  isRequired = false,
  label,
  value,
  onPress,
  style,
  isError = false,
  errorText = '',
}) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, isError && styles.error, style]}>
        <View>
          {value ? (
            <CheckboxFilledIcon height={20} width={20} />
          ) : (
            <CheckboxIcon height={20} width={20} />
          )}
        </View>
        <Text style={styles.text}>
          {label}
        </Text>
      </View>
      {isError && errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </Pressable>
  );
};
