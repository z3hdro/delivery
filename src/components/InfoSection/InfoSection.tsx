import React, { FC, useCallback, useEffect, useState } from 'react';
import { mask, MaskedTextInput } from 'react-native-mask-text';
import { DeviceEventEmitter, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { useStyles } from './InfoSection.styles';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { DISPLAY_DATE_FORMAT } from './InfoSection.consts';
import { Props } from './InfoSection.types';
import DatePicker from 'react-native-date-picker';
import { EMIT_EVENTS } from 'constants/emitEvents';
import { PHONE_MASK } from 'constants/user';

export const  InfoSection: FC<Props> = ({
  label,
  value,
  onUpdate,
  editable = true,
  textInputStyle,
  style,
  labelStyle,
  type = INFO_SECTION_TYPE.INPUT,
  keyboardType,
  minimumDate = new Date(),
  isRequired = false,
  isError = false,
  errorText = '',
  onNavigate,
}) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState<string>(value);
  const [formattedValue, setFormattedValue] = useState<string>(
    type === INFO_SECTION_TYPE.MASK_INPUT && value ? mask(value, PHONE_MASK) : ''
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(EMIT_EVENTS.RESET_SECTION, () => {
      setInputValue('');
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  const onTogglePicker = useCallback(() => {
    setOpen(prevState => !prevState);
  }, []);

  const onClosePicker = useCallback(() => {
    setOpen(false);
  }, []);

  const onChangeText = useCallback((text: string) => {
    setInputValue(text);
    if (onUpdate) {
      onUpdate(text);
    }
  }, [onUpdate]);

  const onChangeMaskText = useCallback((text: string, rawText: string) => {
    setFormattedValue(text);
    if (onUpdate) {
      onUpdate(rawText);
    }
  }, [onUpdate]);

  const onUpdateDate = useCallback((date: Date) => {
    if (onUpdate) {
      const selectedDate = new Date(date);
      selectedDate.setHours(0, 0, 0, 0);
      onUpdate(selectedDate.toISOString());
    }
    onClosePicker();
  }, [onClosePicker, onUpdate]);

  const renderContent = () => {
    if (type === INFO_SECTION_TYPE.DATE_PICKER) {
      return (
        <TouchableOpacity
          disabled={!editable}
          style={[styles.valueContainer, isError && styles.error]}
          onPress={onTogglePicker}>
          <Text style={styles.value}>
            {value ? format(value, DISPLAY_DATE_FORMAT) : ''}
          </Text>
        </TouchableOpacity>
      );
    }

    if (type === INFO_SECTION_TYPE.SCREEN) {
      return (
        <TouchableOpacity
          disabled={!editable}
          style={[styles.valueContainer, isError && styles.error]}
          onPress={onNavigate}>
          <Text style={styles.value}>
            {value ?? ''}
          </Text>
        </TouchableOpacity>
      );
    }

    if (type === INFO_SECTION_TYPE.MASK_INPUT) {
      return (
        <MaskedTextInput
          mask={PHONE_MASK}
          onChangeText={onChangeMaskText}
          value={formattedValue}
          style={[styles.textInput, !editable && styles.displayText, textInputStyle, isError && styles.error]}
          keyboardType={keyboardType}
          editable={editable}
        />
      );
    }

    return (
      <TextInput
        keyboardType={keyboardType}
        style={[styles.textInput, !editable && styles.displayText, textInputStyle, isError && styles.error]}
        value={inputValue}
        onChangeText={onChangeText}
        editable={editable}
      />
    );
  };

  return (
    <>
      <View style={style}>
        <Text style={[styles.label, labelStyle]}>
          {isRequired && <Text style={styles.required}>*{'  '}</Text>}
          {label}
        </Text>
        {renderContent()}
        {isError && errorText && <Text style={styles.errorText}>{errorText}</Text>}
      </View>

      {type === INFO_SECTION_TYPE.DATE_PICKER && (
        <DatePicker
          modal
          mode={'date'}
          open={open}
          minimumDate={minimumDate}
          date={value ? new Date(value) : new Date()}
          onConfirm={onUpdateDate}
          onCancel={onClosePicker}
        />
      )}
    </>
  );
};
