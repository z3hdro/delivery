import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import useWebSocket from 'react-native-use-websocket';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { OrderCard } from 'components/OrderCard';
import { Accordion } from 'components/Accordion';
import { OrderInfo } from 'components/OrderInfo';
import { Button } from 'components/Button';
import { Preloader } from 'components/Preloader';
import { RoundButton } from 'components/RoundButton';
import { InfoModal } from 'components/InfoModal';
import { Map } from 'components/Map';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectCurrentOrder } from 'store/selectors';
import { useAppDispatch } from 'hooks/useAppDispatch';
import {
  clearCurrentOrder, clearGeoCurrentOrderId,
  resetCurrentOrder,
  resetGeoState,
  setCurrentOrder,
  setGeoCurrentOrderId,
  updateCurrentOrderStatus
} from 'store/slices';
import { locationService } from 'services/locationService';
import { useDriverNavigator, useDriverRoute } from 'navigation/hooks';
import { networkService } from 'services/network';
import {
  runLocationService,
  stopLocationService,
} from 'wrapper/LocationWrapper';
import { parseDateToInfoMap } from 'utils/parseDate';
import { getNomenclatureLabel } from 'utils/nomeclatureLabel';
import { formatAddress } from 'utils/address';
import { parseGeo, updateOrderGeo } from 'utils/geo';
import { getDescriptionByStatus, getPrimaryButtonText } from './OrderScreen.utils';
import { ALERT_DISPLAY_STATUS, EXPAND_MAP, INITIAL_STATE } from './OrderScreen.consts';
import { ORDER_STATUS } from 'constants/order';
import { LOGISTIC_POINT } from 'constants/map';
import { WEBSOCKET_URL } from 'constants/websocket';
import { WSOrderManager } from 'types/websocket';
import { ExpandMap } from './OrderScreen.types';
import { Order } from 'types/order';
import { Address } from 'types/address';
import { MapPointInfo } from 'types/infoModal';

import { useStyles } from './OrderScreen.styles';

import { ArrowBackIcon, BackIcon, MapIcon } from 'src/assets/icons';

