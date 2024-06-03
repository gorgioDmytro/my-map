import { latLngBounds } from 'leaflet';
import { IMarker } from 'types';
import { EARTH_RADIUS_KM } from '../../constants';

export const makeVewBoundsByMarkers = (markers: IMarker[]) => {
  const { lat, lng } = markers[0];
  const initRectangle = latLngBounds([lat, lng], [lat, lng]);

  return markers.reduce((acc, marker) => {
    return acc.extend([marker.lat, marker.lng]);
  }, initRectangle);
};

export const findMarkersById = (
  markers: IMarker[],
  activeMarkersId: string[],
) => markers.filter(({ id }) => activeMarkersId.includes(id));

export const checkIsMarkerActive = (markersId: string[], id: string) =>
  markersId.includes(id);

const toRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

export const getDistanceByTwoPoints = (
  coords: [[number, number], [number, number]],
): number => {
  const [lat1, lng1] = coords[0];
  const [lat2, lng2] = coords[1];

  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const distance =
    EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return parseFloat(distance.toFixed(0));
};
