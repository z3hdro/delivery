import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import YaMap, { Geocoder, Marker } from 'react-native-yamap';

import { ScreenHeader } from 'components/ScreenHeader';
import { Preloader } from 'components/Preloader';
import { Screen } from 'components/Screen';
import { InfoSection } from 'components/InfoSection';
import { Button } from 'components/Button';
import { RoundButton } from 'components/RoundButton';
import { Accordion } from 'components/Accordion';
import { networkService } from 'services/network';
import { useManagerNavigator, useManagerRoute } from 'navigation/hooks';
import {
  createInitialAddressData,
  createInitialContactData,
  createInitialExpandMap,
  createInitialGeoData
} from './ShippingPointViewScreen.utils';
import { useStyles } from './ShippingPointViewScreen.styles';
import { colors } from 'constants/colors';
import { EMPTY_CONTACT } from 'constants/contact';
import {
  AddressKeys, AddressView,
  ContactKeys, ContactView,
  ExpandedMap
} from './ShippingPointViewScreen.types';
import { GeoPosition } from 'types/geolocation';

import { AddressMarkerIcon, BackIcon, PlusIcon, XIcon } from 'src/assets/icons';

export const ShippingPointViewScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { goBack } = useManagerNavigator();
  const { params: { point, onUpdate } } = useManagerRoute<'ShippingPointViewScreen'>();

  console.log('point: ', JSON.stringify(point));

  const isEdit = useMemo(() => !!point, [point]);

  const [name, setName] = useState<string>(point?.name ?? '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedAddress, setExpandedAddress] = useState<boolean>(false);
  const [expandedContacts, setExpandedContacts] = useState<ExpandedMap>(
    createInitialExpandMap(point)
  );
  const [addressData, setAddressData] = useState<AddressView>(
    createInitialAddressData(point)
  );
  const [contactData, setContactData] = useState<ContactView[]>(
    createInitialContactData(point)
  );
  const [geoPosition, setGeoPosition] = useState<GeoPosition>(createInitialGeoData(point));
  const [isCanCancelContentTouches, setCanCancelContentTouches] = useState<boolean>(true);

  const mapRef = useRef<YaMap | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      console.log('geoPosition: ', geoPosition);
      if (geoPosition.lat && geoPosition.lon) {
        mapRef.current?.fitMarkers?.([geoPosition]);
      } else {
        mapRef.current?.fitAllMarkers?.();
      }
    }
    // eslint-disable-next-line
  }, [JSON.stringify(geoPosition)]);

  const getGeoForAddress = useCallback(async (address: AddressView) => {
    try {
      let searchAddress = '';

      if (addressData.region) {
        searchAddress += `${addressData.region}`;
      }

      if (addressData.city) {
        searchAddress += `${searchAddress.length ? ', ' : ''}` + address.city;
      }

      if (address.street) {
        searchAddress += `${searchAddress.length ? ', ' : ''}` + address.street;
      }

      if (address.house) {
        searchAddress += `${searchAddress.length ? ', ' : ''}` + address.house;
      }

      if (address.building) {
        searchAddress += `${searchAddress.length ? ', ' : ''}` + address.building;
      }

      console.log('searchAddress: ', searchAddress);

      const result = await Geocoder.addressToGeo(searchAddress);

      if (result) {
        setGeoPosition(result);
      }
      console.log('result of Geocoder: ', result);
    } catch (e) {
      console.log('error while Searching geo: ', e);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(addressData)]);

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
    setContactData(
      (prevState) => prevState.filter((_, index) => selectedIndex !== index)
    );
  }, []);

  const onExpandContact = useCallback((index: number, value: boolean) => {
    setExpandedContacts((prevState) => ({ ...prevState, [index]: value }));
  }, []);

  const addLogisticPoint = useCallback(async (address: AddressView, contacts: ContactView[], geoData: GeoPosition) => {
    try {
      setIsLoading(true);

      const addressPayload = {
        region: address.region,
        city: address.city,
        street: address.street,
        house: address.house,
        building: address.building,
        floor: +address.floor,
        postcode: address.postcode,
        description: address.description,
      };

      const { address: { id: addressId } } = await networkService.addAddress(addressPayload);
      console.log('contacts: ', contacts);
      const contactResult = await Promise.all(contacts.map((contact) => networkService.addContact(contact)));

      if (addressId && contactResult.every(({ contact }) => !!contact.id)) {
        await networkService.addLogisticPoint({
          name,
          addressId,
          contacts: contactResult.map(({ contact }) => contact.id),
          geo: geoData
        });
      }

      onUpdate();
      goBack();
    } catch (e) {
      console.log('adding shipping point error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [goBack, name, onUpdate]);

  const updateLogisticPoint = useCallback(
    async (address: AddressView, contacts: ContactView[], geoData: GeoPosition) => {
      try {
        setIsLoading(true);

        console.log('contacts: ', contacts);

        if (!point) {
          return;
        }

        const addressPayload = {
          region: address.region,
          city: address.city,
          street: address.street,
          house: address.house,
          building: address.building,
          floor: +address.floor,
          postcode: address.postcode,
          description: address.description
        };

        const contactIds = point.contacts.map(({ contact_id }) => contact_id);

        console.log('contactIds: ', contactIds);

        const { id: addressId } = await networkService.updateAddress(addressPayload, point.Address.id);
        const contactResult = await Promise.all(
          contacts.map((contact, index) => {
            console.log('contact: ', contact);
            console.log('contactIds[index]: ', contactIds[index]);
            return networkService.updateContact(contact, contactIds[index]);
          })
        );

        console.log('contactResult: ', contactResult);

        if (addressId && contactResult.every(({ id }) => !!id)) {
          await networkService.updateLogisticPoint({
            name,
            addressId,
            contacts: contactResult.map(({ id }) => id),
            geo: geoData
          }, point.id);
        }

        onUpdate();
        goBack();
      } catch (e) {
        console.log('updating shipping point error: ', e);
      } finally {
        setIsLoading(false);
      }
    }, [goBack, name, onUpdate, point]);

  const onDeleteShippingPoint = useCallback(() => {
    console.log('delete position');
  }, []);

  const onUpdateGeoInput = useCallback((text: string , key: string) => {
    const updatedText = text.replace(/,/g, '');
    setGeoPosition((prevState) => ({ ...prevState, [key]: +updatedText }));
  }, []);

  const onTouchStart = useCallback(() => {
    setCanCancelContentTouches(false);
  }, []);

  const onTouchEnd = useCallback(() => {
    setCanCancelContentTouches(true);
  }, []);

  const onPress = isEdit ? updateLogisticPoint : addLogisticPoint;

  const renderAddressContent = useCallback(() => {
    const fields = Object.entries(addressData);

    return (
      <>
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

        <RoundButton
          style={styles.geoSearchButton}
          textStyle={styles.geoSearchButtonText}
          title={t('ShippingPointView_find_geo')}
          onPress={() => getGeoForAddress(addressData)}
        />

        <View
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={styles.mapContainer}>

          <View style={styles.geoPosition}>
            <View style={styles.geoField}>
              <Text style={styles.geoLabel}>
                {t('Geo_lat')}
              </Text>
              <TextInput
                keyboardType={'numeric'}
                style={styles.geoInput}
                value={String(geoPosition.lat)}
                onChangeText={(text) => onUpdateGeoInput(text, 'lat')}
              />
            </View>

            <View style={styles.geoField}>
              <Text style={styles.geoLabel}>
                {t('Geo_lon')}
              </Text>
              <TextInput
                keyboardType={'numeric'}
                style={styles.geoInput}
                value={String(geoPosition.lon)}
                onChangeText={(text) => onUpdateGeoInput(text, 'lon')}
              />
            </View>
          </View>

          <YaMap
            ref={mapRef}
            style={styles.map}
            onMapLoaded={() => {
              if (mapRef.current) {
                mapRef.current?.fitAllMarkers?.();
              }
            }}
          >
            <Marker point={geoPosition} zIndex={10}>
              <AddressMarkerIcon height={37} width={26} />
            </Marker>
          </YaMap>
        </View>
      </>
    );
  }, [
    addressData,
    styles,
    t,
    onTouchStart,
    onTouchEnd,
    geoPosition,
    onAddressUpdate,
    getGeoForAddress,
    onUpdateGeoInput
  ]);

  const renderContactContent = useCallback((contact: ContactView, innerIndex: number) => {
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        canCancelContentTouches={isCanCancelContentTouches}
        scrollEnabled={isCanCancelContentTouches}
      >
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

        {!!contactData.length && contactData.map((contact, index) => {
          // const selectedContact = contactData[index];

          return (
            <Accordion
              style={styles.block}
              key={`contact_${index}`}
              label={t('ShippingPointView_contact_title', { index: index + 1 })}
              isExpanded={expandedContacts[index]}
              onPress={(value) => {
                onExpandContact(index, value);
              }}
              content={renderContactContent(contact, index)}
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
          onPress={() => onPress(addressData, contactData, geoPosition)}
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
