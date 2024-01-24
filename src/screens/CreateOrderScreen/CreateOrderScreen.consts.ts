export const EMPTY_CARGO_DATA = {
  name: null,
  grossWeight: '',
  netWeight: '',
};

export const INITIAL_CARGO_DATA = [
  { ...EMPTY_CARGO_DATA }
];

export enum PRICE_OPTION {
  FULL = 'full',
  PARTIAL = 'partial'
}

export const INITIAL_ORDER_DATA = {
  departureId: 0,
  destinationId: 0,
  plannedLoadingDate: '',
  plannedDeliveryDate: '',
  priceOption: PRICE_OPTION.FULL,
  cashPrice: '',
  cashlessPrice: ''
};

export enum ORDER_DATA_KEYS {
  DEPARTURE_ID = 'departureId',
  DESTINATION_ID = 'destinationId',
  PLANNED_LOADING_DATE = 'plannedLoadingDate',
  PLANNED_DELIVERY_DATE = 'plannedDeliveryDate',
  PRICE_OPTION = 'priceOption',
  CASH_PRICE = 'cashPrice',
  CASHLESS_PRICE = 'cashlessPrice',
}