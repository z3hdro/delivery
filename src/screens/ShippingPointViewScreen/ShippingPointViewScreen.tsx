import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'components/Preloader';
import { Screen } from 'components/Screen';
import { InfoSection } from 'components/InfoSection';
import { Button } from 'components/Button';
import { RoundButton } from 'components/RoundButton';
import { Accordion } from 'components/Accordion';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import {
  createInitialAddressData,
  createInitialContactData,
  createInitialExpandMap
} from './ShippingPointViewScreen.utils';
import { useStyles } from './ShippingPointViewScreen.styles';
import { colors } from 'constants/colors';
import {
  Address,
  AddressKeys,
  Contact,
  ContactKeys,
  ExpandedMap
} from './ShippingPointViewScreen.types';

import { BackIcon, PlusIcon, XIcon } from 'src/assets/icons';
import { EMPTY_CONTACT } from 'screens/ShippingPointViewScreen/ShippingPointViewScreen.consts';

export const ShippingPointViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useManagerNavigator();
  const { params: { point } } = useManagerRoute<'ShippingPointViewScreen'>();

  const isEdit = useMemo(() => !!point, [point]);

  const [name, setName] = useState<string>(point?.name ?? '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedAddress, setExpandedAddress] = useState<boolean>(false);
  const [expandedContacts, setExpandedContacts] = useState<ExpandedMap>(
    createInitialExpandMap(point)
  );
  const [addressData, setAddressData] = useState<Address>(
    createInitialAddressData(point)
  );
  const [contactData, setContactData] = useState<Contact[]>(
    createInitialContactData(point)
  );
  const [contacts, setContacts] = useState<Contact[]>(
    createInitialContactData(point)
  );

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

  const onUpdateName = useCallback((text: string) => {
    setName(text);
  }, []);

  const onAddressUpdate = useCallback((key: AddressKeys, text: string) => {
    setAddressData((prevState) => ({ ...prevState, [key]: text }));
  }, []);

  const onContactUpdate = useCallback((index: number, key: ContactKeys, text: string) => {
    setContactData((prevState) => {
      const temp = [...prevState];
      const contact = temp[index];
      contact[key] = text;
      return temp;
    });
  }, []);

  const onAddContact = useCallback(() => {
    setExpandedContacts((prevState) => ({ ...prevState, [contactData.length]: false }));
    setContacts(
      (prevState) => ([...prevState, { ...EMPTY_CONTACT }])
    );
    setContactData(
      (prevState) => ([...prevState, { ...EMPTY_CONTACT }])
    );
  }, [contactData.length]);

  const onDeleteContact = useCallback((selectedIndex: number) => {
    setExpandedContacts((prevState) => {
      const comparingIndex = String(selectedIndex);
      const keys = Object.keys(prevState).filter((index: string) => index !== comparingIndex);
      const updatedMap = {} as ExpandedMap;
      keys.forEach((key) => {
        updatedMap[key] = prevState[key];
      });
      return updatedMap;
    });
    setContacts(
      (prevState) => prevState.filter((_, index) => selectedIndex !== index)
    );
    setContactData(
      (prevState) => prevState.filter((_, index) => selectedIndex !== index)
    );
  }, []);

  const onExpandContact = useCallback((index: number, value: boolean) => {
    setExpandedContacts((prevState) => ({ ...prevState, [index]: value }));
  }, []);

  const onSaveShippingPoint = useCallback(async () => {
    try {
      setIsLoading(true);

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1500);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
    console.log('save position');
  }, []);

  const onDeleteShippingPoint = useCallback(() => {
    console.log('delete position');
  }, []);

  const renderAddressContent = useCallback(() => {
    const fields = Object.entries(addressData);

    return (
      <View style={styles.addressBlock}>
        {fields.map(([key, value], index) => {
          return (
            <InfoSection
              key={`address_${key}`}
              style={index > 0 ? styles.block : undefined}
              textInputStyle={styles.addressTextInput}
              label={t(`ShippingPointView_address_label_${index + 1}`)}
              value={value}
              onUpdate={(text) => {
                onAddressUpdate(key as AddressKeys, text);
              }}
            />
          );
        })}
      </View>
    );
  }, [addressData, onAddressUpdate, styles, t]);

  const renderContactContent = useCallback((contact: Contact, innerIndex: number) => {
    const fields = Object.entries(contact);

    return (
      <View style={styles.contactBlock}>
        {fields.map(([key, value], index) => {
          return (
            <InfoSection
              key={`contact_${index}_${key}`}
              style={index > 0 ? styles.block : undefined}
              textInputStyle={styles.addressTextInput}
              label={t(`ShippingPointView_contact_label_${index + 1}`)}
              value={value}
              onUpdate={(text) => {
                onContactUpdate(innerIndex, key as ContactKeys, text);
              }}
            />
          );
        })}

        <View style={styles.deleteButtonContainer}>
          <RoundButton
            style={styles.deleteButton}
            textStyle={styles.deleteButtonText}
            leftIcon={<XIcon height={16} width={16} color={colors.color2} />}
            title={t('ShippingPointView_delete_contact_button')}
            onPress={() => {
              onDeleteContact(innerIndex);
            }}
          />
        </View>
      </View>
    );
  }, [onDeleteContact, onContactUpdate, styles, t]);

  return (
    <Screen
      style={styles.screen}
      header={
        <ScreenHeader
          style={styles.header}
          leftPart={renderLeftPart()}
        />
      }>
      {isLoading && <Preloader style={styles.preloader} />}
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <InfoSection
            labelStyle={styles.nameLabel}
            textInputStyle={styles.nameTextInput}
            label={t('ShippingPointView_first_label')}
            value={name}
            onUpdate={onUpdateName}
          />
        </View>

        <Accordion
          style={styles.block}
          label={t('ShippingPointView_address_title')}
          isExpanded={expandedAddress}
          onPress={(value) => {
            setExpandedAddress(value);
          }}
          content={renderAddressContent()}
        />

        {!!contacts.length && contacts.map((_, index) => {
          const selectedContact = contactData[index];

          return (
            <Accordion
              style={styles.block}
              key={`contact_${index}`}
              label={t('ShippingPointView_contact_title', { index: index + 1 })}
              isExpanded={expandedContacts[index]}
              onPress={(value) => {
                onExpandContact(index, value);
              }}
              content={renderContactContent(selectedContact, index)}
            />
          );
        })}

        <View style={styles.addPoint}>
          <RoundButton
            leftIcon={<PlusIcon height={12} width={12} color={colors.red} />}
            title={t('ShippingPointView_add_contact_button')}
            onPress={onAddContact}
          />
        </View>

        <Button
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
          title={t('ShippingPointView_save_button')}
          onPress={onSaveShippingPoint}
          disabled={isLoading}
        />
        {isEdit && (
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('ShippingPointView_delete_button')}
              onPress={onDeleteShippingPoint}
            />
            <Button
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('ShippingPointView_cancel_button')}
              onPress={goBack}
            />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};