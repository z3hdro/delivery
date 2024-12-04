import { Address } from './address';
import { ORDER_STATUS } from 'constants/order';
import { ApprovedDriver } from 'types/user';
import { GeoResponse } from 'services/network/types';
import { Measure } from 'types/measure';

export type OrderLogisticPointContact = {
  logistics_point_id: number
  contact_id: number
}

export type OrderContact = {
  id: number
  name: string,
  surname: string
  description: string
  patronymic: string
  jobTitle: string
  phone: string
  email: string
  telegram: string
  createdAt: string
  updatedAt: string
  LogisticsPointContacts: OrderLogisticPointContact
}

export type OrderLocation = {
  id: number
  name: string | null
  address_id: number
  geo: GeoResponse
  Address: Address
  contacts: OrderContact[]
}

export type expandedOrderNomenclature = {
  order_id: number
  nomenclature_id: number
  gross_weight: number
  net_weight: number
}

export type OrderNomenclatureKey = keyof Pick<expandedOrderNomenclature, 'gross_weight' | 'net_weight'>

export type OrderNomenclature = {
  id: number
  name: string
  measure_id: number
  OrderNomenclature: expandedOrderNomenclature
  Measure: Measure
}

export type OrderTruck = {
  id: number
  vin: string
}

// TODO: add type for manager
export type Order = {
  id: number
  departure_id: number
  destination_id: number
  driver_id: number
  status: ORDER_STATUS
  manager_id: number
  cost_type: string
  price_cash: number
  price_non_cash: number
  delivery_date_plan: string
  delivery_date_fact: string
  departure_date_plan: string
  departure_date_fact: string
  truck: OrderTruck | null
  createdAt: string
  updatedAt: string
  geo?: GeoResponse | null
  departure: OrderLocation,
  destination: OrderLocation,
  nomenclatures: OrderNomenclature[]
  driver: ApprovedDriver | null
  manager: any
}

export type ORDER_STATUS_VALUES = `${ORDER_STATUS}`


