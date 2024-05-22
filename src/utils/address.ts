import { Address } from 'types/address';

export const formatAddress = (address: Address): string => {
  const {
    City,
    Street,
    house,
    building,
    name,
  } = address;

  let result = City.name ?? '';

  if (Street?.name) {
    result += `, ${Street.name}`;
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
