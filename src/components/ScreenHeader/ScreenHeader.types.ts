import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type Props = {
  title?: string
  leftPart?: ReactNode,
  rightPart?: ReactNode,
  style?: ViewStyle,
  titleStyle?: ViewStyle,
  titleTextStyle?: TextStyle,
}