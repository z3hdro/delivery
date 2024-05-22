import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './OrderDriverView.styles';
import { Props } from './OrderDriverView.types';

export const OrderDriverView: FC<Props> = ({
  firstLabel,
  secondLabel,
  thirdLabel,
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
        <Text style={styles.priceLabel}>
          {t('Order_cashless_label')}
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
        <Text style={styles.priceLabel}>
          {t('Order_cash_label')}
        </Text>
      </View>
    </View>
  );
};
