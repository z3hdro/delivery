import React, { FC } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Props } from './InfoSection.types';
import { useStyles } from './InfoSection.styles';

export const InfoSection: FC<Props> = ({
  style = {} ,
  label,
  value,
  onChangeText
}) => {
  const styles = useStyles();

  return (
    <View style={style}>
      <Text style={styles.label}>
        {label}
      </Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        editable={!!onChangeText}
      />
    </View>
  );
};