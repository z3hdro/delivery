import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Preloader } from 'components/Preloader';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './WaitingApprovalList.styles';
import { USER } from 'constants/user';
import { MOCK_USERS, MockUser } from 'mocks/mockUsers';
import { UserCard } from 'components/UserCard';

export const WaitingApprovalList = () => {
  const { t } = useTranslation();
  const { navigate } = useManagerNavigator();
  const styles = useStyles();

  const [data, setData] = useState<MockUser[]>([]);
  // const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockUser[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_USERS);
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

  const onUserPress = useCallback( (user: MockUser) => {
    navigate('UserViewScreen', { user, type: USER.WAITING_APPROVAL });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockUser}) => (
    <UserCard user={item} t={t} onPress={() => onUserPress(item)} />
  ), [onUserPress, t]);


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