import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { useStyles } from './DeparturePointPicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './DeparturePointPicker.consts';
import { Props } from './DeparturePointPicker.types';
import { Option } from 'types/picker';

const MOCK_DATA: Option[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
];

export const DeparturePointPicker: FC<Props> = ({
  value,
  onChangeValue,
  style,
}) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<string | null>(value);
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