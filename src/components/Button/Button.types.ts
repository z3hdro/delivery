import { TextStyle, ViewStyle } from 'react-native';

export type Props = {
  onPress: () => void
  title: string
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  hasShadows?: boolean
}