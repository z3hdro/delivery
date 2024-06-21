import { TFunction } from 'i18next';
import { ApprovedDriver } from 'types/user';

export type Props = {
  driver: ApprovedDriver;
  t: TFunction;
  onPress: () => void;
}
