import React, { FC } from 'react';
import { View, Text, Pressable } from 'react-native';

import { useStyles } from './Checkbox.styles';
import { Props } from './Checkbox.types';

import { CheckboxFilledIcon, CheckboxIcon } from 'assets/icons';


export const Checkbox: FC<Props> = ({
  label,
  value,
  onPress,
  style,
}) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, style]}>
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
    </Pressable>
  );
};