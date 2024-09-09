import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import { Screen } from 'components/Screen';
import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { useStyles } from './SelectCargoScreen.styles';
import { NOMENCLATURE_LIMIT } from 'constants/limit';
import { Nomenclature } from 'types/nomenclature';

import { BackIcon } from 'assets/icons';

export const SelectCargoScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const { goBack } = useManagerNavigator();
  const { params: { onSelect } } = useManagerRoute<'SelectCargoScreen'>();

  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Nomenclature[]>([]);
  const [searchData, setSearchData] = useState<Nomenclature[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const [debouncedSearchValue] = useDebounce(search, 500);

  const isLimitReached = useMemo(() => data.length < offset * NOMENCLATURE_LIMIT, [data.length, offset]);

  const fetchMeasures = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const result = await networkService.getNomenclatures(offset);
      if (result.length) {
        setData((prevState) => offset === 0 ? result : ([...prevState, ...result]));
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

  useEffect(() => {
    if (debouncedSearchValue.trim().length) {
      void (async () => {
        try {
          setIsLoading(true);
          const result = await networkService.searchNomenclatures(debouncedSearchValue);

          if (result.length) {
            setSearchData(result);
          }

        } catch (e) {
          console.log('search SelectCargoScreen error ', e);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [debouncedSearchValue]);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const onSelectItem = useCallback((item: Nomenclature) => {
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

  const renderItem = useCallback(({ item }: { item: Nomenclature}) => (
    <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.item}>
      <Text style={styles.itemText}>{`${item.measure.name} ${item.name}`}</Text>
    </TouchableOpacity>
  ), [onSelectItem, styles]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('SelectCargo_title')}
          leftPart={renderLeftPart()}
        />
      }>
      <View style={styles.container}>
        <TextInput
          value={search}
          onChangeText={setSearch}
        />
        {isLoading && <Preloader style={styles.preloader} />}
        {debouncedSearchValue.trim().length ? (
          <FlatList
            style={styles.list}
            data={searchData}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
          />
        ) : (
          <FlatList
            style={styles.list}
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
          />
        )}
      </View>
    </Screen>
  );
};
