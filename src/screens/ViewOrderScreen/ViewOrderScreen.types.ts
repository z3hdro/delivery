import { LOGISTIC_POINT } from 'constants/map';

export type ViewOrder = {
  id: number
  name: string
  surname: string
  patronymic: string
  phone: string
  deliveryDatePlan: string
  departureDatePlan: string
  truckVin: string
}

export type MapPointInfo = {
  nomenclatureName: string
  type: LOGISTIC_POINT
  address: string
  planDate: string
}

export type ErrorMap = {
  driver: boolean
  phone: boolean
  vin: boolean
}
