import { OrderNomenclature, OrderNomenclatureKey } from 'types/order';
import { WEIGHT } from 'constants/weight';

export const weightConverter = (weight: number, measure: string): number => {
  if (measure === WEIGHT.KG) {
    return weight * 0.001;
  }
  return weight;
};

export const getWeightLabel = (nomenclatures: OrderNomenclature[], key: OrderNomenclatureKey): string => {
  const length = nomenclatures.length;
  if (length > 1) {
    return String(nomenclatures.reduce((acc, val) => {
      const measure = val.Measure.name.toLowerCase();
      return acc + weightConverter(val.OrderNomenclature[key], measure);
    }, 0).toFixed(3));
  }
  const nomenclature = nomenclatures[0];
  return String(
    weightConverter(nomenclature.OrderNomenclature[key], nomenclature.Measure.name.toLowerCase())
  );
};
