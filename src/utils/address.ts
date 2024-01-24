import { Address } from 'types/address';

export const formatAddress = (address: Address): string => {
  const {
    city,
    street,
    house,
    building,
    name,
  } = address;

  let result = city;

  if (street) {
    result += `, ${street}`;
  }
  
  if (house) {
    result += `, ${house}`;
  }

  if (building) {
    result += `, ${building}`;
  }

  if (name) {
    result += `, ${name}`;
  }

  return result;
};