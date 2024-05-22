import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { Button } from 'components/Button';
import { InfoSection } from 'components/InfoSection';
import { Preloader } from 'components/Preloader';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { INFO_SECTION_TYPE } from 'constants/infoSection';
import { useStyles } from './NomenclatureViewScreen.styles';
import { Measure } from 'types/measure';

import { BackIcon } from 'src/assets/icons';

export const NomenclatureViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { navigate, goBack } = useManagerNavigator();
  const { params: { nomenclature, onUpdate } } = useManagerRoute<'NomenclatureViewScreen'>();

  const isEdit = useMemo(() => !!nomenclature, [nomenclature]);
  console.log('isEdit: ', isEdit);

  const [name, setName] = useState<string>(nomenclature?.name || '');
  const [measure, setMeasure] = useState<Measure | null>(nomenclature?.measure || null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const onAddPosition = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!name.trim().length || !measure) {
        return;
      }

      await networkService.addNomenclature({
        name,
        measureId: measure.id
      });
      onUpdate();
      goBack();
    } catch (e) {
      console.log('adding nomenclature error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [goBack, measure, name, onUpdate]);

  const onSavePosition = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!name.trim().length || !measure || !nomenclature) {
        return;
      }

      const data = {
        id: nomenclature.id,
        name,
        measureId: measure.id
      };

      await networkService.updateNomenclature(nomenclature.id, data);
      onUpdate();
      goBack();
    } catch (e) {
      console.log('update nomenclature error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [goBack, measure, name, nomenclature, onUpdate]);

  // TODO: add DELETE request for nomenclature
  const onDeletePosition = useCallback(() => {
    goBack();
  }, [goBack]);

  const onNavigate = useCallback(() => {
    navigate('SelectMeasureScreen', {
      onSelect: (item: Measure) => {
        setMeasure(item);
      }
    });
  }, [navigate]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Nomenclature_view_header_title')}
          leftPart={renderLeftPart()}
        />
      }>
      {isLoading && <Preloader style={styles.preloader} />}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <InfoSection
          label={t('Nomenclature_add_first_section')}
          value={name}
          onUpdate={(text) => {
            setName(text);
          }}
        />
        <InfoSection
          style={styles.section}
          label={t('Nomenclature_add_second_section')}
          value={measure?.name || ''}
          onNavigate={onNavigate}
          type={INFO_SECTION_TYPE.SCREEN}
        />

        <Button
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          title={t(isEdit ? 'Nomenclature_add_save_button' : 'Nomenclature_add_button')}
          onPress={isEdit ? onSavePosition : onAddPosition}
          disabled={isLoading}
        />
        {isEdit && (
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('Nomenclature_add_delete_button')}
              onPress={onDeletePosition}
            />
            <Button
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('Nomenclature_add_cancel_button')}
              onPress={goBack}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};