import { TextStyle, ViewStyle } from 'react-native';
import { INFO_SECTION_TYPE } from 'constants/infoSection';

export type Props = {
  label: string;
  value: string;
  onUpdate?: (text: string) => void;
  editable?: boolean;
  textInputStyle?: ViewStyle;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  type?: INFO_SECTION_TYPE;
}