import { ViewStyle } from 'react-native';

export type Props = {
  value: string | null;
  onChangeValue: (text: string | null) => void;
  style?: ViewStyle;
}