export const OrderScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { goBack } = useDriverNavigator();
  const { params } = useDriverRoute<'OrderScreen'>();
  const { onUpdate } = params;

  // const order = useAppSelector(selectOrder) as Order;
  const order = useAppSelector(selectCurrentOrder) as Order;
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<ExpandMap>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [mapPointInfo, setMapPointInfo] = useState<MapPointInfo | null>(null);
  const [isCanCancelContentTouches, setCanCancelContentTouches] = useState<boolean>(true);

  const nomenclatureLabel = useMemo(() => {
    if (order.nomenclatures) {
      return getNomenclatureLabel(order.nomenclatures);
    }
    return '';
  }, [order.nomenclatures]);

  console.log('order status: ', order.status);

  const [isCreated, isWaitingApproval, isInProgress, isCompleted] = useMemo(() => (
    [
      order.status === ORDER_STATUS.CREATED,
      order.status === ORDER_STATUS.CONFIRMATION,
      order.status === ORDER_STATUS.DEPARTED,
      order.status === ORDER_STATUS.COMPLETED
    ]
  ), [order.status]);

  const buttonStyle = useMemo(() => {
    if (order.status === ORDER_STATUS.DEPARTED) {
      return styles.completeButton;
    }
    if (order.status === ORDER_STATUS.CONFIRMATION) {
      return styles.disabled;
    }
    return styles.button;
  },[styles, order.status]);

  const [secondaryButton, secondaryButtonText] = useMemo(() => {
    if (
      order.status === ORDER_STATUS.DEPARTED
      || order.status === ORDER_STATUS.CREATED
    ) {
      return [styles.declineButtonDisabled, styles.declineButtonTextDisabled];
    }
    return [styles.declineButton, styles.declineButtonText];
  },[styles, order.status]);

  useWebSocket(WEBSOCKET_URL.ORDER, {
    onOpen: () => console.log('ws opened on OrderScreen'),
    options: {
      headers: {
        Authorization: networkService.getAuthorizationToken(),
      }
    },
    onMessage: (e) => {
      const message = JSON.parse((e.data as string)) as WSOrderManager;
      console.log('Received message:', message);
      if (message?.id && message?.status) {
        if (message.status.toLowerCase() === ORDER_STATUS.CONFIRMED) {
          dispatch(updateCurrentOrderStatus(ORDER_STATUS.LOADING));
        }
      }
    },
    onClose: (e) => console.log('ws closed', e),
    onError: (e) => console.log('ws error', e),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
    reconnectAttempts: 5
  });

  useEffect(() => {
    const isWatching = locationService.checkSubscription();

    if (order?.status !== ORDER_STATUS.DEPARTED || isWatching) {
      return;
    }

    void locationService.startWatching();
    const unsubscribe = locationService.subscribe(updateOrderGeo);

    return () => {
      unsubscribe();
      locationService.stopWatching();
    };
  }, [order?.status]);

  const onBackPress = useCallback(() => {
    dispatch(clearCurrentOrder());
    goBack();
  }, [dispatch, goBack]);

  const renderLeftPart = useCallback(() => {
    if (order.status === ORDER_STATUS.CREATED || order.status === ORDER_STATUS.CANCELLED) {
      return (
        <Pressable onPress={onBackPress}>
          <View style={styles.headerButton}>
            <BackIcon height={16} width={16} />
          </View>
        </Pressable>

      );
    }
  }, [onBackPress, order.status, styles]);

  const renderDepartureContent = useCallback(() => {
    const { departure: { Address, contacts }, departure_date_plan  } = order;

    return (
      <OrderInfo
        style={styles.infoBlock}
        address={Address}
        planDate={departure_date_plan}
        contacts={contacts}
        isDeparture
      />
    );
  }, [order, styles]);

  const renderDeliveryContent = useCallback(() => {
    const { destination: { Address, contacts }, delivery_date_plan  } = order;

    return (
      <OrderInfo
        style={styles.infoBlock}
        address={Address}
        planDate={delivery_date_plan}
        contacts={contacts}
        isDeparture
      />
    );
  }, [order, styles]);

  const displayAlert = useCallback((status: ORDER_STATUS, onPress?: () => void) => {
    console.log('display alert status: ', status);
    if (!ALERT_DISPLAY_STATUS.includes(status)) {
      return;
    }

    const description = getDescriptionByStatus(status);

    Alert.alert(t('Alert_title'), t(description), [
      { text: t('ok'), style: 'destructive', onPress },
    ]);
  }, [t]);

  const onPressMain = useCallback(async (orderId: number, status: ORDER_STATUS) => {
    try {
      setIsLoading(true);

      let result;

      if (status === ORDER_STATUS.CREATED) {
        result = await networkService.takeOrder({ orderId });
      }

      if (status === ORDER_STATUS.LOADING) {
        result = await networkService.departOrder({ orderId });
        dispatch(setGeoCurrentOrderId(orderId));

        await runLocationService();
      }

      if (status === ORDER_STATUS.DEPARTED) {
        await networkService.completeOrder({ orderId });

        await stopLocationService();
        locationService.resetService();

        dispatch(clearGeoCurrentOrderId());

        displayAlert(status, () => {
          onUpdate();
          goBack();
          dispatch(resetGeoState());
          dispatch(resetCurrentOrder());
        });

        return;
      }

      if (result?.order && result.order.status !== status) {
        const newStatus = result.order.status;

        dispatch(updateCurrentOrderStatus(newStatus));
      }

      displayAlert(status);

      if (result?.order && result.order.status === ORDER_STATUS.LOADING) {
        dispatch(setCurrentOrder(order));
      }
    } catch (e) {
      console.log('error while press main on Order Screen: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, goBack, onUpdate, order, displayAlert]);

  const onDecline = useCallback(async (orderId: number) => {
    try {
      setIsLoading(true);

      await networkService.cancelOrder({ orderId });

      onUpdate();
      goBack();
      dispatch(clearCurrentOrder());
    } catch (e) {
      console.log('OrderScreen on decline e: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, onUpdate, goBack]);

  const onToggleMap = useCallback(() => {
    setDisplayMap(prevState => !prevState);
  }, []);

  const onPress = useCallback((key: EXPAND_MAP, value: boolean) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }, []);

  const onInfoPress = useCallback((type: LOGISTIC_POINT, address: Address) => {
    const planDate = parseDateToInfoMap(
      type === LOGISTIC_POINT.DEPARTURE ? order.departure_date_plan : order.delivery_date_plan
    );

    const data: MapPointInfo = {
      nomenclatureName: nomenclatureLabel,
      type,
      address: formatAddress(address),
      planDate
    };

    setMapPointInfo(data);
  }, [order, nomenclatureLabel]);

  const onCloseModal = useCallback(() => {
    setMapPointInfo(null);
  }, []);

  const onTouchStart = useCallback(() => {
    setCanCancelContentTouches(false);
  }, []);

  const onTouchEnd = useCallback(() => {
    setCanCancelContentTouches(true);
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        canCancelContentTouches={isCanCancelContentTouches}
        scrollEnabled={isCanCancelContentTouches}
      >
        <OrderCard order={order} isDriver t={t} detailedView />
        <Accordion
          label={t('Order_loading')}
          isExpanded={expanded.departure}
          onPress={(value) => {
            onPress(EXPAND_MAP.DEPARTURE, value);
          }}
          content={renderDepartureContent()}
        />
        <Accordion
          style={styles.delivery}
          label={t('Order_delivery')}
          isExpanded={expanded.delivery}
          onPress={(value) => {
            onPress(EXPAND_MAP.DELIVERY, value);
          }}
          content={renderDeliveryContent()}
        />
        {displayMap && (
          <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Map
              displayMap={displayMap}
              departure={{ ...order.departure.Address, geo: parseGeo(order.departure.geo) }}
              destination={{ ...order.destination.Address, geo: parseGeo(order.destination.geo) }}
              onInfoPress={onInfoPress}
              track={order.geo ? parseGeo(order.geo) : undefined}
              displayTrack={isInProgress}
              showUserPosition={false}
            />
          </View>
        )}
        <View style={styles.mapButtonContainer}>
          <RoundButton
            style={styles.mapButton}
            leftIcon={displayMap ? <ArrowBackIcon height={12} width={14} /> : <MapIcon height={12} width={14} />}
            title={t(displayMap ? 'Order_hide_map_button' : 'Order_show_map_button')}
            onPress={onToggleMap}
          />
        </View>

        {!isCompleted && (
          <Button
            disabled={isWaitingApproval}
            style={buttonStyle}
            textStyle={styles.buttonText}
            title={
              t(getPrimaryButtonText(order.status))
            }
            onPress={() => onPressMain(order.id, order.status)}
          />
        )}
        {!isCreated && !isCompleted && (
          <Button
            disabled={isCreated || isInProgress}
            style={secondaryButton}
            textStyle={secondaryButtonText}
            title={t('Order_decline_button')}
            onPress={() => onDecline(order.id)}
          />
        )}
      </ScrollView>
    </Screen>
  );
};
