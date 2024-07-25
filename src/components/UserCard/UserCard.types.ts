import { TFunction } from 'i18next';
import { UnapprovedDriver } from 'types/user';

export type Props = {
  user: UnapprovedDriver;
  t: TFunction;
  onPress: () => void;
}
