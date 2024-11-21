import { ViewStyle } from 'react-native';
import { USER } from 'constants/user';

export type Props = {
  imageSrc: string;
  onPress: () => void;
  type: USER
  style?: ViewStyle;
}
