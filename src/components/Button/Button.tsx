import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Props } from './Button.types';
import { useStyles } from './Button.styles.ts';

export const Button: FC<Props> = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  hasShadows = false,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[styles.container, hasShadows && styles.shadows, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};