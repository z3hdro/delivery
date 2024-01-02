import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { RoundButton } from 'components/RoundButton';
import { Preloader } from 'components/Preloader';
import { colors } from 'constants/colors';
import { useManagerNavigator } from 'navigation/hooks';
import { useStyles } from './NomenclatureScreen.styles';
import { MOCK_NOMENCLATURE, MockNomenclature } from 'mocks/mockNomenclature';

import { PlusIcon } from 'assets/images';

export const NomenclatureScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate } = useManagerNavigator();

  const [data, setData] = useState<MockNomenclature[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      try {
        // TODO: replace by API
        const result: MockNomenclature[] = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(MOCK_NOMENCLATURE);
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

  const onAddPosition = useCallback(() => {
    navigate('NomenclatureViewScreen', { nomenclature: undefined });
  }, [navigate]);

  const onEditPosition = useCallback((nomenclature: MockNomenclature) => {
    navigate('NomenclatureViewScreen', { nomenclature });
  }, [navigate]);

  const renderItem = useCallback(({ item }: { item: MockNomenclature}) => (
    <TouchableOpacity onPress={() => onEditPosition(item)} style={styles.nomenclatureContainer}>
      <Text style={styles.nomenclatureText}>{`${item.measureId}${item.name}`}</Text>
    </TouchableOpacity>
  ), [onEditPosition, styles]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('CreateOrder_header_title')}
        />
      }>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.addPosition}>
          <RoundButton
            leftIcon={<PlusIcon height={12} width={12} color={colors.red} />}
            title={t('CreateOrder_add_cargo_button')}
            onPress={onAddPosition}
          />
        </View>
        {isLoading && <Preloader style={styles.preloader} />}
        <FlatList style={styles.list} data={data} renderItem={renderItem} />
      </ScrollView>
    </Screen>
  );
};