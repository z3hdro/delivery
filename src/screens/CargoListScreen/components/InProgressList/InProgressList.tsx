import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ManagerOrderCard } from 'components/ManagerOrderCard';
import { Preloader } from 'components/Preloader';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './InProgressList.styles';
import { ORDER_LIST } from 'constants/order';
import { MOCK_ORDERS, MockOrder } from 'mocks/mockOrders';
import { MOCK_ORDERS_PAGINATE } from 'mocks/mockOrdersPagination';

export const InProgressList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<MockOrder[]>([]);
  // const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockOrder[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_ORDERS);
          }, 1000);
        });
        setData(result);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // TODO: replace by API
  const fetchMoreData = useCallback(async () => {
    try {
      setIsLoading(true);
      const result: MockOrder[] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_ORDERS_PAGINATE);
        }, 1000);
      });

      if (result.length) {
        setData(prevState => ([...prevState, ...result]));
        // setPage(prevState => prevState + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onViewPress = useCallback( (order: MockOrder) => {
    navigate('ViewOrderScreen', { order, type: ORDER_LIST.IN_PROGRESS });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockOrder}) => (
    <ManagerOrderCard
      order={item}
      buttonTitle={t('CargoList_in_progress_button')}
      t={t}
      onPress={onViewPress}
    />
  ), [onViewPress, t]);


  return (
    <>
      {isLoading && <Preloader style={styles.preloader} />}
      <FlatList
        style={styles.list}
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
      />
    </>
  );
};