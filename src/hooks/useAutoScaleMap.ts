import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { useEffect } from 'react';
import { DEFAULT_FLY_TO_ZOOM } from '../constants';
import { findMarkerById, makeVewBoundsByMarkers } from '../app/helpers';
import { useMap } from 'react-leaflet';

export function useAutoScaleMap() {
  const { markers, activeMarkerId } = useSelector(
    (state: RootState) => state.map,
  );

  const map = useMap();

  useEffect(() => {
    if (activeMarkerId.length === 1) {
      const activeId = activeMarkerId[0];
      const marker = findMarkerById(markers, activeId);

      if (marker) {
        map.flyTo([marker.lat, marker.lng], DEFAULT_FLY_TO_ZOOM);
      }
    }
    if (activeMarkerId.length > 1) {
      const bounds = makeVewBoundsByMarkers(markers);
      map.fitBounds(bounds);
    }
  }, [activeMarkerId, map, markers]);
}
