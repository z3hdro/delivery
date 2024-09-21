import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

import { Preloader } from 'components/Preloader';
import { UserCard } from 'components/UserCard';
import { networkService } from 'services/network';
import { useManagerNavigator } from 'navigation/hooks';
import { useAppSelector } from 'hooks/useAppSelector';
import { resetNewDriversQty } from 'store/slices';
import { selectNewDriversQty } from 'store/selectors';
import { DRIVER_LIST_LIMIT } from 'constants/limit';
import { USER } from 'constants/user';
import { UnapprovedDriver } from 'types/user';

import { useStyles } from './WaitingApprovalList.styles';
import { useAppDispatch } from 'hooks/useAppDispatch';

export const WaitingApprovalList = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const newDriversQty = useAppSelector(selectNewDriversQty);
  const dispatch = useAppDispatch();
  const { navigate } = useManagerNavigator();

  const [data, setData] = useState<UnapprovedDriver[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < offset * DRIVER_LIST_LIMIT, [data.length, offset]);

  useFocusEffect(useCallback(() => {
    console.log('isFocused WaitingApprovalList for Drivers');
    if (newDriversQty > 0) {
      dispatch(resetNewDriversQty());
      setShouldRefresh(true);
    }
  }, [newDriversQty, dispatch]));

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
