import { TFunction } from 'i18next';
import { MockUser } from 'mocks/mockUsers';
import { UnapprovedDriver } from 'types/user';

export type Props = {
  user: UnapprovedDriver;
  t: TFunction;
  onPress: () => void;
}
