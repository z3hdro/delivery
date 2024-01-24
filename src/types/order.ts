import { Address } from './address';
import { Nomenclature } from './nomenclature';
import { Geolocation } from './geolocation';

export type Order = {
  id: number
  departure_id: number
  destination_id: number
  driver_id: number
  status: string
  manager_id: number
  gross_weight: number
  net_weight: number
  delivery_date_plan: string
  delivery_date_fact: string
  departure_date_plan: string
  departure_date_fact: string
  truck_id: number
  departure: Address,
  destination: Address,
  nomenclatures: Nomenclature[]
  geo?: Geolocation
}

export type OrderPayload = {
  departureId: number
  destinationId: number
  grossWeight: 0
  netWeight: 0
  plannedLoadingDate: string
  plannedDeliveryDate: string
  nomenclatureIds: number[]
}