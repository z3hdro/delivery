import { parseGeo } from 'utils/geo';
import { EMPTY_ADDRESS } from './ShippingPointViewScreen.consts';
import { EMPTY_CONTACT } from 'constants/contact';
import { AddressView, ContactView, ExpandedMap } from './ShippingPointViewScreen.types';
import { LogisticPoint } from 'services/network/types';
import { GeoPosition } from 'types/geolocation';

export const createInitialExpandMap = (point?: LogisticPoint): ExpandedMap => {
  if (!point) {
    return { 0: false } as ExpandedMap;
  }

  return Object.fromEntries(point.contacts.map((_, index) => ([index, false])));
};

export const createInitialAddressData = (point?: LogisticPoint): AddressView => {
  if (!point) {
    return { ...EMPTY_ADDRESS };
  }

  const {
    City: {
      name: city
    },
    Street: {
      name: street
    },
    name,
    house,
    building,
    floor,
    postcode,
    apartment = '',
    description = '',
  } = point.Address;

  return {
    name: name ?? '',
    city,
    street,
    house,
    building,
    floor: floor ?? '',
    apartment: apartment ?? '',
    postcode: postcode ?? '',
    description
  };
};

export const createInitialContactData = (point?: LogisticPoint): ContactView[] => {
  if (!point) {
    return [{ ...EMPTY_CONTACT }];
  }

  return point.contacts.map(({
    contact: {
      name,
      surname,
      patronymic,
      jobTitle,
      phone,
      email = '',
      telegram= '',
      description = ''
    }
  }) => ({
    name,
    surname,
    patronymic,
    jobTitle,
    phone,
    email,
    telegram,
    description
  }));
};

export const createInitialGeoData = (point?: LogisticPoint): GeoPosition => {
  if (!point || !point.geo) {
    return { lat: 0, lon: 0 };
  }

  return parseGeo(point.geo);
};
