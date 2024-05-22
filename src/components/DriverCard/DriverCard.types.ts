import { TFunction } from 'i18next';
import { MockDriver } from 'mocks/mockDrivers';
import { ApprovedDriver, UnapprovedDriver } from 'types/user';

export type Props = {
  driver: ApprovedDriver;
  t: TFunction;
  onPress: () => void;
}
