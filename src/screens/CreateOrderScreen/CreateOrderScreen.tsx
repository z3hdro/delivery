import React, { useCallback, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { InfoSection } from 'components/InfoSection';
import { DeparturePointPicker } from 'components/DeparturePointPicker';
import { DeliveryPointPicker } from 'components/DeliveryPointPicker';
import { Button } from 'components/Button';
import { CargoPicker } from 'components/CargoPicker';
import { RoundButton } from 'components/RoundButton';
import { Checkbox } from 'components/Checkbox';
import {
  EMPTY_CARGO_DATA,
  INITIAL_CARGO_DATA,
  INITIAL_ORDER_DATA,
  PRICE_OPTION
} from './CreateOrderScreen.consts';
import { CARGO_KEYS } from 'constants/order';
import { colors } from 'constants/colors';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { useStyles } from './CreateOrderScreen.styles';
import { Cargo, OrderData } from './CreateOrderScreen.types';

import { PlusIcon } from 'src/assets/icons';

export const CreateOrderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [orderData, setOrderData] = useState<OrderData>(INITIAL_ORDER_DATA);
  const [departure, setDeparture] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<string | null>(null);
  const [departureDatePlan, setDepartureDatePlan] = useState<string>('');
  const [deliveryDatePlan, setDeliveryDatePlan] = useState<string>('');
  const [cargoData, setCargoData] = useState<Cargo[]>(INITIAL_CARGO_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [priceOption, setPriceOption] = useState<PRICE_OPTION>(PRICE_OPTION.FULL);

  const onAddCargo = useCallback(() => {
    setCargoData((prevState) => ([...prevState, { ...EMPTY_CARGO_DATA }]));
  }, []);

  const updateData = useCallback((index: number, key: CARGO_KEYS, value: string | null) => {
    setCargoData((prevState) => {
      const temp = [...prevState];
      const item = temp[index];
      item[key] = value ?? '';
      return temp;
    });
  }, []);

  const onChangeDeparture = useCallback((text: string | null) => {
    setDeparture(text);
  }, []);

  const onChangeDelivery = useCallback((text: string | null) => {
    setDelivery(text);
  }, []);

  const onChangeCargo = useCallback((index: number, text: string | null) => {
    setCargoData((prevState) => {
      const tempData =  [...prevState];
      const cargoItem = tempData[index];
      cargoItem.name = text;
      return tempData;
    });
  }, []);

  const onCreateOrder = useCallback(() => {
    try {
      setIsLoading(true);
      return;
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CreateOrder_header_title')}
        />
      }>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.label}>
            {t('CreateOrder_first_section')}
          </Text>
          <DeparturePointPicker
            value={departure}
            onChangeValue={onChangeDeparture}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>
            {t('CreateOrder_second_section')}
          </Text>
          <DeliveryPointPicker
            value={delivery}
            onChangeValue={onChangeDelivery}
          />
        </View>
        <View style={styles.section}>
          {cargoData.map((cargo, index) => {
            return (
              <View key={`${index}_${cargo.name}`} style={styles.cargoRow}>
                <View style={styles.cargoPicker}>
                  <Text style={styles.label}>
                    {t('CreateOrder_third_section')}
                  </Text>
                  <CargoPicker
                    value={cargoData[index].name}
                    onChangeValue={(text) => {
                      onChangeCargo(index, text);
                    }}
                  />
                </View>
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
            value={priceOption === PRICE_OPTION.FULL}
            onPress={() => {
              setPriceOption(PRICE_OPTION.FULL);
            }}
          />
          <Checkbox
            style={styles.section}
            label={t('CreateOrder_price_second_option')}
            value={priceOption === PRICE_OPTION.PARTIAL}
            onPress={() => {
              setPriceOption(PRICE_OPTION.PARTIAL);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_sixth_section')}
            value={departureDatePlan}
            onUpdate={(text) => {
              setDepartureDatePlan(text);
            }}
          />
          <InfoSection
            style={styles.section}
            label={t('CreateOrder_seventh_section')}
            value={departureDatePlan}
            onUpdate={(text) => {
              setDepartureDatePlan(text);
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