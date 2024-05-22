import { OrderNomenclature } from 'types/order';

export const getNomenclatureLabel = (nomenclatures: OrderNomenclature[]): string => {
  const length = nomenclatures.length;
  const nomenclature = nomenclatures[0];
  if (length > 1) {
    return nomenclatures.reduce((acc, val, index) => {
      if (index < length - 1) {
        return acc + `${nomenclature.Measure.name} ${val.name}, `;
      } else {
        return acc + `${nomenclature.Measure.name} ${val.name}`;
      }
    }, '');
  } else {
    return `${nomenclature.Measure.name} ${nomenclature.name}`;
  }
};
