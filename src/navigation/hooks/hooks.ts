import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DriverStackParamList, LoginStackParamList, ManagerStackParamList } from 'types/navigation';

export const useLoginNavigator = () =>
  useNavigation<NativeStackNavigationProp<LoginStackParamList>>();

export const useDriverNavigator = () =>
  useNavigation<NativeStackNavigationProp<DriverStackParamList>>();

export const useManagerNavigator = () =>
  useNavigation<NativeStackNavigationProp<ManagerStackParamList>>();

export const useLoginRoute = <T extends keyof LoginStackParamList>() =>
  useRoute<RouteProp<LoginStackParamList, T>>();

export const useDriverRoute = <T extends keyof DriverStackParamList>() =>
  useRoute<RouteProp<DriverStackParamList, T>>();

export const useManagerRoute = <T extends keyof ManagerStackParamList>() =>
  useRoute<RouteProp<ManagerStackParamList, T>>();




