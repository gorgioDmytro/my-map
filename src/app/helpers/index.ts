import { latLngBounds } from 'leaflet';
import { IMarker } from 'types';

export const makeVewBoundsByMarkers = (markers: IMarker[]) => {
  const { lat, lng } = markers[0];
  const initRectangle = latLngBounds([lat, lng], [lat, lng]);

  return markers.reduce((acc, marker) => {
    return acc.extend([marker.lat, marker.lng]);
  }, initRectangle);
};

export const findMarkerById = (markers: IMarker[], id: string) => {
  return markers.find(item => item.id === id);
};
