import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { useEffect } from 'react';
import { DEFAULT_FLY_TO_ZOOM } from '../constants';
import { findMarkerById, makeVewBoundsByMarkers } from '../app/helpers';
import { Map as LeafletMap } from 'leaflet';

export function useAutoScaleMap(mapInstance: LeafletMap | null) {
  const { markers, activeMarkerId } = useSelector(
    (state: RootState) => state.map,
  );

  const isMarkersData = !!markers.length;

  useEffect(() => {
    if (mapInstance) {
      if (activeMarkerId) {
        const marker = findMarkerById(markers, activeMarkerId);
        if (marker) {
          mapInstance.flyTo([marker.lat, marker.lng], DEFAULT_FLY_TO_ZOOM);
        }
      } else if (isMarkersData) {
        mapInstance.fitBounds(makeVewBoundsByMarkers(markers));
      }
    }
  }, [activeMarkerId, mapInstance, markers, isMarkersData]);
}
