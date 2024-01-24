import { Point } from 'react-native-yamap';
import { LOGISTIC_POINT } from 'constants/map';
import { Address } from 'types/address';

export type Props = {
  displayMap: boolean
  departure: Address & { geo: Point }
  destination: Address & { geo: Point }
  onInfoPress: (type: LOGISTIC_POINT, address: Address) => void,
  track?: Point
  displayTrack?: boolean
}