import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './OrderCardLabel.styles';
import { Props } from './OrderCardLabel.types';

export const OrderCardLabel: FC<Props> = memo(({
  firstLabel,
  firstSubtitle,
  secondLabel,
  secondSubtitle,
  style
}) => {
  const styles = useStyles();

  return (
    <View style={[styles.destinationContainer, style]}>
      <View>
        <Text style={styles.cityLabel}>
          {firstLabel}
        </Text>
        <Text style={styles.city}>
          {firstSubtitle}
        </Text>
      </View>
      <View style={styles.rightCityDescription}>
        <Text style={styles.cityLabel}>
          {secondLabel}
        </Text>
        <Text style={styles.city}>
          {secondSubtitle}
        </Text>
      </View>
    </View>
  );
});