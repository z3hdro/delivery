import React, { useCallback, useState } from 'react';
import { Alert, DeviceEventEmitter, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { InfoSection } from 'components/InfoSection';
import { Button } from 'components/Button';
import { RoundButton } from 'components/RoundButton';
import { Checkbox } from 'components/Checkbox';
import { useManagerNavigator } from 'navigation/hooks';
import { EMPTY_CARGO_DATA, INITIAL_CARGO_DATA } from './CreateOrderScreen.consts';
import { CARGO_KEYS, COST_TYPE } from 'constants/order';
import { colors } from 'constants/colors';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { useStyles } from './CreateOrderScreen.styles';
import { Cargo, LogisticPointView } from './CreateOrderScreen.types';
import { Nomenclature } from 'types/nomenclature';

import { PlusIcon, XIcon } from 'src/assets/icons';
import { networkService } from 'services/network';
import { LogisticPoint } from 'services/network/types';
import { AxiosError } from 'axios';
import { EMIT_EVENTS } from 'constants/emitEvents';

export const CreateOrderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();

  const [departure, setDeparture] = useState<LogisticPointView | null>(null);
  const [delivery, setDelivery] = useState<LogisticPointView | null>(null);
  const [departureDatePlan, setDepartureDatePlan] = useState<string>('');
  const [deliveryDatePlan, setDeliveryDatePlan] = useState<string>('');
  const [cargoData, setCargoData] = useState<Cargo[]>(INITIAL_CARGO_DATA);
  const [costType, setCostType] = useState<COST_TYPE>(COST_TYPE.ROUTE);
  const [cashPrice, setCashPrice] = useState<string>('');
  const [cashlessPrice, setCashlessPrice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onAddCargo = useCallback(() => {
    setCargoData((prevState) => ([...prevState, { ...EMPTY_CARGO_DATA }]));
  }, []);

  const resetForm = useCallback(() => {
    setDeparture(null);
    setDelivery(null);
    setDeliveryDatePlan('');
    setDepartureDatePlan('');
    setCostType(COST_TYPE.ROUTE);
    setCargoData(INITIAL_CARGO_DATA);

    DeviceEventEmitter.emit(EMIT_EVENTS.RESET_SECTION);
  }, []);

  console.log('cargoData: ', cargoData);
  console.log('cashPrice: ', cashPrice);
  console.log('cashlessPrice: ', cashlessPrice);

  const updateData = useCallback((index: number, key: CARGO_KEYS, value: string | null) => {
    setCargoData((prevState) => {
      const temp = [...prevState];
      const item = temp[index];
      item[key] = value ?? '';
      return temp;
    });
  }, []);

  const onDeleteCargo = useCallback((selectedIndex: number) => {
    setCargoData((prevState) =>
      prevState.filter((_, index) => index !== selectedIndex)
    );
  }, []);

  const onNavigateCargo = useCallback((index: number) => {
    navigate('SelectCargoScreen', {
      onSelect: (item: Nomenclature) => {
        setCargoData((prevState) => {
          const tempData =  [...prevState];
          const cargoItem = tempData[index];
          cargoItem.name = item.name;
          cargoItem.id = item.id;
          return tempData;
        });
      }
    });
  }, [navigate]);

  const onNavigateDeparture = useCallback(() => {
    navigate('SelectLogisticPointScreen', {
      onSelect: (item: LogisticPoint) => {
        setDeparture({
          id: item.id,
          name: item.name
        });
      }
    });
  }, [navigate]);

  const onNavigateDelivery = useCallback(() => {
    navigate('SelectLogisticPointScreen', {
      onSelect: (item: LogisticPoint) => {
        setDelivery({
          id: item.id,
          name: item.name
        });
      }
    });
  }, [navigate]);

  const onCreateOrder = async () => {
    try {
      setIsLoading(true);

      if (
        !departure?.id
        || !delivery?.id
        || !cashPrice.trim().length
        || !cashlessPrice.trim().length
        || !departureDatePlan
        || !deliveryDatePlan
        || !cargoData.every(({ id }) => !!id)
        || !cargoData.length
      ) {
        Alert.alert(t('CreateOrder_error_title'), t('CreateOrder_error_message'));
        return;
      }

      console.log('cargoData: ', cargoData);
      const payload = {
        departureId: departure.id,
        destinationId: delivery.id,
        costType,
        priceNonCash: +cashlessPrice,
        priceCash: +cashPrice,
        plannedLoadingDate: departureDatePlan,
        plannedDeliveryDate: deliveryDatePlan,
        nomenclatures: cargoData
          .map(({ id, grossWeight, netWeight }) =>
            ({ id, grossWeight: +grossWeight, netWeight: +netWeight })
          ),
      };

      console.log('payload: ', payload);

      await networkService.addOrder(payload);

      resetForm();

      return;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log('e message: ', e?.message);
        console.log('e status: ', e?.code);
      }
      console.log('onCreateOrder error', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CreateOrder_header_title')}
        />
      }>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <InfoSection
          label={t('CreateOrder_first_section')}
          value={departure?.name || ''}
          onNavigate={onNavigateDeparture}
          type={INFO_SECTION_TYPE.SCREEN}
        />
        <InfoSection
          style={styles.section}
          label={t('CreateOrder_second_section')}
          value={delivery?.name || ''}
          onNavigate={onNavigateDelivery}
          type={INFO_SECTION_TYPE.SCREEN}
        />
        <View style={styles.section}>
          {cargoData.map((cargo, index) => {
            return (
              <View key={`${index}_${cargo.name}`} style={styles.cargoRow}>
                <InfoSection
                  style={styles.cargoPicker}
                  label={t('CreateOrder_third_section')}
                  value={cargoData[index].name || ''}
                  onNavigate={() => onNavigateCargo(index)}
                  type={INFO_SECTION_TYPE.SCREEN}
                />
                <InfoSection
                  style={styles.cargoWeight}
                  textInputStyle={styles.weightStyle}
                  labelStyle={styles.weightTextStyle}
                  label={t('CreateOrder_fourth_section')}
                  value={cargo.grossWeight}
                  onUpdate={(text: string) => {
                    updateData(index, CARGO_KEYS.GROSS_WEIGHT, text);
                  }}
                  keyboardType={'numeric'}
                />
                <InfoSection
                  style={styles.cargoWeight}
                  textInputStyle={styles.weightStyle}
                  labelStyle={styles.weightTextStyle}
                  label={t('CreateOrder_fifth_section')}
                  value={cargo.netWeight}
                  onUpdate={(text: string) => {
                    updateData(index, CARGO_KEYS.NET_WEIGHT, text);
                  }}
                  keyboardType={'numeric'}
                />
                <Pressable onPress={() => onDeleteCargo(index)}>
                  <View style={styles.deleteButton}>
                    <XIcon height={24} width={24} color={colors.color2} />
                  </View>
                </Pressable>
              </View>
            );
          })}
          <View style={styles.addCargoContainer}>
            <RoundButton
              leftIcon={<PlusIcon height={12} width={12} color={colors.red} />}
              title={t('CreateOrder_add_cargo_button')}
              onPress={onAddCargo}
            />
          </View>
          <Checkbox
            style={styles.section}
            label={t('CreateOrder_price_first_option')}
            value={costType === COST_TYPE.ROUTE}
            onPress={() => {
              setCostType(COST_TYPE.ROUTE);
            }}
          />
          <Checkbox
            style={styles.section}
            label={t('CreateOrder_price_second_option')}
            value={costType === COST_TYPE.TON}
            onPress={() => {
              setCostType(COST_TYPE.TON);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_sixth_section')}
            value={cashPrice}
            keyboardType={'numeric'}
            onUpdate={(text) => {
              setCashPrice(text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_seventh_section')}
            value={cashlessPrice}
            keyboardType={'numeric'}
            onUpdate={(text) => {
              setCashlessPrice(text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_eight_section')}
            value={departureDatePlan}
            type={INFO_SECTION_TYPE.DATE_PICKER}
            onUpdate={(text) => {
              setDepartureDatePlan(text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_ninth_section')}
            value={deliveryDatePlan}
            type={INFO_SECTION_TYPE.DATE_PICKER}
            onUpdate={(text) => {
              setDeliveryDatePlan(text);
            }}
          />

          <Button
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            title={t('CreateOrder_create_button')}
            onPress={onCreateOrder}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};
