import React, { FC, useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { format } from 'date-fns';
import { useStyles } from './InfoSection.styles';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { DISPLAY_DATE_FORMAT } from './InfoSection.consts';
import { Props } from './InfoSection.types';
import DatePicker from 'react-native-date-picker';

export const  InfoSection: FC<Props> = ({
  label,
  value,
  onUpdate,
  editable = true,
  textInputStyle,
  style,
  labelStyle,
  type = INFO_SECTION_TYPE.INPUT,
}) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState<string>(value);
  const [open, setOpen] = useState<boolean>(false);

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

  const onUpdateDate = useCallback((date: Date) => {
    if (onUpdate) {
      onUpdate(date.toISOString());
    }
    onClosePicker();
  }, [onClosePicker, onUpdate]);
  
  return (
    <>
      <View style={style}>
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
        {type === INFO_SECTION_TYPE.DATE_PICKER ? (
          <TouchableOpacity style={styles.valueContainer} onPress={onTogglePicker}>
            <Text style={styles.value}>
              {value ? format(value, DISPLAY_DATE_FORMAT) : ''}
            </Text>
          </TouchableOpacity>
        ) : (
          <TextInput
            style={[styles.textInput, !editable && styles.displayText, textInputStyle]}
            value={inputValue}
            onChangeText={onChangeText}
            editable={editable}
          />
        )}
      </View>

      {type === INFO_SECTION_TYPE.DATE_PICKER && (
        <DatePicker
          modal
          mode={'date'}
          open={open}
          minimumDate={new Date()}
          date={value ? new Date(value) : new Date()}
          onConfirm={onUpdateDate}
          onCancel={onClosePicker}
        />
      )}
    </>

  );
};