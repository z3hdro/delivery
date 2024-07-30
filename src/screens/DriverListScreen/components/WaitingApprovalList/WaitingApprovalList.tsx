import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './WaitingApprovalList.styles';
import { USER } from 'constants/user';
import { UserCard } from 'components/UserCard';
import { DRIVER_LIST_LIMIT } from 'constants/limit';
import { UnapprovedDriver } from 'types/user';

export const WaitingApprovalList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<UnapprovedDriver[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < offset * DRIVER_LIST_LIMIT, [data.length, offset]);

  const fetchLogisticPoints = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { users } = await networkService.getUnapprovedDrivers(offset);
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
    if (isLimitReached || isLoading) {
      return;
    } else {
      await fetchLogisticPoints(offset);
    }
  }, [fetchLogisticPoints, isLimitReached, offset, isLoading]);

  const onUserPress = useCallback( (user: UnapprovedDriver) => {
    navigate('UserViewScreen', {
      user,
      type: USER.WAITING_APPROVAL,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: UnapprovedDriver}) => (
    <UserCard user={item} t={t} onPress={() => onUserPress(item)} />
  ), [onUserPress, t]);

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
