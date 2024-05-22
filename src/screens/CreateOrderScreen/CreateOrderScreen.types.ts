import { LogisticPoint } from 'services/network/types';

export type Cargo = {
  id: number;
  name: string | null;
  netWeight: string;
  grossWeight: string;
}

export type OrderData = {
  departureId: number
  destinationId: number
  plannedLoadingDate: string
  plannedDeliveryDate: string
  priceOption: string
  cashPrice: string
  cashlessPrice: string
}

export type LogisticPointView = Pick<LogisticPoint, 'id' | 'name'>
