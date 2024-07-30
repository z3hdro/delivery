import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ManagerOrderCard } from 'components/ManagerOrderCard';
import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './WaitingApprovalList.styles';
import { ORDER_LIST, ORDER_TAB_STATUS } from 'constants/order';
import { ORDER_LIMIT } from 'constants/limit';
import { Order } from 'types/order';

export const WaitingApprovalList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < offset * ORDER_LIMIT, [data.length, offset]);

  const fetchData = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { orders } = await networkService.getAllOrders(offset, ORDER_TAB_STATUS.CONFIRMATION);
      if (Array.isArray(orders)) {
        setData((prevState) => offset === 0 ? orders : ([...prevState, ...orders]));
        setOffset((prevState) => prevState + 1);
      }
    } catch (e) {
      console.log('waiting approval list e: ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      if (shouldRefresh) {
        await fetchData(0);
      }
      setShouldRefresh(false);
    })();
  }, [fetchData, shouldRefresh]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached || isLoading) {
      return;
    } else {
      await fetchData(offset);
    }
  }, [fetchData, isLimitReached, offset]);

  const onApprovePress = useCallback( (order: Order) => {
    navigate('ViewOrderScreen', {
      order, type:
      ORDER_LIST.WAITING_APPROVAL,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: Order}) => (
    <ManagerOrderCard
      order={item}
      buttonTitle={t('CargoList_waiting_approval_button')}
      t={t}
      onPress={onApprovePress}
    />
  ), [onApprovePress, t]);


  return (
    <>
      {isLoading && <Preloader style={styles.preloader} />}
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
      />
    </>
  );
};
