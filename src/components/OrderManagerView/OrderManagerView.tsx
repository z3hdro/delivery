import React, { FC, memo } from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './OrderManagerView.styles';
import { Props } from './OrderManagerView.types';
import { useTranslation } from 'react-i18next';

export const OrderManagerView: FC<Props> = memo(({
  firstLabel,
  firstSubtitle,
  secondLabel,
  priceCashLabel,
  priceNonCashLabel,
  displayCostType= true,
  style
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <View style={[styles.destinationContainer, style]}>
      <View style={styles.cell}>
        {firstLabel && (
          <>
            <Text style={styles.price}>
              {firstLabel}
            </Text>
            <Text style={styles.city}>
              {firstSubtitle}
            </Text>
          </>
        )}
      </View>
      {displayCostType && (
        <View style={[styles.cell, styles.route]}>
          <Text style={styles.routeLabel}>
            {t('Cost_type_label')}
          </Text>
          <Text style={styles.routeLabel}>
            {secondLabel}
          </Text>
        </View>
      )}
      <View style={[styles.cell, styles.rightCityDescription]}>
        <Text style={[styles.city, styles.cash]}>
          {priceCashLabel}
        </Text>
        <Text style={[styles.city, styles.cash]}>
          {priceNonCashLabel}
        </Text>
      </View>
    </View>
  );
});
