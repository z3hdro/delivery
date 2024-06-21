import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import { OrderCardLabel } from 'components/OrderCardLabel';
import { RoundButton } from 'components/RoundButton';
import { OrderDriverView } from 'components/OrderDriverView';
import { selectStatusLabel } from './OrderCard.utils';
import { getCostType } from 'utils/costType';
import { ICON_WIDTH } from './OrderCard.consts';
import { ORDER_STATUS } from 'constants/order';
import { useStyles } from './OrderCard.styles';
import { Props } from './OrderCard.types';

import { PathIcon, TrackIcon } from 'src/assets/icons';
import { getNomenclatureLabel } from 'utils/nomeclatureLabel';
import { getWeightLabel } from 'utils/getWeightLabel';
import { WEIGHT } from 'constants/weight';

export const OrderCard: FC<Props> = ({
  order,
  onPress,
  isDriver = false,
  isManager = false,
  detailedView = false,
  t,
}) => {
  const styles = useStyles();

  const statusLabel = selectStatusLabel(order.status);

  const [nomenclatureLabel, totalGrossWeight, totalNetWeight] = useMemo(() => {
    if (order.nomenclatures) {
      const label = getNomenclatureLabel(order.nomenclatures);
      const grossLabel = getWeightLabel(order.nomenclatures, 'gross_weight') + ` ${WEIGHT.T}.`;
      const netLabel = getWeightLabel(order.nomenclatures, 'net_weight') + ` ${WEIGHT.T}.`;

      return [label, grossLabel, netLabel];
    }
    return ['', '', ''];
  }, [order.nomenclatures]);

  return (
    <View style={styles.container}>
      <OrderCardLabel
        firstLabel={t('Orders_item_source')}
        firstSubtitle={order.departure.Address.City.name}
        secondLabel={getCostType(order.cost_type)}
        thirdLabel={t('Orders_item_destination')}
        thirdSubtitle={order.destination.Address.City.name}
        displayCostType={false}
      />
      <View style={styles.iconContainer}>
        <View style={styles.track}>
          <TrackIcon width={30} height={20} />
        </View>
        <PathIcon width={ICON_WIDTH} height={12} />
      </View>
      {order.nomenclatures?.length && (
        <Text style={styles.nomenclature}>
          {nomenclatureLabel}
        </Text>
      )}
      {isDriver && (
        <OrderDriverView
          firstLabel={`${order.price_non_cash} р.`}
          secondLabel={getCostType(order.cost_type)}
          thirdLabel={`${order.price_cash} р.`}
        />
      )}
      {isManager && (
        <OrderCardLabel
          firstLabel={t('Order_net_weight')}
          firstSubtitle={totalNetWeight}
          secondLabel={getCostType(order.cost_type)}
        />
      )}
      {detailedView && (
        <>
          <Text style={styles.statusLabel}>
            {t('Order_status')}
          </Text>
          <Text style={[styles.statusText,
            order.status === ORDER_STATUS.CREATED && styles.statusApprovalText]}>
            {t(statusLabel)}
          </Text>
        </>
      )}
      {isDriver && !!onPress && !detailedView && (
        <RoundButton
          style={styles.button}
          textStyle={styles.buttonText}
          title={t('Orders_item_take_order_button')}
          onPress={() => onPress(order)}
        />
      )}
    </View>
  );
};
