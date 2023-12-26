import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { RoundButton } from 'components/RoundButton';
import { Loader } from 'components/Loader';
import { OrderCard } from 'components/OrderCard';
import { useDriverNavigator } from 'navigation/hooks';

import { useStyles } from './OrderListScreen.styles';
import { MOCK_ORDERS, MockOrder } from 'mocks/mockOrders';

import { MapIcon } from 'assets/images';

export const OrderListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useDriverNavigator();

  // TODO: replace by real data structure
  const [data, setData] = useState<MockOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockOrder[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_ORDERS);
          }, 1500);
        });
        setData(result);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // TODO: add after connecting the map and when design will be ready
  const showOnMap = useCallback(() => {
    navigate('DriverMap');
  }, [navigate]);

  // TODO: uncomment when sorting and filtering will be applied
  // const openFilters = useCallback(() => {
  //   console.log('open filters');
  // }, []);

  // const sortOrderList = useCallback(() => {
  //   console.log('add sorting logic');
  // }, []);

  // const renderFilter = useCallback(() => {
  //   return (
  //     <Pressable onPress={openFilters}>
  //       <View style={styles.filter}>
  //         <FilterIcon height={16} width={16} />
  //       </View>
  //     </Pressable>
  //
  //   );
  // }, [openFilters, styles]);

  const onOpenOrder = useCallback((order: MockOrder) => {
    navigate('OrderScreen', { order });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockOrder}) => {
    return (
      <OrderCard order={item} isDriver t={t} onPress={onOpenOrder} />
    );
  }, [onOpenOrder, t]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Orders_title')}
          // rightPart={renderFilter()}
        />
      }>
      <View style={styles.container}>
        <View style={styles.controlsContainer}>
          <RoundButton
            disabled
            title={t('Orders_check_map_label')}
            onPress={showOnMap}
            leftIcon={<MapIcon height={12} width={14} />}
          />
          {/*<RoundButton*/}
          {/*  disabled*/}
          {/*  title={t('Orders_sort_label')}*/}
          {/*  onPress={sortOrderList}*/}
          {/*  rightIcon={<TransferIcon height={12} width={12} />}*/}
          {/*  style={styles.sortButton}*/}
          {/*/>*/}
        </View>
        {isLoading ? (
          <Loader />
        ) : (
          <FlatList
            style={styles.list}
            keyExtractor={item => item.id.toString()}
            data={data}
            renderItem={renderItem}
          />
        )}
      </View>
    </Screen>
  );
};