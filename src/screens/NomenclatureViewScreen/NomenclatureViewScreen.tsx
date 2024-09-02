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
import { DEFAULT_MEASURE_NAME } from './NomenclatureViewScreen.consts';
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
  const [isError, setIsError] = useState<boolean>(false);

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

      const nomenclatureName = name.trim();

      if (!nomenclatureName.length) {
        setIsError(true);
        return
      }

      let selectedMeasure = measure;

      if (!selectedMeasure) {
        const { measures } = await networkService.getAllMeasures(0);
        if (measures.length) {
          selectedMeasure = measures.find(({ name }) => name.toLowerCase() === DEFAULT_MEASURE_NAME) ?? null
        }
      }

      if (!selectedMeasure) {
        return
      }

      await networkService.addNomenclature({
        name,
        measureId: selectedMeasure.id
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

      const nomenclatureName = name.trim();

      if (!nomenclatureName.length) {
        setIsError(true);
        return
      }

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

  const onDeletePosition = useCallback(async () => {
    try {
      setIsLoading(true)

      if (!nomenclature) {
        return
      }

      await networkService.deleteNomenclature(nomenclature?.id)

      onUpdate();
      goBack();
    } catch (e) {
      console.log('delete nomenclature error: ', e);
    } finally {
      setIsLoading(false)
    }
  }, [goBack, onUpdate, nomenclature]);

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
          isRequired
          label={t('Nomenclature_add_first_section')}
          value={name}
          onUpdate={(text) => {
            if (isError) {
              setIsError(false);
            }
            setName(text);
          }}
          isError={isError}
          errorText={t('Nomenclature_add_error_empty_name')}
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
              disabled={isLoading}
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('Nomenclature_add_delete_button')}
              onPress={onDeletePosition}
            />
            <Button
              disabled={isLoading}
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
