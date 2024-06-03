import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { useEffect } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import { activeIcon, defaultIcon } from '../app/components/MarkerIcons';
import { setActiveMarkersId } from '../store/mapSlice/mapSlice';
import { checkIsMarkerActive } from '../app/helpers';

export function useMarkersUpdate(mapInstance: LeafletMap | null) {
  const { markers, activeMarkersId } = useSelector(
    (state: RootState) => state.map,
  );

  const dispatch = useDispatch();
  const isMarkersData = !!markers.length;

  useEffect(() => {
    if (mapInstance && isMarkersData) {
      markers.forEach(({ id, lat, lng }) => {
        const markerInstance = L.marker([lat, lng], {
          icon: checkIsMarkerActive(activeMarkersId, id)
            ? activeIcon
            : defaultIcon,
        }).addTo(mapInstance);

        markerInstance.on('click', () => {
          dispatch(setActiveMarkersId(id));
        });
      });
    }
  }, [dispatch, activeMarkersId, isMarkersData, mapInstance, markers]);
}
