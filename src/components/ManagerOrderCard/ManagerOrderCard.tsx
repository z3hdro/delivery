import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import { RoundButton } from 'components/RoundButton';
import { getNomenclatureLabel } from 'utils/nomeclatureLabel';
import { useStyles } from './ManagerOrderCard.styles';
import { Props } from './ManagerOrderCard.types';

export const ManagerOrderCard: FC<Props> = ({
  order,
  onPress,
  buttonTitle,
  t,
}) => {
  const styles = useStyles();

  const nomenclatureLabel = useMemo(() => {
    if (order.nomenclatures) {
      return getNomenclatureLabel(order.nomenclatures);
    }
    return '';
  }, [order.nomenclatures]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.cell}>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_departure_label')}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoValue}>
            {order.departure?.Address.City?.name ?? ''}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_destination_label')}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoValue}>
            {order.destination?.Address.City?.name ?? ''}
          </Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_nomenclature_label')}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoValue}>
            {nomenclatureLabel}
          </Text>
        </View>
      </View>
      <RoundButton
        style={styles.button}
        textStyle={styles.buttonText}
        title={buttonTitle}
        onPress={() => onPress(order)}
      />
    </View>
  );
};
