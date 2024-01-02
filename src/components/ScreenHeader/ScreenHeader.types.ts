import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type Props = {
  title?: string
  leftPart?: ReactNode,
  rightPart?: ReactNode,
  style?: ViewStyle,
}