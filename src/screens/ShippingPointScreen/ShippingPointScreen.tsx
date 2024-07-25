import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { RoundButton } from 'components/RoundButton';
import { Preloader } from 'components/Preloader';
import { colors } from 'constants/colors';
import { useManagerNavigator } from 'navigation/hooks';
import { networkService } from 'services/network';
import { useStyles } from './ShippingPointScreen.styles';
import { MEASURE_LIMIT } from 'constants/limit';
import { LogisticPoint } from 'services/network/types';

import { PlusIcon } from 'src/assets/icons';

export const ShippingPointScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();

  const [data, setData] = useState<LogisticPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(true);

  const isLimitReached = useMemo(() => data.length < (offset + 1) * MEASURE_LIMIT, [data.length, offset]);

  const fetchLogisticPoints = useCallback(async (offset: number) => {
    try {
      setIsLoading(true);
      const { logisticPoints } = await networkService.getAllLogisticPoint(offset);
      if (logisticPoints.length) {
        setData((prevState) => offset === 0 ? logisticPoints : ([...prevState, ...logisticPoints]));
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

  const onLogisticPointPress = useCallback((point?: LogisticPoint) => {
    navigate('ShippingPointViewScreen', { point,
      onUpdate: () => {
        setShouldRefresh(true);
        setOffset(0);
      }
    });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: LogisticPoint}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onLogisticPointPress(item)}>
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
  ), [onLogisticPointPress, styles, t]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          style={styles.header}
          titleStyle={styles.title}
          titleTextStyle={styles.titleText}
          title={t('ShippingPoint_header_title')}
        />
      }>
      <View style={styles.container}>
        <View style={styles.addPoint}>
          <RoundButton
            leftIcon={<PlusIcon height={12} width={12} color={colors.red} />}
            title={t('ShippingPoint_add_point_button')}
            onPress={() => {
              onLogisticPointPress();
            }}
          />
        </View>
        {isLoading && <Preloader style={styles.preloader} />}
        {!isLoading && !data.length && (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              {t('ShippingPoint_empty_results')}
            </Text>
          </View>
        )}
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
