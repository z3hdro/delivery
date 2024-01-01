import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { RoundButton } from 'components/RoundButton';

import { useStyles } from './ManagerOrderCard.styles';
import { Props } from './ManagerOrderCard.types';

export const ManagerOrderCard: FC<Props> = ({
  order,
  onPress,
  buttonTitle,
  t,
}) => {
  const styles = useStyles();
  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_departure_label')}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoValue}>
            {order.departure.address.city}
          </Text>
        </View>
        <View>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_destination_label')}
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.infoValue}>
            {order.destination.address.city}
          </Text>
        </View>
        <View>
          <Text style={styles.infoLabel}>
            {t('CargoList_waiting_approval_nomenclature_label')}
          </Text>
          <Text style={styles.infoValue}>
            {order.nomenclature.name}
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