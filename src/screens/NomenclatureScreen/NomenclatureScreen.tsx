import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { RoundButton } from 'components/RoundButton';
import { Preloader } from 'components/Preloader';
import { colors } from 'constants/colors';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './NomenclatureScreen.styles';

import { PlusIcon } from 'src/assets/icons';
import { networkService } from 'services/network';
import { NOMENCLATURE_LIMIT } from 'constants/limit';
import { Nomenclature } from 'types/nomenclature';

export const NomenclatureScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();

  const [data, setData] = useState<Nomenclature[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);

  const isLimitReached = useMemo(() => data.length < offset * NOMENCLATURE_LIMIT, [data.length, offset]);

  const fetchNomenclatures = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const result = await networkService.getNomenclatures(offset);
      if (result.length) {
        setData((prevState) => offset === 0 ? result : ([...prevState, ...result]));
        setOffset((prevState) => prevState + 1);
      }
    } catch (e) {
      console.log('NomenclatureMeasurePicker: ', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      if (shouldRefresh) {
        await fetchNomenclatures(0);
      }
      setShouldRefresh(false);
    })();
  }, [fetchNomenclatures, shouldRefresh]);

  const onEndReached = useCallback(async () => {
    if (isLimitReached || isLoading) {
      return;
    } else {
      await fetchNomenclatures(offset);
    }
  }, [fetchNomenclatures, isLimitReached, offset, isLoading]);

  const onAddPosition = useCallback(() => {
    navigate('NomenclatureViewScreen', {
      nomenclature: undefined,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const onEditPosition = useCallback((nomenclature: Nomenclature) => {
    navigate('NomenclatureViewScreen', {
      nomenclature,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: Nomenclature}) => (
    <TouchableOpacity onPress={() => onEditPosition(item)} style={styles.nomenclatureContainer}>
      <Text style={styles.nomenclatureText}>{item.name}</Text>
    </TouchableOpacity>
  ), [onEditPosition, styles]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Nomenclature_header_title')}
        />
      }>
      <View style={styles.container}>
        <View style={styles.addPosition}>
          <RoundButton
            leftIcon={<PlusIcon height={12} width={12} color={colors.red} />}
            title={t('CreateOrder_add_cargo_button')}
            onPress={onAddPosition}
          />
        </View>
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
