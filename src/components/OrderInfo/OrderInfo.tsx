import React, { FC, useMemo } from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import { generateLabel } from './OrderInfo.utils';
import { PLAN_DATE_FORMAT } from './OrderInfo.consts';
import { useStyles } from './OrderInfo.styles';
import { Props } from './OrderInfo.types';

export const OrderInfo: FC<Props> = ({
  address,
  planDate,
  contacts,
  isDeparture = false,
  style,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const addressLabel = useMemo(() => generateLabel(address), [address]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.labelText}>
        {t(isDeparture ? 'Order_loading_address' : 'Order_delivery_address' )}
      </Text>
      <Text style={[styles.descriptionText, styles.addressText]}>
        {addressLabel}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.labelText}>
        {t('Order_delivery_date')}
      </Text>
      <Text style={styles.descriptionText}>
        {format(new Date(planDate), PLAN_DATE_FORMAT)}
      </Text>

      {contacts.length && (
        <>
          <View style={styles.separator} />

          <Text style={styles.labelText}>
            {t('Order_delivery_contacts')}
          </Text>
          {contacts.map((contact) => {
            const fullName = `${contact.surname} ${contact.name} ${contact.partonymic}`;

            return (
              <View key={`${contact.phone}_${fullName}`} style={styles.contactItem}>
                <Text style={styles.descriptionText}>
                  {`+${contact.phone}`}
                </Text>
                <Text style={[styles.descriptionText, styles.contactNameText]}>
                  {fullName}
                </Text>
                <Text style={[styles.descriptionText, styles.additionalText]}>
                  {contact.jobTitle}
                </Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};