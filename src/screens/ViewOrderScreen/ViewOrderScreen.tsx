import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { OrderCard } from 'components/OrderCard';
import { InfoSection } from 'components/InfoSection';
import { RoundButton } from 'components/RoundButton';
import { Button } from 'components/Button';
import { Map } from 'components/Map';
import { InfoModal } from 'components/InfoModal';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { formatAddress } from 'utils/address';
import { createInitialState, getPrimaryButtonText } from './ViewOrderScreen.utils';
import { parseGeo } from 'utils/geo';
import { getNomenclatureLabel } from 'utils/nomeclatureLabel';
import { parseDateToInfoMap } from 'utils/parseDate';
import { useStyles } from './ViewOrderScreen.styles';
import { ORDER_KEYS } from './ViewOrderScreen.consts';
import { ORDER_LIST } from 'constants/order';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { LOGISTIC_POINT } from 'constants/map';
import { MapPointInfo, ViewOrder } from './ViewOrderScreen.types';
import { Address } from 'types/address';

import { ArrowBackIcon, BackIcon, MapIcon } from 'src/assets/icons';

export const ViewOrderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { params: { order, type, onUpdate } } = useManagerRoute<'ViewOrderScreen'>();
  const { goBack } = useManagerNavigator();

  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<ViewOrder>(createInitialState(order));
  const [mapPointInfo, setMapPointInfo] = useState<MapPointInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCanCancelContentTouches, setCanCancelContentTouches] = useState<boolean>(true);

  const nomenclatureLabel = useMemo(() => {
    if (order.nomenclatures) {
      return getNomenclatureLabel(order.nomenclatures);
    }
    return '';
  }, [order.nomenclatures]);

  const buttonTitle = useMemo(() => getPrimaryButtonText(type), [type]);

  const driverName = useMemo(() => {
    if (order.driver) {
      return `${orderData.surname} ${orderData.name.toUpperCase()}.${orderData.patronymic.toUpperCase()}.`;
    }
    return '';
  },
  [order.driver, orderData]);

  const onUpdateOrder = useCallback((key: ORDER_KEYS, value: string) => {
    setOrderData((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>
    );
  }, [goBack, styles]);

  const onPress = useCallback(async (orderData: ViewOrder) => {
    try {
      setIsLoading(true);

      if (type === ORDER_LIST.IN_PROGRESS) {
        goBack();
        console.log('close');
      } else if (type === ORDER_LIST.WAITING_APPROVAL) {
        const payload = {
          orderId: orderData.id,
          plannedLoadingDate: orderData.departureDatePlan,
          plannedArrivalDate: orderData.deliveryDatePlan,
          vinCode: orderData.truckVin
        };
        await networkService.confirmOrder(payload);
        console.log('approve');
        onUpdate();
        goBack();
      } else if (type === ORDER_LIST.AVAILABLE) {
        const payload = {
          departure_date_plan: orderData.departureDatePlan,
          delivery_date_plan: orderData.deliveryDatePlan,
          vin: orderData.truckVin
        };
        await networkService.updateOrder(orderData.id, payload);
        onUpdate();
        goBack();
        console.log('save');
      }
    } catch (e) {
      console.log('ViewOrderScreen button press error: ', e);
    } finally {
      setIsLoading(false);
    }

  }, [goBack, onUpdate, type]);

  const onToggleMap = useCallback(() => {
    setDisplayMap(prevState => !prevState);
  }, []);

  const onDecline = useCallback(async (orderId: number) => {
    try {
      await networkService.rejectOrder({ orderId });
      onUpdate();
      goBack();
    } catch (e) {
      console.log('error on Decline driver: ', e);
    }
  }, [onUpdate, goBack]);

  const onDelete = useCallback(async (orderId: number) => {
    try {
      await networkService.deleteOrder(orderId);
      onUpdate();
      goBack();
    } catch (e) {
      console.log('error on delete order: ', e);
    }
  }, [onUpdate, goBack]);

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
          title={t('ViewOrder_header_title')}
          leftPart={renderLeftPart()}
        />
      }>
      {!!mapPointInfo && (
        <InfoModal mapPointInfo={mapPointInfo} onCloseModal={onCloseModal} />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        canCancelContentTouches={isCanCancelContentTouches}
        scrollEnabled={isCanCancelContentTouches}
      >
        <OrderCard order={order} t={t} isManager />
        {displayMap ? (
          <View onTouchEnd={onTouchEnd} onTouchStart={onTouchStart} >
            <Map
              displayMap={displayMap}
              departure={{ ...order.departure.Address, geo: parseGeo(order.departure.geo) }}
              destination={{ ...order.destination.Address, geo: parseGeo(order.destination.geo) }}
              onInfoPress={onInfoPress}
              track={order.geo ? parseGeo(order.geo) : undefined}
              displayTrack={type === ORDER_LIST.IN_PROGRESS}
            />
          </View>
        ) : (
          <>
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_first_section')}
              value={driverName}
              editable={false}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_second_section')}
              value={order.driver?.user?.phone || ''}
              editable={false}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_third_section')}
              value={orderData.departureDatePlan}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              onUpdate={(text: string) => {
                onUpdateOrder(ORDER_KEYS.DEPARTURE_DATE_PLAN, text);
              }}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_fourth_section')}
              value={orderData.deliveryDatePlan}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              minimumDate={new Date(orderData.departureDatePlan)}
              onUpdate={(text: string) => {
                onUpdateOrder(ORDER_KEYS.DELIVERY_DATE_PLAN, text);
              }}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_fifth_section')}
              value={orderData.truckVin}
              editable={type === ORDER_LIST.IN_PROGRESS || type === ORDER_LIST.WAITING_APPROVAL}
              onUpdate={(text: string) => {
                onUpdateOrder(ORDER_KEYS.TRUCK_VIN, text);
              }}
            />
          </>
        )}
        <View style={styles.mapButtonContainer}>
          <RoundButton
            style={styles.mapButton}
            leftIcon={displayMap ? <ArrowBackIcon height={12} width={14} /> : <MapIcon height={12} width={14} />}
            title={t(displayMap ? 'ViewOrder_hide_map_button' : 'ViewOrder_show_map_button')}
            onPress={onToggleMap}
          />
        </View>

        {!displayMap && (
          <>
            <Button
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
              title={t(buttonTitle)}
              onPress={() => onPress(orderData)}
              disabled={isLoading}
            />
            {type !== ORDER_LIST.IN_PROGRESS && (
              <View style={styles.secondaryButtonContainer}>
                {type === ORDER_LIST.WAITING_APPROVAL ? (
                  <Button
                    style={styles.secondaryButton}
                    textStyle={styles.primaryButtonText}
                    title={t('ViewOrder_decline_button')}
                    onPress={() => onDecline(order.id)}
                    disabled={isLoading}
                  />
                ) : (
                  <View style={styles.buttonsContainer}>
                    <Button
                      style={styles.secondaryButton}
                      textStyle={styles.primaryButtonText}
                      title={t('ViewOrder_cancel_button')}
                      onPress={goBack}
                      disabled={isLoading}
                    />
                    <Button
                      style={styles.secondaryButton}
                      textStyle={styles.primaryButtonText}
                      title={t('ViewOrder_delete_button')}
                      onPress={() => onDelete(order.id)}
                      disabled={isLoading}
                    />
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </Screen>
  );
};
