import { TextStyle } from 'react-native';

export type Props = {
  onPress: () => void;
  title: string;
  customTextStyle?: TextStyle;
  disabled?: boolean;
}