import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Preloader } from 'components/Preloader';
import { DriverCard } from 'components/DriverCard';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './ApprovedList.styles';
import { USER } from 'constants/user';
import { MOCK_DRIVERS, MockDriver } from 'mocks/mockDrivers';

export const ApprovedList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<MockDriver[]>([]);
  // const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockDriver[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_DRIVERS);
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
  // const fetchMoreData = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const result: MockOrder[] = await new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(MOCK_ORDERS_PAGINATE);
  //       }, 1000);
  //     });
  //
  //     if (result.length) {
  //       setData(prevState => ([...prevState, ...result]));
  //       // setPage(prevState => prevState + 1);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  const onDriverPress = useCallback( (driver: MockDriver) => {
    navigate('UserViewScreen', { driver, type: USER.APPROVED });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockDriver}) => (
    <DriverCard driver={item} t={t} onPress={() => onDriverPress(item)} />
  ), [onDriverPress, t]);


  return (
    <>
      {isLoading && <Preloader style={styles.preloader} />}
      <FlatList
        style={styles.list}
        keyExtractor={item => item.userId.toString()}
        data={data}
        renderItem={renderItem}
        // onEndReachedThreshold={0.2}
        // onEndReached={fetchMoreData}
      />
    </>
  );
};