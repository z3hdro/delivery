import React, { FC, useCallback, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';

import { networkService } from 'services/network';
import { useStyles } from './JobPositionPicker.styles';
import { LABEL_FIELD, VALUE_FIELD } from './JobPositionPicker.consts';
import { Props } from './JobPositionPicker.types';
import { Option } from 'types/picker';

export const JobPositionPicker: FC<Props> = ({
  value,
  onChangeValue,
  style,
}) => {
  const styles = useStyles();

  const [selectedValue, setSelectedValue] = useState<Option | null>(value ?? null);
  const [data, setData] = useState<Option[]>([]);

  useEffect(() => {
    void (async () => {
      try {
        const { jobs } = await networkService.getAllJobs();
        if (jobs?.length) {
          setData(jobs.map(({ id, name }) => ({
            label: name,
            value: id
          })));
        }
      } catch (e) {
        console.log('JobPositionPicker error: ', e);
      }
    })();
  }, []);

  const onChange = useCallback((item: Option) => {
    setSelectedValue(item);
    onChangeValue(item);
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
      maxHeight={400}
    />
  );
};
