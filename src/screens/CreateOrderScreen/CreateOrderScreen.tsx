import React, { useCallback, useMemo, useState } from 'react';
import { DeviceEventEmitter, Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';

import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { InfoSection } from 'components/InfoSection';
import { Button } from 'components/Button';
import { RoundButton } from 'components/RoundButton';
import { Checkbox } from 'components/Checkbox';
import { useManagerNavigator } from 'navigation/hooks';
import { networkService } from 'services/network';
import { LogisticPoint } from 'services/network/types';
import { displayErrorMessage } from 'utils/alert';
import {
  EMPTY_CARGO_DATA,
  INITIAL_CARGO_DATA,
  INITIAL_CARGO_ERROR,
  INITIAL_CARGO_ERROR_MAP,
  INITIAL_ERROR_MAP
} from './CreateOrderScreen.consts';
import { CARGO_KEYS, COST_TYPE } from 'constants/order';
import { colors } from 'constants/colors';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { EMIT_EVENTS } from 'constants/emitEvents';
import { useStyles } from './CreateOrderScreen.styles';
import { Cargo, CargoError, ErrorMap, LogisticPointView } from './CreateOrderScreen.types';
import { Nomenclature } from 'types/nomenclature';

import { PlusIcon, XIcon } from 'src/assets/icons';

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
  const [isError, setIsError] = useState<ErrorMap>(INITIAL_ERROR_MAP);
  const [isCargoError, setIsCargoError] = useState<CargoError[]>(INITIAL_CARGO_ERROR_MAP);

  const isValidError = useMemo(() =>
    Object.values(isError).some((err) => err),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(isError)]);

  const onAddCargo = useCallback(() => {
    setCargoData((prevState) => ([...prevState, { ...EMPTY_CARGO_DATA }]));
    setIsCargoError(prevState => ([...prevState, { ...INITIAL_CARGO_ERROR }]));
  }, []);

  const resetIsError = useCallback(() => {
    if (isValidError) {
      setIsError({ ...INITIAL_ERROR_MAP });
    }
  }, [isValidError]);

  const resetCargoError = useCallback((selectedIndex: number) => {
    setIsCargoError((prevState) => prevState.map(
      (cargo, index) => index === selectedIndex ? INITIAL_CARGO_ERROR : cargo)
    );
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
    setIsCargoError(prevState => prevState.filter((_, index) => index !== selectedIndex));
  }, []);

  const onNavigateCargo = useCallback((index: number, isValidCargoError: boolean) => {
    navigate('SelectCargoScreen', {
      onSelect: (item: Nomenclature) => {
        setCargoData((prevState) => {
          const tempData =  [...prevState];
          const cargoItem = tempData[index];
          cargoItem.name = item.name;
          cargoItem.id = item.id;
          return tempData;
        });
        if (isValidCargoError) {
          resetCargoError(index);
        }
      }
    });
  }, [navigate, resetCargoError]);

  const onNavigateDeparture = useCallback(() => {
    navigate('SelectLogisticPointScreen', {
      onSelect: (item: LogisticPoint) => {
        setDeparture({
          id: item.id,
          name: item.name
        });
        resetIsError();
      }
    });
  }, [navigate, resetIsError]);

  const onNavigateDelivery = useCallback(() => {
    navigate('SelectLogisticPointScreen', {
      onSelect: (item: LogisticPoint) => {
        setDelivery({
          id: item.id,
          name: item.name
        });
        resetIsError();
      }
    });
  }, [navigate, resetIsError]);

  const onCreateOrder = async () => {
    try {
      setIsLoading(true);

      const errorMap = { ...INITIAL_ERROR_MAP };

      if (!departure?.id) {
        errorMap.departure = true;
      }

      if (!delivery?.id) {
        errorMap.destination = true;
      }

      if (!cashPrice.trim() && !cashlessPrice.trim()) {
        errorMap.price = true;
      }

      if (Object.values(errorMap).some((err) => err)) {
        setIsError(errorMap);
        return;
      }

      const cargoErrorMap = [] as CargoError[];
      const cargoErrorSet = new Set();

      cargoData.forEach((cargo, index) => {
        const cargoError = { ...INITIAL_CARGO_ERROR };
        if (!cargo?.id && !cargo?.name?.trim()) {
          cargoError.cargoName = true;
        }
        if (!cargo.netWeight.trim()) {
          cargoError.cargoNetWeight = true;
        }
        cargoErrorMap.push(cargoError);
        if (Object.values(cargoError).some(err => err)) {
          cargoErrorSet.add(index);
        }
      }, []);

      if (cargoErrorSet.size > 0) {
        setIsCargoError(cargoErrorMap);
        return;
      }

      console.log('cargoData: ', cargoData);
      const payload = {
        departureId: departure?.id as number,
        destinationId: delivery?.id as number,
        costType,
        priceNonCash: +cashlessPrice,
        priceCash: +cashPrice,
        plannedLoadingDate: departureDatePlan,
        plannedDeliveryDate: deliveryDatePlan,
        nomenclatures: cargoData
          .map(({ id, netWeight }) =>
            ({ id, netWeight: +netWeight })
          ),
      };

      console.log('payload: ', payload);

      await networkService.addOrder(payload);

      resetForm();

      navigate('MainBottomTabNavigator', { screen: 'CargoListScreen' });
      return;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log('e message: ', e?.message);
        console.log('e status: ', e?.code);
      }
      displayErrorMessage(e?.message as string ?? '');
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
          isRequired
          isError={isError.departure}
          errorText={t('CreateOrder_error_empty_departure')}
        />
        <InfoSection
          style={styles.section}
          label={t('CreateOrder_second_section')}
          value={delivery?.name || ''}
          onNavigate={onNavigateDelivery}
          type={INFO_SECTION_TYPE.SCREEN}
          isRequired
          isError={isError.destination}
          errorText={t('CreateOrder_error_empty_destination')}
        />
        <View style={styles.section}>
          {cargoData.map((cargo, index) => {
            const cargoError = isCargoError[index];
            const isValidCargoError = Object.values(cargoError).some(error => error);

            return (
              <View key={`${index}_${cargo.name}`} style={styles.cargoRow}>
                <InfoSection
                  style={styles.cargoPicker}
                  label={t('CreateOrder_third_section')}
                  value={cargoData[index].name || ''}
                  onNavigate={() => onNavigateCargo(index, isValidCargoError)}
                  type={INFO_SECTION_TYPE.SCREEN}
                  isRequired
                  isError={cargoError.cargoName}
                  errorText={t('CreateOrder_error_empty_cargo_name')}
                />
                <InfoSection
                  style={styles.cargoWeight}
                  textInputStyle={styles.weightStyle}
                  labelStyle={styles.weightTextStyle}
                  label={t('CreateOrder_fifth_section')}
                  value={cargo.netWeight}
                  onUpdate={(text: string) => {
                    if (isValidCargoError) {
                      resetCargoError(index);
                    }
                    updateData(index, CARGO_KEYS.NET_WEIGHT, text);
                  }}
                  keyboardType={'numeric'}
                  isRequired
                  isError={cargoError.cargoNetWeight}
                  errorText={t('CreateOrder_error_empty_cargo_net_weight')}
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
              resetIsError();
              setCashPrice(text);
            }}
            isError={isError.price}
            errorText={t('CreateOrder_error_empty_price')}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_seventh_section')}
            value={cashlessPrice}
            keyboardType={'numeric'}
            onUpdate={(text) => {
              resetIsError();
              setCashlessPrice(text);
            }}
            isError={isError.price}
            errorText={t('CreateOrder_error_empty_price')}
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
