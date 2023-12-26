import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type Props = {
  title: string
  onPress: () => void;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}