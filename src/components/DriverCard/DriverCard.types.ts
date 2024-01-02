import { TFunction } from 'i18next';
import { MockDriver } from 'mocks/mockDrivers';

export type Props = {
  driver: MockDriver;
  t: TFunction;
  onPress: () => void;
}