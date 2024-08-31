import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { useStyles } from './SelectMeasureScreen.styles';
import { MEASURE_LIMIT } from 'constants/limit';
import { Measure } from 'types/measure';

import { BackIcon } from 'assets/icons';

export const SelectMeasureScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { goBack } = useManagerNavigator();
  const { params: { onSelect } } = useManagerRoute<'SelectMeasureScreen'>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Measure[]>([]);
  const [offset, setOffset] = useState<number>(0);

  console.log('data: ', data);

  const isLimitReached = useMemo(() => data.length < offset * MEASURE_LIMIT, [data.length, offset]);

  const fetchMeasures = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { measures } = await networkService.getAllMeasures(offset);
      if (measures.length) {
        setData((prevState) => offset === 0 ? measures : ([...prevState, ...measures]));
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
      await fetchMeasures(0);
    })();
  }, [fetchMeasures]);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const onSelectItem = useCallback((item: Measure) => {
    onSelect(item);
    goBack();
  }, [goBack, onSelect]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached || isLoading) {
      return;
    } else {
      await fetchMeasures(offset);
    }
  }, [fetchMeasures, isLimitReached, offset, isLoading]);

  const renderItem = useCallback(({ item }: { item: Measure}) => (
    <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  ), [onSelectItem, styles]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('SelectMeasure_title')}
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
