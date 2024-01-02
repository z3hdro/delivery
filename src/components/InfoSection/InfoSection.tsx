import React, { FC, useCallback, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Props } from './InfoSection.types';
import { useStyles } from './InfoSection.styles';

export const InfoSection: FC<Props> = ({
  label,
  value,
  onUpdate,
  editable = true,
  textInputStyle,
  style,
  labelStyle,
}) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState<string>(value);

  const onChangeText = useCallback((text: string) => {
    setInputValue(text);
    if (onUpdate) {
      onUpdate(text);
    }
  }, [onUpdate]);
  
  return (
    <View style={style}>
      <Text style={[styles.label, labelStyle]}>
        {label}
      </Text>
      <TextInput
        style={[styles.textInput, !editable && styles.displayText, textInputStyle]}
        value={inputValue}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  );
};