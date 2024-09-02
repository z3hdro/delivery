import { LogisticPoint } from 'services/network/types';

export type Cargo = {
  id: number;
  name: string | null;
  netWeight: string;
}

export type ErrorMap = {
  departure: boolean;
  destination: boolean;
  price: boolean;
}

export type CargoError = {
  cargoName: boolean;
  cargoNetWeight: boolean;
}

export type LogisticPointView = Pick<LogisticPoint, 'id' | 'name'>
