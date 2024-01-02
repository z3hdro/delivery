import { NavigatorScreenParams } from '@react-navigation/native';
import { MockOrder } from 'mocks/mockOrders';
import { ORDER_LIST } from 'constants/order';
import { MockNomenclature } from 'mocks/mockNomenclature';

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
}

export type DriverStackParamList = {
  ApprovalScreen: undefined;
  OrderListScreen: undefined;
  OrderScreen: {
    order: MockOrder
  };
  DriverMap: undefined;
}

export type MainBottomTabNavigatorParamList = {
  CargoListScreen: undefined;
  AddOrderScreen: undefined;
  DriverListScreen: undefined;
  ShippingPointScreen: undefined;
  NomenclatureScreen: undefined;
}

export type ManagerStackParamList = {
  MainBottomTabNavigator: NavigatorScreenParams<MainBottomTabNavigatorParamList>;
  ViewOrderScreen: {
    order: MockOrder
    type: ORDER_LIST
  };
  NomenclatureViewScreen: {
    nomenclature: MockNomenclature | undefined
  }
}