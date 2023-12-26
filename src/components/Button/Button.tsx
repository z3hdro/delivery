import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Props } from './Button.types';
import { useStyles } from './Button.styles.ts';

export const Button: FC<Props> = ({ onPress, title, style }) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};