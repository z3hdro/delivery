import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { OrderCardLabel } from 'components/OrderCardLabel';
import { RoundButton } from 'components/RoundButton';
import { selectStatusLabel } from './OrderCard.utils';
import { ICON_WIDTH } from './OrderCard.consts';
import { ORDER_STATUS } from 'constants/order';
import { useStyles } from './OrderCard.styles';
import { Props } from './OrderCard.types';

import { PathIcon, TrackIcon } from 'assets/images';


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

  return (
    <View style={styles.container}>
      <OrderCardLabel
        firstLabel={t('Orders_item_source')}
        firstSubtitle={order.departure.address.city}
        secondLabel={t('Orders_item_destination')}
        secondSubtitle={order.destination.address.city}
      />
      <View style={styles.iconContainer}>
        <View style={styles.track}>
          <TrackIcon width={30} height={20} />
        </View>
        <PathIcon width={ICON_WIDTH} height={12} />
      </View>
      <Text style={styles.nomenclature}>
        {order.nomenclature.name}
      </Text>
      {isManager && (
        <OrderCardLabel
          firstLabel={t('Order_gross_weight')}
          firstSubtitle={`${order.grossWeight} ${order.nomenclature.measureName}.`}
          secondLabel={t('Order_net_weight')}
          secondSubtitle={`${order.netWeight} ${order.nomenclature.measureName}.`}
        />
      )}
      {detailedView && (
        <>
          <Text style={styles.statusLabel}>
            {t('Order_status')}
          </Text>
          <Text style={[styles.statusText,
            order.status === ORDER_STATUS.WAITING_APPROVAL && styles.statusApprovalText]}>
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