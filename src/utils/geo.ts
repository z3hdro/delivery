import { MapGeoPosition } from 'types/geolocation';
import { GeoResponse, OrderGeoPayload } from 'services/network/types';
import { LocationObject } from 'expo-location';
import { ORDER_STATUS } from 'constants/order';
import { networkService } from 'services/network';
import isEqual from 'lodash/isEqual';
import { updateCurrentOrderGeo } from 'store/slices';
import { store } from 'store/store';

export const parseGeo = (geo: GeoResponse): MapGeoPosition => {
  const [lat, lon] = geo.coordinates;

  return { lat, lon };
};

export const updateOrderGeo = async (location: LocationObject) => {
  const { app, order } = store.getState();
  const { person } = app;
  const { currentOrder } = order;
  console.log('update 0');
  if (
    person
    && person.user.role.name === 'driver'
    && currentOrder
    && currentOrder.status !== ORDER_STATUS.CONFIRMATION
  ) {
    try {
      console.log('update location 1');
      const payload: OrderGeoPayload = {
        orderId: currentOrder.id,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };

      console.log('currentOrder.geo: ', currentOrder.geo);
      const result = await networkService.updateOrderGeo(payload);
      if (result.order && result.order.geo && currentOrder && !isEqual(result.order.geo, currentOrder.geo)) {
        console.log('update current order 123');
        store.dispatch(updateCurrentOrderGeo(result.order.geo));
      }
    } catch (e) {
      console.log('error while updating geo for order: ', e);
    }
  }
};
