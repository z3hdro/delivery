import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { OrderCard } from 'components/OrderCard';
import { Accordion } from 'components/Accordion';
import { OrderInfo } from 'components/OrderInfo';
import { Button } from 'components/Button';
import { useDriverNavigator, useDriverRoute } from 'navigation/hooks';
import { EXPAND_MAP, INITIAL_STATE } from './OrderScreen.consts';
import { ORDER_STATUS } from 'constants/order';
import { useStyles } from './OrderScreen.styles';
import { ExpandMap } from './OrderScreen.types';

import { BackIcon } from 'assets/images';

export const OrderScreen = () => {
  const { t } = useTranslation();
  const { goBack } = useDriverNavigator();
  const { params: { order } } = useDriverRoute<'OrderScreen'>();
  const styles = useStyles();

  const [expanded, setExpanded] = useState<ExpandMap>(INITIAL_STATE);

  const isWaitingApproval = useMemo(() => order.status === ORDER_STATUS.WAITING_APPROVAL, [order.status]);
  const isInProgress = useMemo(() => order.status === ORDER_STATUS.IN_PROGRESS, [order.status]);

  const onPressMain = useCallback(() => {
    goBack();
  }, [goBack]);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const renderDepartureContent = useCallback(() => {
    const { departure: { address, contacts }, departureDatePlan  } = order;

    return (
      <OrderInfo
        style={styles.infoBlock}
        address={address}
        planDate={departureDatePlan}
        contacts={contacts}
        isDeparture
      />
    );
  }, [order, styles]);

  const renderDeliveryContent = useCallback(() => {
    const { destination: { address, contacts }, deliveryDatePlan  } = order;

    return (
      <OrderInfo
        style={styles.infoBlock}
        address={address}
        planDate={deliveryDatePlan}
        contacts={contacts}
        isDeparture
      />
    );
  }, [order, styles]);

  const onPress = useCallback((key: EXPAND_MAP, value: boolean) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }, []);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Orders_title')}
          leftPart={renderLeftPart()}
        />
      }>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <OrderCard order={order} isDriver t={t} detailedView />
        <Accordion
          label={t('Order_loading')}
          disabled={isWaitingApproval || isInProgress}
          isExpanded={expanded.departure}
          onPress={(value) => {
            onPress(EXPAND_MAP.DEPARTURE, value);
          }}
          content={renderDepartureContent()}
        />
        <Accordion
          style={styles.delivery}
          label={t('Order_delivery')}
          disabled={isWaitingApproval}
          isExpanded={expanded.delivery}
          onPress={(value) => {
            onPress(EXPAND_MAP.DELIVERY, value);
          }}
          content={renderDeliveryContent()}
        />
        <Button
          style={isInProgress ? styles.completeButton : styles.button}
          textStyle={styles.buttonText}
          title={
            t(isInProgress
              ? 'Order_complete_order_button'
              : 'Order_begin_order_button')
          }
          onPress={onPressMain}
        />
      </ScrollView>
    </Screen>
  );
};