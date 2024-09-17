import { NavigatorScreenParams } from '@react-navigation/native';
import { ORDER_LIST } from 'constants/order';
import { USER } from 'constants/user';
import { Nomenclature } from 'types/nomenclature';
import { Measure } from 'types/measure';
import { Order } from 'types/order';
import { LogisticPoint } from 'services/network/types';
import { ApprovedDriver, UnapprovedDriver } from 'types/user';

export type LoginStackParamList = {
  LoginScreen: undefined;
  RegistrationScreen: undefined;
  ForgotPasswordScreen: undefined;
}

export type DriverStackParamList = {
  ApprovalScreen: undefined;
  OrderListScreen: undefined;
  OrderScreen: {
    onUpdate: () => void
  };
  DriverMap: undefined;
}

export type DriverRoute = keyof DriverStackParamList | undefined

export type MainBottomTabNavigatorParamList = {
  CargoListScreen: {
    orderId?: string
  };
  AddOrderScreen: undefined;
  DriverListScreen: undefined;
  ShippingPointScreen: undefined;
  NomenclatureScreen: undefined;
}

export type ManagerStackParamList = {
  MainBottomTabNavigator: NavigatorScreenParams<MainBottomTabNavigatorParamList>;
  ViewOrderScreen: {
    order: Order
    type: ORDER_LIST
    onUpdate: () => void
  };
  UserViewScreen: {
    type: USER
    onUpdate: () => void
    user?: UnapprovedDriver
    driver?: ApprovedDriver
  };
  NomenclatureViewScreen: {
    nomenclature: Nomenclature | undefined
    onUpdate: () => void
  };
  ShippingPointViewScreen: {
    point: LogisticPoint | undefined
    onUpdate: () => void
  },
  SelectMeasureScreen: {
    onSelect: (item: Measure) => void
  },
  SelectCargoScreen: {
    onSelect: (item: Nomenclature) => void
  },
  SelectLogisticPointScreen: {
    onSelect: (item: LogisticPoint) => void
  },
}
