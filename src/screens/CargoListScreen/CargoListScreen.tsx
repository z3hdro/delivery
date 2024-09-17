import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { CompletionTabBar } from 'components/CompletionTabBar';
import { WaitingApprovalList, InProgressList, AvailableList, CompletedList } from './components';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { networkService } from 'services/network';
import { getTabIndex } from './CargoListScreen.utils';

import { TabBarRef } from 'components/CompletionTabBar/CompletionTabBar.types';
import { Order } from 'types/order';
import { useStyles } from './CargoListScreen.styles';

export const CargoListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { params } = useManagerRoute();
  const { setParams } = useManagerNavigator();
  console.log('params on CargoListScreen: ', params);

  const [orderFromNotification, setOrderFromNotification] = useState<Order | undefined>();
  const tabBarRef = useRef<TabBarRef>(null);

  useEffect(() => {
    console.log('params?.orderId: ', params?.orderId);
    const orderId =  params?.orderId;
    if (orderId) {
      void (async () => {
        try {
          const order = await networkService.getOrder(+orderId);

          if (order) {
            setOrderFromNotification(order);
            const index = getTabIndex(order.status);
            tabBarRef?.current?.switchTab?.(index);
          }
          console.log('order by orderId: ', order);
          setParams({ orderId: undefined });
        } catch (e) {
          console.log('error on CargoListScreen: ', e);
        }
      })();
    }
  }, [params?.orderId, setParams]);

  const resetInitialOrder = useCallback(() => {
    setOrderFromNotification(undefined);
  }, []);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CargoList_title')}
        />
      }>
      <View style={styles.container}>
        <CompletionTabBar
          tabBarRef={tabBarRef}
          tabsContainerStyle={styles.tabBar}
          firstLabel={t('CargoList_tab_one_label')}
          secondLabel={t('CargoList_tab_two_label')}
          thirdLabel={t('CargoList_tab_three_label')}
          firstScreen={<WaitingApprovalList initialOrder={orderFromNotification} resetInitialOrder={resetInitialOrder} />}
          secondScreen={<InProgressList initialOrder={orderFromNotification} resetInitialOrder={resetInitialOrder} />}
          thirdScreen={<AvailableList />}
          fourthScreen={<CompletedList initialOrder={orderFromNotification} resetInitialOrder={resetInitialOrder} />}
          displayIcons
        />
      </View>
    </Screen>
  );
};
