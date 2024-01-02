import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { useStyles } from './JobPositionPicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './JobPositionPicker.consts';
import { Props } from './JobPositionPicker.types';
import { Option } from 'types/picker';

const MOCK_DATA: Option[] = [
  { label: 'Водитель', value: 'водитель' },
  { label: 'Складщик', value: 'складщик' },
  { label: 'Офис менеджер', value: 'офис менеджер' }
];

export const JobPositionPicker: FC<Props> = ({
  value,
  onChangeValue,
  style,
}) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<string | null>(value ?? null);
  const [data, setData] = useState<Option[]>(MOCK_DATA);

  const onChange = useCallback((item: Option) => {
    setSelectedValue(item.value);
    onChangeValue(item.value);
  }, [onChangeValue]);

  return (
    <Dropdown
      style={[styles.dropdown, style]}
      selectedTextStyle={styles.text}
      data={data}
      value={selectedValue}
      placeholder={''}
      onChange={onChange}
      labelField={LABEL_FIELD}
      valueField={VALUE_FIELD}
      maxHeight={300}
    />
  );
};