import { ReadyState } from 'react-native-use-websocket';

export const WEBSOCKET_URL = {
  DRIVER: 'ws://185.247.17.177:8000/api/drivers/updates',
  ORDER: 'ws://185.247.17.177:8000/api/orders/updates',
  ORDER_LOCATION: 'ws://185.247.17.177:8000/api/orders/location/',
};

export const CONNECTION_STATUS = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};
