import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Preloader } from 'components/Preloader';
import { DriverCard } from 'components/DriverCard';
import { networkService } from 'services/network';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './ApprovedList.styles';
import { USER } from 'constants/user';
import { MEASURE_LIMIT } from 'constants/limit';
import { ApprovedDriver } from 'types/user';

export const ApprovedList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<ApprovedDriver[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < (offset + 1) * MEASURE_LIMIT, [data.length, offset]);

  const fetchLogisticPoints = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { users } = await networkService.getApprovedDrivers(offset);
      if (users?.length) {
        setData((prevState) => offset === 0 ? users : ([...prevState, ...users]));
        setOffset((prevState) => prevState + 1);
      }
    } catch (e) {
      console.log('getAllLogisticPoint error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      if (shouldRefresh) {
        await fetchLogisticPoints(0);
      }
      setShouldRefresh(false);
    })();
  }, [fetchLogisticPoints, shouldRefresh]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached) {
      return;
    } else {
      await fetchLogisticPoints(offset);
    }
  }, [fetchLogisticPoints, isLimitReached, offset]);

  const onDriverPress = useCallback( (driver: ApprovedDriver) => {
    navigate('UserViewScreen', {
      driver,
      type: USER.APPROVED,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: ApprovedDriver}) => (
    <DriverCard driver={item} t={t} onPress={() => onDriverPress(item)} />
  ), [onDriverPress, t]);


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
