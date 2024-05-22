import { ORDER_LIST } from 'constants/order';
import { Order } from 'types/order';
import { ViewOrder } from './ViewOrderScreen.types';

export const getPrimaryButtonText = (type: ORDER_LIST): string => {
  switch (type) {
    case ORDER_LIST.WAITING_APPROVAL:
      return 'ViewOrder_approve_button';
    case ORDER_LIST.IN_PROGRESS:
      return 'ViewOrder_close_button';
    case ORDER_LIST.AVAILABLE:
      return 'ViewOrder_save_button';
    default:
      return 'ViewOrder_close_button';
  }
};

export const createInitialState = (order: Order): ViewOrder => {
  const {
    id,
    delivery_date_plan,
    departure_date_plan,
    truck
  } = order;

  return {
    id,
    name: order.driver?.name ?? '',
    surname: order.driver?.surname ?? '',
    patronymic: order.driver?.patronymic ?? '',
    phone: order.driver?.user?.phone ?? '',
    deliveryDatePlan: delivery_date_plan,
    departureDatePlan: departure_date_plan,
    truckVin: truck ? truck.vin : String('')
  };
};
