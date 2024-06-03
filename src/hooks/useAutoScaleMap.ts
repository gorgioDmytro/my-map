import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { useCallback, useEffect } from 'react';
import { DEFAULT_FIT_BOUNDS_ZOOM, DEFAULT_FLY_TO_ZOOM } from '../constants';
import { findMarkersById, makeVewBoundsByMarkers } from '../app/helpers';
import { Map as LeafletMap } from 'leaflet';

export function useAutoScaleMap(mapInstance: LeafletMap | null) {
  const { markers, activeMarkersId } = useSelector(
    (state: RootState) => state.map,
  );

  const isMarkers = !!markers.length;
  const isActiveMarkers = !!activeMarkersId.length;
  const isSingleActiveMarker = activeMarkersId.length === 1;

  const scaleByActiveMarkers = useCallback(() => {
    const findMarkers = findMarkersById(markers, activeMarkersId);
    if (isSingleActiveMarker) {
      mapInstance?.flyTo(
        [findMarkers[0].lat, findMarkers[0].lng],
        DEFAULT_FLY_TO_ZOOM,
      );
    } else {
      mapInstance?.fitBounds(makeVewBoundsByMarkers(findMarkers), {
        maxZoom: DEFAULT_FIT_BOUNDS_ZOOM,
      });
    }
  }, [mapInstance, isSingleActiveMarker, activeMarkersId, markers]);

  useEffect(() => {
    if (mapInstance) {
      if (isActiveMarkers) {
        scaleByActiveMarkers();
        return;
      }
      if (isMarkers) {
        mapInstance.fitBounds(makeVewBoundsByMarkers(markers));
      }
    }
  }, [activeMarkersId, mapInstance, markers, isMarkers, scaleByActiveMarkers]);
}
