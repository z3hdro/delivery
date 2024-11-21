import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  checkContactError,
  checkContactValidation,
  checkValidation,
  createInitialAddressData,
  createInitialContactData,
  createInitialExpandMap,
  createInitialGeoData, createInitialPointData, createPoint, creatInitialContactErrorMap
} from './ShippingPointViewScreen.utils';
import { displayErrorMessage } from 'utils/alert';
import { useStyles } from './ShippingPointViewScreen.styles';
import { colors } from 'constants/colors';
import { EMPTY_CONTACT } from 'constants/contact';
import {
  CONTACT_ERROR_KEYS,
  INITIAL_CONTACT_ERROR_MAP,
  INITIAL_ERROR_MAP
} from './ShippingPointViewScreen.consts';
import {
  AddressKeys, AddressView, ContactError, ContactErrorMap,
  ContactKeys, ContactView, ErrorMap,
  ExpandedMap
} from './ShippingPointViewScreen.types';
import { GeoPosition, MapGeoPosition } from 'types/geolocation';

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
  const [marker, setMarker] = useState<MapGeoPosition>(createInitialPointData(point));
  const [isCanCancelContentTouches, setCanCancelContentTouches] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorMap>(INITIAL_ERROR_MAP);
  const [isContactError, setIsErrorContact] = useState<ContactErrorMap>(
    creatInitialContactErrorMap(!!point, contactData.length)
  );
  const [pointError, setPointError] = useState<boolean>(false);

  console.log('contactData: ', contactData);

  const mapRef = useRef<YaMap | null>(null);

  const isValidError = useMemo(() =>
    Object.values(isError).some((error) => error),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [JSON.stringify(isError)]);

  const applyGeoPosition = useCallback((newGeoPosition: MapGeoPosition) => {
    if (mapRef.current) {
      console.log('newGeoPosition: ', newGeoPosition);
      if (newGeoPosition.lat && newGeoPosition.lon) {
        setMarker(newGeoPosition);
        mapRef.current?.fitMarkers?.([newGeoPosition]);
      } else {
        mapRef.current?.fitAllMarkers?.();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current]);

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
        if (isValidError) {
          setIsError(INITIAL_ERROR_MAP);
        }
        setGeoPosition({ lat: String(result.lat), lon: String(result.lon) });
        applyGeoPosition(result);
      }
      console.log('result of Geocoder: ', result);
    } catch (e) {
      console.log('error while Searching geo: ', e);
    }
    // eslint-disable-next-line
  }, [applyGeoPosition, JSON.stringify(addressData)]);

  const renderLeftPart = useCallback(() => {
    return (
      <Pressable onPress={goBack}>
        <View style={styles.headerButton}>
          <BackIcon height={16} width={16} />
        </View>
      </Pressable>

    );
  }, [goBack, styles]);

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
    setIsErrorContact((prevState) => ([...prevState, { ...INITIAL_CONTACT_ERROR_MAP }]));
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
    setIsErrorContact(prevState => prevState.filter((_, index) => selectedIndex !== index));
  }, []);

  const onExpandContact = useCallback((index: number, value: boolean) => {
    setExpandedContacts((prevState) => ({ ...prevState, [index]: value }));
  }, []);

  const resetContactError = useCallback((selectedIndex: number) => {
    setIsErrorContact(
      prevState => prevState.map(
        (contactError, index) =>
          selectedIndex === index ? { ...INITIAL_CONTACT_ERROR_MAP } : contactError)
    );
  }, []);

  const addLogisticPoint = useCallback(
    async (
      address: AddressView,
      contacts: ContactView[],
      geoData: GeoPosition,
      isContactError: ContactErrorMap
    ) => {
      try {
        setIsLoading(true);

        const errorMap = checkValidation({
          name: name.trim(),
          address,
          geoData,
          contacts
        });

        if (Object.values(errorMap).some((error) => error)) {
          setIsError(errorMap);
          if (errorMap.geo) {
            setExpandedAddress(true);
          }
          return;
        }

        console.log('contacts: ', contacts);

        const contactErrorMap = [...isContactError];
        const errorContactSet = new Set<string>();

        contacts.forEach((contact, index) => {
          const errorContactMap = checkContactValidation(contact);
          if (Object.values(errorContactMap).some((err) => err)) {
            errorContactSet.add(String(index));
            contactErrorMap[index] = errorContactMap;
          }
        });

        if (errorContactSet.size > 0) {
          setIsErrorContact(contactErrorMap);
          setExpandedContacts(prevState => {
            const newState = { ...prevState };
            Object.keys(prevState).forEach((key) => {
              if (errorContactSet.has(key)) {
                newState[key] = true;
              }
            });
            return newState;
          });
          return;
        }

        const addressPayload = {
          region: address.region,
          city: address.city,
          street: address.street,
          house: address.house,
          building: address.building,
          floor: +address.floor,
          description: address.description,
        };

        const { address: { id: addressId } } = await networkService.addAddress(addressPayload);
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
        displayErrorMessage(e?.message as string ?? '');
      } finally {
        setIsLoading(false);
      }
    }, [goBack, name, onUpdate]);

  const updateLogisticPoint = useCallback(
    async (
      address: AddressView,
      contacts: ContactView[],
      geoData: GeoPosition,
      isContactError: ContactErrorMap
    ) => {
      try {
        setIsLoading(true);

        if (!point) {
          return;
        }

        const errorMap = checkValidation({
          name: name.trim(),
          address,
          geoData,
          contacts
        });

        if (Object.values(errorMap).some((error) => error)) {
          setIsError(errorMap);
          if (errorMap.geo) {
            setExpandedAddress(true);
          }
          return;
        }

        const contactErrorMap = [...isContactError];
        const errorContactSet = new Set<string>();

        contacts.forEach((contact, index) => {
          const errorContactMap = checkContactValidation(contact);
          if (Object.values(errorContactMap).some((err) => err)) {
            errorContactSet.add(String(index));
            contactErrorMap[index] = errorContactMap;
          }
        });

        if (errorContactSet.size > 0) {
          setIsErrorContact(contactErrorMap);
          setExpandedContacts(prevState => {
            const newState = { ...prevState };
            Object.keys(prevState).forEach((key) => {
              if (errorContactSet.has(key)) {
                newState[key] = true;
              }
            });
            return newState;
          });
          return;
        }

        const addressPayload = {
          region: address.region,
          city: address.city,
          street: address.street,
          house: address.house,
          building: address.building,
          floor: +address.floor,
          description: address.description
        };

        const contactIds = point.contacts.map(({ contact_id }) => contact_id);

        console.log('contactIds: ', contactIds);

        const updatedContacts = [] as ContactView[];
        const newContacts = [] as ContactView[];

        contacts.forEach((contact, index) => {
          if (contactIds[index]) {
            updatedContacts.push(contact);
          } else {
            newContacts.push(contact);
          }
        });

        const { id: addressId } = await networkService.updateAddress(addressPayload, point.Address.id);
        const contactResult = await Promise.all(
          updatedContacts.map((contact, index) => {
            return networkService.updateContact(contact, contactIds[index]);
          })
        );

        let contactResultIds = contactResult.map(({ id }) => id);

        if (newContacts.length) {
          const contactNewResult = await Promise.all(
            newContacts.map((contact) => networkService.addContact(contact))
          );
          contactResultIds = [...contactResultIds, ...contactNewResult.map(({ contact }) => contact.id)];
        }

        console.log('contactResultIds: ', contactResultIds);

        if (addressId && contactResultIds.every((id) => !!id)) {
          await networkService.updateLogisticPoint({
            name,
            addressId,
            contacts: contactResultIds,
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

  const onDeleteShippingPoint = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!point) {
        return;
      }

      await networkService.deleteLogisticPoint(point.id);
      onUpdate();
      goBack();
    } catch (e) {
      console.log('delete shipping point error: ', e);
    } finally {
      setIsLoading(false);
    }
  }, [onUpdate, goBack, point]);

  const onUpdateGeoInput = useCallback((text: string , key: string) => {
    const updatedText = text.replaceAll(',', '.');
    setPointError(false);
    setGeoPosition((prevState) => ({ ...prevState, [key]: updatedText }));
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
          {fields.map(([key, value], index) => (
            <InfoSection
              key={`address_${key}`}
              style={index > 0 ? styles.block : undefined}
              textInputStyle={styles.addressTextInput}
              label={t(`ShippingPointView_address_label_${index + 1}`)}
              value={value}
              onUpdate={(text) => {
                if (isValidError) {
                  setIsError(INITIAL_ERROR_MAP);
                }
                onAddressUpdate(key as AddressKeys, text);
              }}
            />
          ))}
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
          <YaMap
            ref={mapRef}
            style={styles.map}
            onMapLongPress={(event) => {
              const { lat, lon } = event.nativeEvent
              const newPoint = { lon, lat }
              setGeoPosition({ lon: lon.toFixed(6), lat: lat.toFixed(6) })
              applyGeoPosition(newPoint)
            }}
          >
            <Marker point={marker} zIndex={10}>
              <AddressMarkerIcon height={37} width={26} />
            </Marker>
          </YaMap>
        </View>

        <View style={styles.geoPosition}>
          <View style={styles.geoPositionLabelBox}>
            <View style={styles.geoField}>
              <Text style={styles.geoLabel}>
                <Text style={styles.requiredLabel}>*</Text>{' '}
                {t('Geo_lat')}
              </Text>
              <TextInput
                keyboardType={'numeric'}
                style={[styles.geoInput, isError.geo && styles.errorLabel]}
                value={String(geoPosition.lat)}
                onChangeText={(text) => onUpdateGeoInput(text, 'lat')}
              />
            </View>

            <View style={styles.geoField}>
              <Text style={styles.geoLabel}>
                <Text style={styles.requiredLabel}>*</Text>{' '}
                {t('Geo_lon')}
              </Text>
              <TextInput
                keyboardType={'numeric'}
                style={[styles.geoInput, isError.geo && styles.errorLabel]}
                value={String(geoPosition.lon)}
                onChangeText={(text) => onUpdateGeoInput(text, 'lon')}
              />
            </View>
          </View>

          {isError.geo && !pointError && (
            <Text style={styles.errorText}>{t('ShippingPointView_error_geo')}</Text>
          )}

          {pointError && (
            <Text style={styles.errorText}>{t('ShippingPointView_find_by_geo_position_error')}</Text>
          )}

          <RoundButton
            style={styles.geoSearchButton}
            textStyle={styles.geoSearchButtonText}
            title={t('ShippingPointView_find_by_geo_position')}
            onPress={() => {
              const point = createPoint(geoPosition);
              if (point) {
                applyGeoPosition(point);
              } else {
                setPointError(true);
              }
            }}
          />
        </View>
      </>
    );
  }, [
    marker,
    addressData,
    styles,
    t,
    onTouchStart,
    onTouchEnd,
    geoPosition,
    onAddressUpdate,
    getGeoForAddress,
    onUpdateGeoInput,
    isError.geo,
    isValidError,
    applyGeoPosition,
    pointError
  ]);

  const renderContactContent = useCallback((
    contact: ContactView,
    innerIndex: number,
    contactError: ContactError
  ) => {
    const fields = Object.entries(contact);
    const isValidContactError = Object.values(contactError).some((err) => err);

    return (
      <View style={styles.contactBlock}>
        {fields.map(([key, value], index) => {
          const isRequiredField = CONTACT_ERROR_KEYS[key];

          const [isError, errorText] = checkContactError(key, contactError);

          return (
            <InfoSection
              key={`contact_${index}_${key}`}
              style={index > 0 ? styles.block : undefined}
              textInputStyle={styles.addressTextInput}
              isRequired={isRequiredField}
              label={t(`ShippingPointView_contact_label_${index + 1}`)}
              value={value}
              onUpdate={(text) => {
                if (isValidError) {
                  setIsError(INITIAL_ERROR_MAP);
                }
                if (isValidContactError) {
                  resetContactError(innerIndex);
                }
                onContactUpdate(innerIndex, key as ContactKeys, text);
              }}
              isError={isError}
              errorText={t(errorText)}
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
  }, [isValidError, onDeleteContact, onContactUpdate, styles, t, resetContactError]);

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
            onUpdate={(text: string) => {
              if (isValidError) {
                setIsError(INITIAL_ERROR_MAP);
              }
              setName(text);
            }}
            isRequired
            isError={isError.name}
            errorText={t('ShippingPointView_error_empty_name')}
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
          isError={isError.address}
          errorText={t('ShippingPointView_error_empty_address')}
        />

        {!!contactData.length && contactData.map((contact, index) => {
          return (
            <Accordion
              style={styles.block}
              key={`contact_${index}`}
              label={t('ShippingPointView_contact_title', { index: index + 1 })}
              isExpanded={expandedContacts[index]}
              onPress={(value) => {
                onExpandContact(index, value);
              }}
              content={renderContactContent(contact, index, isContactError[index])}
              isError={isError.contact}
              errorText={t('ShippingPointView_error_empty_contact')}
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
          onPress={() => onPress(addressData, contactData, geoPosition, isContactError)}
          disabled={isLoading}
        />
        {isEdit && (
          <View style={styles.buttonsContainer}>
            <Button
              disabled={isLoading}
              style={styles.secondaryButton}
              textStyle={styles.primaryButtonText}
              title={t('ShippingPointView_delete_button')}
              onPress={onDeleteShippingPoint}
            />
            <Button
              disabled={isLoading}
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
