import React, { FC, useRef } from 'react';
import YaMap, { Marker } from 'react-native-yamap';

import { useStyles } from './Map.styles';
import { Props } from './Map.types';

import { DeliveryPointIcon, DeparturePointIcon, TrackIcon } from 'assets/icons';
import { LOGISTIC_POINT } from 'constants/map';

export const Map: FC<Props> = ({
  displayMap,
  departure,
  destination,
  track,
  onInfoPress,
  displayTrack = false,
  showUserPosition = true
}) => {
  console.log('track: ', track);
  const styles = useStyles();

  const mapRef = useRef<YaMap | null>(null);

  return (
    <YaMap
      ref={mapRef}
      showUserPosition={showUserPosition}
      style={styles.map}
      onMapLoaded={() => {
        if (displayMap && mapRef.current) {
          mapRef.current?.fitAllMarkers?.();
        }
      }}
    >
      <Marker point={departure.geo} zIndex={10} onPress={() => onInfoPress(LOGISTIC_POINT.DEPARTURE, departure)}>
        <DeparturePointIcon height={24} width={20} />
      </Marker>
      <Marker point={destination.geo} zIndex={10} onPress={() => onInfoPress(LOGISTIC_POINT.DESTINATION, destination)}>
        <DeliveryPointIcon height={24} width={20} />
      </Marker>
      {displayTrack && track && (
        <Marker point={track} zIndex={10}>
          <TrackIcon height={16} width={24} />
        </Marker>
      )}
    </YaMap>
  );
};
