export enum ORDER_STATUS {
  WAITING_APPROVAL,
  APPROVED,
  IN_PROGRESS
}

export enum ORDER_LIST {
  WAITING_APPROVAL,
  IN_PROGRESS,
  AVAILABLE
}

export enum CARGO_KEYS {
  NAME = 'name',
  GROSS_WEIGHT = 'grossWeight',
  NET_WEIGHT = 'netWeight',
}

export enum KEYS {
  DEPARTURE = 'departure',
  DELIVERY = 'delivery',
  CARGO = 'cargo',
  DEPARTURE_DATE_PLAN = 'departureDatePlan',
  DELIVERY_DATE_PLAN = 'deliveryDatePlan',
}