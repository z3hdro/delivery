import { ViewStyle } from 'react-native';

export type Props = {
  style?: ViewStyle;
  label: string;
  value: string;
  onChangeText?: (text: string) => void;
}