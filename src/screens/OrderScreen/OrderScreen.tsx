import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { OrderCard } from 'components/OrderCard';
import { Accordion } from 'components/Accordion';
import { OrderInfo } from 'components/OrderInfo';
import { Button } from 'components/Button';
import { Preloader } from 'components/Preloader';
import { RoundButton } from 'components/RoundButton';
import { Map } from 'components/Map';
import { useDriverNavigator, useDriverRoute } from 'navigation/hooks';
import { formatAddress } from 'utils/address';
import { EXPAND_MAP, INITIAL_STATE } from './OrderScreen.consts';
import { ORDER_STATUS } from 'constants/order';
import { LOGISTIC_POINT } from 'constants/map';
import { useStyles } from './OrderScreen.styles';
import { Address } from 'types/address';
import { MapPointInfo } from 'types/infoModal';
import { ExpandMap } from './OrderScreen.types';

import { ArrowBackIcon, BackIcon, MapIcon } from 'src/assets/icons';
import { InfoModal } from 'components/InfoModal';

export const OrderScreen = () => {
  const { t } = useTranslation();
  const { goBack } = useDriverNavigator();
  const { params: { order } } = useDriverRoute<'OrderScreen'>();
  const styles = useStyles();

  const [expanded, setExpanded] = useState<ExpandMap>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [mapPointInfo, setMapPointInfo] = useState<MapPointInfo | null>(null);

  const isWaitingApproval = useMemo(() => order.status === ORDER_STATUS.WAITING_APPROVAL, [order.status]);
  const isInProgress = useMemo(() => order.status === ORDER_STATUS.IN_PROGRESS, [order.status]);

  const buttonStyle = useMemo(() => {
    if (order.status === ORDER_STATUS.IN_PROGRESS) {
      return styles.completeButton;
    }
    if (order.status === ORDER_STATUS.WAITING_APPROVAL) {
      return styles.disabled;
    }
    return styles.button;
  },[styles, order.status]);

  const [secondaryButton, secondaryButtonText] = useMemo(() => {
    if (order.status === ORDER_STATUS.IN_PROGRESS) {
      return [styles.declineButtonDisabled, styles.declineButtonTextDisabled];
    }
    if (order.status === ORDER_STATUS.WAITING_APPROVAL) {
      return [styles.declineButton, styles.declineButtonText];
    }
    return [styles.declineButton, styles.declineButtonText];
  },[styles, order.status]);

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

  // TODO: replace by API
  const onPressMain = useCallback(() => {
    goBack();
  }, [goBack]);

  const onDecline = useCallback(() => {
    try {
      setIsLoading(true);
    } catch (e) {
      console.log('OrderScreen ondecline e: ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onToggleMap = useCallback(() => {
    setDisplayMap(prevState => !prevState);
  }, []);

  const onPress = useCallback((key: EXPAND_MAP, value: boolean) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }, []);

  // TODO: change later
  const onInfoPress = useCallback((type: LOGISTIC_POINT, address: Address) => {
    const data: MapPointInfo = {
      nomenclatureName: 'Лом 3А',
      type,
      address: formatAddress(address),
      planDate: '09.10.2023'
    };

    setMapPointInfo(data);
  }, []);

  const onCloseModal = useCallback(() => {
    setMapPointInfo(null);
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
      {isLoading && <Preloader style={styles.preloader} />}
      {!!mapPointInfo && (
        <InfoModal mapPointInfo={mapPointInfo} onCloseModal={onCloseModal} />
      )}
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
        {displayMap && (
          <Map
            displayMap={displayMap}
            departure={{ ...order.departure.address, geo: order.departure.geo }}
            destination={{ ...order.destination.address, geo: order.destination.geo }}
            onInfoPress={onInfoPress}
          />
        )}
        <View style={styles.mapButtonContainer}>
          <RoundButton
            style={styles.mapButton}
            leftIcon={displayMap ? <ArrowBackIcon height={12} width={14} /> : <MapIcon height={12} width={14} />}
            title={t(displayMap ? 'Order_hide_map_button' : 'Order_show_map_button')}
            onPress={onToggleMap}
          />
        </View>

        <Button
          disabled={isWaitingApproval}
          style={buttonStyle}
          textStyle={styles.buttonText}
          title={
            t(isInProgress
              ? 'Order_complete_order_button'
              : 'Order_begin_order_button')
          }
          onPress={onPressMain}
        />
        <Button
          disabled={isInProgress}
          style={secondaryButton}
          textStyle={secondaryButtonText}
          title={t('Order_decline_button')}
          onPress={onDecline}
        />
      </ScrollView>
    </Screen>
  );
};
