import { Address } from './OrderInfo.types';

export const generateLabel = (address: Address): string => {
  let result = '';
  if (address.city) {
    result += `г.${address.city}, `;
  }
  if (address.street) {
    result += `ул.${address.street}, `;
  }
  if (address.building) {
    result += `${address.building}, `;
  }
  if (address.name) {
    result += address.name;
  }

  return result;
};