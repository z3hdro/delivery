export enum ORDER_STATUS {
  CREATED = 'created',
  CONFIRMATION = 'confirmation',
  LOADING = 'loading',
  DEPARTED = 'departed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export type ORDER_STATUS_VALUES =`${ORDER_STATUS}`

export enum ORDER_LIST {
  WAITING_APPROVAL,
  IN_PROGRESS,
  AVAILABLE,
  COMPLETED
}

export enum CARGO_KEYS {
  NAME = 'name',
  NET_WEIGHT = 'netWeight',
}

export enum ORDER_TAB_STATUS {
  ALL = 'all',
  CONFIRMATION = 'confirmation',
  AVAILABLE = 'available',
  IN_WORK = 'inwork',
  COMPLETED = 'completed'
}

export enum COST_TYPE {
  TON =  'ton',
  ROUTE = 'route'
}
