import { TextStyle, ViewStyle } from 'react-native';

export type Props = {
  label: string;
  value: string;
  onUpdate?: (text: string) => void;
  editable?: boolean;
  textInputStyle?: ViewStyle;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}