import React, { FC, useCallback, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { useStyles } from './NomenclatureNamePicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './NomenclatureNamePicker.consts';
import { Props } from './NomenclatureNamePicker.types';
import { Option } from 'types/picker';

const MOCK_DATA: Option[] = [
  { label: 'A', value: 'A' },
  { label: 'Б', value: 'Б' },
  { label: 'В', value: 'В' },
  { label: 'Г', value: 'Г' },
  { label: 'Д', value: 'Д' },
];

export const NomenclatureNamePicker: FC<Props> = ({
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