import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './CargoListScreen.styles';
import { MOCK_ORDERS, MockOrder } from 'mocks/mockOrders';

export const renderScene = SceneMap({
  first: () => <View style={{ flex: 1 }} />,
  second: () => <View style={{ flex: 1 }} />,
});

export const CargoListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();
  const layout = useWindowDimensions();

  // TODO: replace by real data structure
  const [data, setData] = useState<MockOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);

  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

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

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CargoList_title')}
        />
      }>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </Screen>
  );
};