import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { RoundButton } from 'components/RoundButton';
import { Preloader } from 'components/Preloader';
import { colors } from 'constants/colors';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './ShippingPointScreen.styles';
import { MOCK_SHIPPING_POINTS, MockShippingPoint } from 'mocks/mockShippingPoints';

import { PlusIcon } from 'src/assets/icons';

export const ShippingPointScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();

  const [data, setData] = useState<MockShippingPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockShippingPoint[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_SHIPPING_POINTS);
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

  const onAddShippingPoint = useCallback(() => {
    navigate('ShippingPointViewScreen', { point: undefined });
  }, [navigate]);

  const onEditShippingPoint = useCallback((point: MockShippingPoint) => {
    navigate('ShippingPointViewScreen', { point });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockShippingPoint}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onEditShippingPoint(item)}>
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
          {`${item.address.city}, ${item.address.street}, ${item.address.house}`}
        </Text>
      </View>
    </TouchableOpacity>
  ), [onEditShippingPoint, styles, t]);

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
            onPress={onAddShippingPoint}
          />
        </View>
        {isLoading && <Preloader style={styles.preloader} />}
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </Screen>
  );
};