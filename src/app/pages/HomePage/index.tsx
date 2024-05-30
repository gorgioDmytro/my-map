import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'types';
import { getMarkersDataRequest } from 'store/mapSlice/mapSlice';

export function HomePage() {
  const dispatch = useDispatch();

  const markersData = useSelector((state: RootState) => state.map.markers);

  const isMarkersData = !!markersData.length;

  useEffect(() => {
    if (!isMarkersData) dispatch(getMarkersDataRequest());
  }, [dispatch, isMarkersData]);

  return (
    <div>
      <span>My HomePage</span>
    </div>
  );
}
