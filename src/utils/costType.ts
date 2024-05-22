import { COST_TYPE } from 'constants/order';
import { t } from 'i18next';

export const getCostType = (costType: string): string => {
  switch (costType) {
    case COST_TYPE.TON:
      return t('Cost_type_ton');
    case COST_TYPE.ROUTE:
      return t('Cost_type_route');
    default:
      return '';
  }
};
