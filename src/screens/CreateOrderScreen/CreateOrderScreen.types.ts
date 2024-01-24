export type Cargo = {
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