import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { useStyles } from './SelectLogisticPointScreen.styles';
import { LOGISTIC_POINT_LIMIT } from 'constants/limit';

import { BackIcon } from 'assets/icons';
import { LogisticPoint } from 'services/network/types';

export const SelectLogisticPointScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { goBack } = useManagerNavigator();
  const { params: { onSelect } } = useManagerRoute<'SelectLogisticPointScreen'>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<LogisticPoint[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const isLimitReached = useMemo(() => data.length < offset * LOGISTIC_POINT_LIMIT, [data.length, offset]);

  const fetchLogisticPoints = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { logisticPoints } = await networkService.getAllLogisticPoint(offset);
      if (logisticPoints.length) {
        setData((prevState) => offset === 0 ? logisticPoints : ([...prevState, ...logisticPoints]));
        setOffset((prevState) => prevState + 1);
      }
    } catch (e) {
      console.log('SelectCargoScreen error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchLogisticPoints(0);
    })();
  }, [fetchLogisticPoints]);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const onSelectItem = useCallback((item: LogisticPoint) => {
    onSelect(item);
    goBack();
  }, [goBack, onSelect]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached || isLoading) {
      return;
    } else {
      await fetchLogisticPoints(offset);
    }
  }, [fetchLogisticPoints, isLimitReached, offset, isLoading]);

  const renderItem = useCallback(({ item }: { item: LogisticPoint}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onSelectItem(item)}>
      <View>
        <Text style={styles.label}>
          {t('ShippingPointScreen_first_label')}
        </Text>
        <Text style={styles.value}>
          {item.name}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>
          {t('ShippingPoint_second_label')}
        </Text>
        <Text style={styles.value}>
          {`${item.Address.City.name}, ${item.Address.Street.name}, ${item.Address.house}`}
        </Text>
      </View>
    </TouchableOpacity>
  ), [onSelectItem, styles, t]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          style={styles.header}
          titleStyle={styles.title}
          titleTextStyle={styles.titleText}
          title={t('SelectLogisticPoint_title')}
          leftPart={renderLeftPart()}
        />
      }>
      <View style={styles.container}>
        {isLoading && <Preloader style={styles.preloader} />}
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={onEndReached}
        />
      </View>
    </Screen>
  );
};
