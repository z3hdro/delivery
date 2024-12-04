import { ViewStyle } from 'react-native';

export type Props = {
  isRequired?: boolean
  label: string;
  value: boolean;
  onPress: () => void;
  style?: ViewStyle;
  isError?: boolean
  errorText?: string
}
