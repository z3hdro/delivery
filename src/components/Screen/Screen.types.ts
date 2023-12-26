import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type Props = {
  children: ReactNode
  header?: ReactNode
  bottomContent?: ReactNode
  style?: ViewStyle
}