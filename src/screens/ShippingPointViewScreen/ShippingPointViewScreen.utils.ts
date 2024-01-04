import { MockShippingPoint } from 'mocks/mockShippingPoints';
import { EMPTY_ADDRESS, EMPTY_CONTACT } from './ShippingPointViewScreen.consts';
import { Address, Contact, ExpandedMap } from './ShippingPointViewScreen.types';

export const createInitialExpandMap = (point?: MockShippingPoint): ExpandedMap => {
  if (!point) {
    return { 0: false } as ExpandedMap;
  }

  return Object.fromEntries(point.contacts.map((_, index) => ([index, false])));
};

export const createInitialAddressData = (point?: MockShippingPoint): Address => {
  if (!point) {
    return { ...EMPTY_ADDRESS };
  }

  const {
    country,
    city,
    street,
    house,
    building,
    floor,
    postcode,
    apartment,
    description,
  } = point.address;

  return {
    country,
    city,
    street,
    house,
    building,
    floor,
    postcode,
    apartment,
    description
  };
};

export const createInitialContactData = (point?: MockShippingPoint): Contact[] => {
  if (!point) {
    return [{ ...EMPTY_CONTACT }];
  }

  return point.contacts.map(({
    name,
    surname,
    patronymic,
    jobTitle,
    phone,
    email,
    telegram,
    description
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