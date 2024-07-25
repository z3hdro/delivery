import { Address } from 'types/address';

export const formatAddress = (address: Address): string => {
  const {
    City,
    Street,
    house,
    building,
    Region,
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

  if (Region?.name) {
    result += `, ${Region.name}`;
  }

  return result;
};
