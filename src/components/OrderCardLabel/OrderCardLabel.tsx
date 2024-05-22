import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './OrderCardLabel.styles';
import { Props } from './OrderCardLabel.types';
import { useTranslation } from 'react-i18next';

export const OrderCardLabel: FC<Props> = memo(({
  firstLabel,
  firstSubtitle,
  secondLabel,
  thirdLabel,
  thirdSubtitle,
  style
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <View style={[styles.destinationContainer, style]}>
      <View style={styles.cell}>
        <Text style={styles.price}>
          {firstLabel}
        </Text>
        <Text style={styles.city}>
          {firstSubtitle}
        </Text>
      </View>
      <View style={[styles.cell, styles.route]}>
        <Text style={styles.routeLabel}>
          {t('Cost_type_label')}
        </Text>
        <Text style={styles.routeLabel}>
          {secondLabel}
        </Text>
      </View>
      <View style={[styles.cell, styles.rightCityDescription]}>
        <Text style={styles.price}>
          {thirdLabel}
        </Text>
        <Text style={styles.city}>
          {thirdSubtitle}
        </Text>
      </View>
    </View>
  );
});
