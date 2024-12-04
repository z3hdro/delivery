import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type Props = {
  label: string;
  isExpanded: boolean;
  onPress: (value: boolean) => void;
  content: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  isError?: boolean;
  errorText?: string;
}
