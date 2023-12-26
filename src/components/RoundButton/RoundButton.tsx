import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Props } from './RoundButton.types';
import { useStyles } from './RoundButton.styles';

export const RoundButton: FC<Props> = ({
  title,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.button, style]}>
      {leftIcon ?? null}
      <Text style={[styles.text, !!leftIcon && styles.leftIcon, !!rightIcon && styles.rightIcon, textStyle]}>
        {title}
      </Text>
      {rightIcon ?? null}
    </TouchableOpacity>
  );
};
