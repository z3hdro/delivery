import { Address } from 'types/address';

export const displayAddress = (address: Address): string => {
  let result = '';
  if (address.City.name) {
    result += address.City.name;
  }
  if (address.Street.name) {
    result += result.length ? `, ${address.Street.name}` : address.Street.name;
  }

  if (address.house) {
    result += result.length ? `, ${address.house}` : address.house;
  }

  return result;
};
