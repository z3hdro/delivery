import { ViewStyle } from 'react-native';
import { Option } from 'types/picker';

export type Props = {
  value: Option | null;
  onChangeValue: (item: Option) => void;
  style?: ViewStyle;
}
