import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { Button } from 'components/Button';
import { useStyles } from './InfoModal.styles';
import { Props } from './InfoModal.types';
import { LOGISTIC_POINT } from 'constants/map';

export const InfoModal: FC<Props> = ({
  mapPointInfo,
  onCloseModal,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <Modal
      isVisible={Boolean(mapPointInfo)}
      swipeDirection={['up', 'down']}
      onSwipeComplete={onCloseModal}
      style={styles.modal}
    >
      <View style={styles.centeredView}>
        <Text style={styles.modalNomenclature}>
          {mapPointInfo.nomenclatureName}
        </Text>
        <Text style={styles.logisticPoint}>
          {t(mapPointInfo.type === LOGISTIC_POINT.DEPARTURE
            ? 'Order_modal_departure'
            : 'Order_modal_destination')}
        </Text>
        <View>
          <Text style={styles.label}>
            {t('Order_modal_address')}
          </Text>
          <Text style={styles.description}>
            {mapPointInfo.address}
          </Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>
            {t('Order_modal_date')}
          </Text>
          <Text style={styles.description}>
            {mapPointInfo.planDate}
          </Text>
        </View>
        <Button
          style={styles.modalButton}
          textStyle={styles.primaryButtonText}
          title={t('Order_modal_close_button')}
          onPress={onCloseModal}
        />
      </View>
    </Modal>
  );
};