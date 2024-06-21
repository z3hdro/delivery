import { Contact } from 'types/contact';
import { Measure } from 'types/measure';
import { Nomenclature } from 'types/nomenclature';
import { ApprovedDriver, Manager, Person, UnapprovedDriver, User } from 'types/user';
import { Order } from 'types/order';
import { WorkingDriver } from 'types/driver';
import { Address } from 'types/address';
import { Job } from 'types/jobs';
import { GeoPosition } from 'types/geolocation';

export type LoginPayload = {
  phone: string
  password: string
  fcmToken: string
}

export type RegisterPayload = {
  phone: string
  password: string
  fcmToken: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type RegisterResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

export type CheckCodePayload = {
  phone: string
  code: string
}

export type ResetPasswordPayload = {
  phone: string
  code: string
  password: string
}

export type UserInfoResponse = {
  person: Person
}

export type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

export type ApprovedDriverResponse = {
  count: number
  totalPages: number
  users: ApprovedDriver[]
}

export type UnapprovedDriverResponse = {
  count: number
  totalPages: number
  users: UnapprovedDriver[]
}

export type MessageResponse = {
  message: string
  order?: Order
}

export type JobsResponse = {
  jobs: Job[]
}

export type MeasureResponse = {
  count: number
  measures: Measure[]
  totalPages: number
}

export type LogisticPointContact = {
  contact_id: number
  contact: Contact
}

export type GeoResponse = {
  type: string;
  coordinates: number[]
}

export type LogisticPoint = {
  id: number
  name: string
  Address: Address
  contacts: LogisticPointContact[]
  geo: GeoResponse | null
}

export type LogisticPointResponse = {
  count: number
  logisticPoints: LogisticPoint[],
  totalPages: number
}

export type AddLogisticPointPayload = {
  name: string
  addressId: number
  contacts: number[]
  geo: GeoPosition
}

export type ContactPayload = {
  name: string
  surname: string
  patronymic: string
  jobTitle: string
  phone: string
  email: string
  telegram: string
  description: string
}

export type ContactResponse = {
  contact: Contact
}

export type UpdateContactResponse = Contact

export type AddressPayload = {
  name: string
  city: string
  street: string
  house: string
  building: string
  floor: number
  postcode: string
  description: string
}

export type AddressResult = {
  id: number
  name: string
  country_id: number
  city_id: number
  street_id: number
  house: string
  building: string
  floor: string
  postcode: string
}

export type AddressResponse = {
  address: AddressResult
}

export type UpdateAddressResponse = AddressResult

export type NomenclatureResponse = Nomenclature[]

export type AddNomenclaturePayload = {
  id?: number
  name: string
  measureId: number
}

export type AvailableOrderResponse = {
  count: number
  orders: Order[]
  totalPages: number
}

export type CurrentOrderResponse = {
  order: Order
}

export type AllOrderResponse = {
  count: number
  orders: Order[]
  totalPages: number
}

export type WorkingDriversResponse = WorkingDriver[]

export type OrderNomenclaturePayload = {
  id: number
  netWeight: number
}

export type OrderPayload = {
  departureId: number
  destinationId: number
  priceNonCash: number
  priceCash: number
  plannedLoadingDate: string
  plannedDeliveryDate: string
  costType: string
  nomenclatures: Array<OrderNomenclaturePayload>
}

export type UpdateOrderPayload = {
  departure_date_plan: string,
  delivery_date_plan: string,
  vin: string
}

export type TakeOrderPayload = {
  orderId: number
}

export type ConfirmOrderPayload = {
  orderId: number
  plannedLoadingDate: string
  plannedArrivalDate: string
  vinCode: string
}

export type RejectOrderPayload = {
  orderId: number
}

export type DepartOrderPayload = {
  orderId: number
}

export type CompleteOrderPayload = {
  orderId: number
}

export type CancelOrderPayload = {
  orderId: number
}

export type OrderGeoPayload = {
  orderId: number
  latitude: number
  longitude: number
}

export type GetManagerPhoneResponse = {
  phone: string
  manager: Manager
}
