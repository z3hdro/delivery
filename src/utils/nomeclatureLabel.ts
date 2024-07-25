import { OrderNomenclature } from 'types/order';

export const getNomenclatureLabel = (nomenclatures: OrderNomenclature[]): string => {
  const length = nomenclatures.length;
  const nomenclature = length ? nomenclatures[0] : undefined;

  if (!nomenclature) {
    return '';
  }

  if (length > 1) {
    return nomenclatures.reduce((acc, val, index) => {
      if (index < length - 1) {
        return acc + `${val.name}, `;
      } else {
        return acc + `${val.name}`;
      }
    }, '');
  } else {
    return `${nomenclature?.name}`;
  }
};
