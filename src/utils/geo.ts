import { GeoPosition } from 'types/geolocation';
import { GeoResponse } from 'services/network/types';

export const parseGeo = (geo: GeoResponse): GeoPosition => {
  const [lat, lon] = geo.coordinates;

  return { lat, lon };
};
