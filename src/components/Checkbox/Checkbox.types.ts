import { ViewStyle } from 'react-native';

export type Props = {
  label: string;
  value: boolean;
  onPress: () => void;
  style?: ViewStyle;
}