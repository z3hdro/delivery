import React, { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useStyles } from './LinkButton.styles';
import { Props } from './LinkButton.types';

export const LinkButton: FC<Props> = ({
  onPress,
  title,
  customTextStyle,
  disabled = false
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={[styles.link, customTextStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};