import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { useStyles } from './DeliveryPointPicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './DeliveryPointPicker.consts';
import { Props } from './DeliveryPointPicker.types';
import { Option } from 'types/picker';

const MOCK_DATA: Option[] = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
];

export const DeliveryPointPicker: FC<Props> = ({
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