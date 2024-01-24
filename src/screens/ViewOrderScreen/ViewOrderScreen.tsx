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
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { formatAddress } from 'utils/address';
import { createInitialState, getPrimaryButtonText } from './ViewOrderScreen.utils';
import { useStyles } from './ViewOrderScreen.styles';
import { ORDER_KEYS } from './ViewOrderScreen.consts';
import { ORDER_LIST } from 'constants/order';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { LOGISTIC_POINT } from 'constants/map';
import { MapPointInfo, Order } from './ViewOrderScreen.types';
import { Address } from 'types/address';

import { ArrowBackIcon, BackIcon, MapIcon } from 'src/assets/icons';

export const ViewOrderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { params: { order, type } } = useManagerRoute<'ViewOrderScreen'>();
  const { goBack } = useManagerNavigator();

  const [displayMap, setDisplayMap] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<Order>(createInitialState(order));
  const [mapPointInfo, setMapPointInfo] = useState<MapPointInfo | null>(null);

  const buttonTitle = useMemo(() => getPrimaryButtonText(type), [type]);

  const driverName = useMemo(() =>
    `${orderData.surname} ${orderData.name[0].toUpperCase()}.${orderData.patronymic[0].toUpperCase()}.`,
  [orderData]);

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

  const onPress = useCallback(() => {
    if (type === ORDER_LIST.IN_PROGRESS) {
      goBack();
    } else if (type === ORDER_LIST.WAITING_APPROVAL) {
      console.log('approve');
    } else {
      console.log('save');
    }
  }, [goBack, type]);

  const onToggleMap = useCallback(() => {
    setDisplayMap(prevState => !prevState);
  }, []);

  const onDecline = useCallback(() => {
    console.log('onDecline');
  }, []);

  const onDelete = useCallback(() => {
    console.log('onDelete');
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
          title={t('ViewOrder_header_title')}
          leftPart={renderLeftPart()}
        />
      }>
      {!!mapPointInfo && (
        <InfoModal mapPointInfo={mapPointInfo} onCloseModal={onCloseModal} />
      )}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <OrderCard order={order} t={t} isManager />
        {displayMap ? (
          <Map
            displayMap={displayMap}
            departure={{ ...order.departure.address, geo: order.departure.geo }}
            destination={{ ...order.destination.address, geo: order.destination.geo }}
            onInfoPress={onInfoPress}
            track={order.geo}
            displayTrack={type === ORDER_LIST.IN_PROGRESS}
          />
        ) : (
          <>
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_first_section')}
              value={driverName}
              editable={type === ORDER_LIST.AVAILABLE}

            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_second_section')}
              value={order.driver.phone}
              editable={type === ORDER_LIST.AVAILABLE}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_third_section')}
              value={orderData.departureDatePlan}
              editable={type === ORDER_LIST.AVAILABLE}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              onUpdate={(text: string) => {
                onUpdateOrder(ORDER_KEYS.DEPARTURE_DATE_PLAN, text);
              }}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_fourth_section')}
              value={orderData.deliveryDatePlan}
              editable={type === ORDER_LIST.AVAILABLE}
              type={INFO_SECTION_TYPE.DATE_PICKER}
              onUpdate={(text: string) => {
                onUpdateOrder(ORDER_KEYS.DELIVERY_DATE_PLAN, text);
              }}
            />
            <InfoSection
              style={styles.section}
              label={t('ViewOrder_fifth_section')}
              value={orderData.truckVin}
              editable={type === ORDER_LIST.AVAILABLE}
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
              onPress={onPress}
            />
            {type !== ORDER_LIST.IN_PROGRESS && (
              <View style={styles.secondaryButtonContainer}>
                {type === ORDER_LIST.WAITING_APPROVAL ? (
                  <Button
                    style={styles.secondaryButton}
                    textStyle={styles.primaryButtonText}
                    title={t('ViewOrder_decline_button')}
                    onPress={onDecline}
                  />
                ) : (
                  <View style={styles.buttonsContainer}>
                    <Button
                      style={styles.secondaryButton}
                      textStyle={styles.primaryButtonText}
                      title={t('ViewOrder_cancel_button')}
                      onPress={goBack}
                    />
                    <Button
                      style={styles.secondaryButton}
                      textStyle={styles.primaryButtonText}
                      title={t('ViewOrder_delete_button')}
                      onPress={onDelete}
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
