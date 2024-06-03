import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import L, { Map as LeafletMap } from 'leaflet';

import { clearDistance, setDistance } from '../store/mapSlice/mapSlice';

import { findMarkersById, getDistanceByTwoPoints } from '../app/helpers';
import { DEFAULT_POLYLINE_COLOR } from '../constants';
import { RootState } from '../types';

export function useDistance(map: LeafletMap | null) {
  const [line, setLine] = useState<L.Polyline | null>(null);

  const { markers, activeMarkersId } = useSelector(
    (state: RootState) => state.map,
  );

  const dispatch = useDispatch();

  const canDistanceCalc = activeMarkersId.length === 2;

  useEffect(() => {
    if (canDistanceCalc && map) {
      const [{ lat: latA, lng: lngA }, { lat: latB, lng: lngB }] =
        findMarkersById(markers, activeMarkersId);

      const distance = getDistanceByTwoPoints([
        [latA, lngA],
        [latB, lngB],
      ]);

      const line = L.polyline(
        [
          [latA, lngA],
          [latB, lngB],
        ],
        { color: DEFAULT_POLYLINE_COLOR },
      ).addTo(map);
      setLine(line);
      dispatch(setDistance(distance));
    }

    if (activeMarkersId.length < 2) {
      line?.remove();
      dispatch(clearDistance());
    }
  }, [canDistanceCalc]);
}
