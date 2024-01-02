import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { useStyles } from './NomenclatureMeasurePicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './NomenclatureMeasurePicker.consts';
import { Props } from './NomenclatureMeasurePicker.types';
import { Option } from 'types/picker';

const MOCK_DATA: Option[] = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

export const NomenclatureMeasurePicker: FC<Props> = ({
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