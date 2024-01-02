import { TFunction } from 'i18next';
import { MockUser } from 'mocks/mockUsers';

export type Props = {
  user: MockUser;
  t: TFunction;
  onPress: () => void;
}