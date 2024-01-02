import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Screen } from 'components/Screen';
import { useStyles } from './NomenclatureViewScreen.styles';
import { BackIcon } from 'src/assets/icons';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import { NomenclatureMeasurePicker } from 'components/NomenclatureMeasurePicker';
import { NomenclatureNamePicker } from 'components/NomenclatureNamePicker';
import { Button } from 'components/Button';

export const NomenclatureViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useManagerNavigator();
  const { params: { nomenclature } } = useManagerRoute<'NomenclatureViewScreen'>();

  const isEdit = useMemo(() => !!nomenclature, [nomenclature]);

  const [name, setName] = useState<string | null>(nomenclature?.name ?? null);
  const [measure, setMeasure] = useState<string | null>(nomenclature?.measureId.toString() ?? null);
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

  const onChangeName = useCallback((text: string | null) => {
    setName(text);
  }, []);

  const onChangeMeasure = useCallback((text: string | null) => {
    setMeasure(text);
  }, []);

  const onAddPosition = useCallback(() => {
    console.log('add position');
    goBack();
  }, [goBack]);

  const onSavePosition = useCallback(() => {
    console.log('save position');
  }, []);

  const onDeletePosition = useCallback(() => {
    console.log('delete position');
  }, []);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          title={t('Nomenclature_view_header_title')}
          leftPart={renderLeftPart()}
        />
      }>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View>
          <Text style={styles.label}>
            {t('Nomenclature_add_first_section')}
          </Text>
          <NomenclatureNamePicker value={name} onChangeValue={onChangeName} />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>
            {t('Nomenclature_add_second_section')}
          </Text>
          <NomenclatureMeasurePicker value={measure} onChangeValue={onChangeMeasure} />
        </View>

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