import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';

import ItemMarkerList from './ItemMarkerList';
import { useAutoScaleMap } from '../../../hooks/useAutoScaleMap';
import { useMarkersUpdate } from '../../../hooks/useMarkersUpdate';
import { getMarkersDataRequest } from 'store/mapSlice/mapSlice';
import { useDistance } from '../../../hooks/useDistance';

import { RootState } from 'types';
import { makeVewBoundsByMarkers } from '../../helpers';
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  DEFAULT_ZOOM_CONTROL,
} from '../../../constants';

import {
  MainWrapper,
  MapWrapper,
  Header,
  RightSiteContainer,
  DistanceLabel,
} from './index.styles';
import Button from '@mui/material/Button';

const InitMapInstance = ({ callback }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      callback(map);
    }
  }, [map, callback]);

  return null;
};

export function HomePage() {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);

  const { markers, distance, markersLoading } = useSelector(
    (state: RootState) => state.map,
  );

  const isMarkersData = !!markers.length;
  const showDistance = !!distance;
  const dispatch = useDispatch();

  const centerMapHandler = () => {
    if (mapInstance && isMarkersData) {
      const bounds = makeVewBoundsByMarkers(markers);
      mapInstance.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (!isMarkersData) dispatch(getMarkersDataRequest());
  }, [dispatch, isMarkersData]);

  useMarkersUpdate(mapInstance);
  useAutoScaleMap(mapInstance);
  useDistance(mapInstance);

  return (
    <MainWrapper>
      <MapWrapper>
        <MapContainer
          zoomControl={DEFAULT_ZOOM_CONTROL}
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
        >
          <InitMapInstance callback={setMapInstance} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </MapWrapper>
      <RightSiteContainer>
        {mapInstance && (
          <>
            <Header>
              <Button
                size="small"
                variant="contained"
                onClick={centerMapHandler}
                disabled={markersLoading}
              >
                Center
              </Button>
              {showDistance && (
                <DistanceLabel>{`Distance: ${distance} Km`}</DistanceLabel>
              )}
            </Header>
            <ItemMarkerList />
          </>
        )}
      </RightSiteContainer>
    </MainWrapper>
  );
}
