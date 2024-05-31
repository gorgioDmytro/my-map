import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L, { Map as LeafletMap } from 'leaflet';

import ItemMarkerList from './ItemMarkerList';
import { useAutoScaleMap } from '../../../hooks/useAutoScaleMap';
import {
  getMarkersDataRequest,
  setActiveMarkersId,
} from 'store/mapSlice/mapSlice';
import { activeIcon, defaultIcon } from '../../components/MarkerIcons';

import { RootState } from 'types';
import { makeVewBoundsByMarkers } from '../../helpers';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../constants';
import Stack from '@mui/material/Stack';

import {
  MainWrapper,
  MapWrapper,
  Header,
  RightSiteContainer,
} from './index.styles';
import Button from '@mui/material/Button';

const InitMapInstance = ({ callback }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      callback(map);
    }
  }, [map, callback]);

  useAutoScaleMap();

  return null;
};

export function HomePage() {
  const [mapInstance, setMapInstance] = useState<LeafletMap | null>(null);

  const { markers, activeMarkerId, markersLoading } = useSelector(
    (state: RootState) => state.map,
  );

  const isMarkersData = !!markers.length;
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

  useEffect(() => {
    if (mapInstance && isMarkersData) {
      const bounds = makeVewBoundsByMarkers(markers);
      mapInstance.fitBounds(bounds);
    }
  }, [mapInstance, isMarkersData, markers]);

  useEffect(() => {
    if (mapInstance && isMarkersData) {
      markers.forEach(({ id, lat, lng }) => {
        const markerInstance = L.marker([lat, lng], {
          icon: id === activeMarkerId ? activeIcon : defaultIcon,
        }).addTo(mapInstance);

        markerInstance.on('click', () => {
          dispatch(setActiveMarkersId(id));
        });
      });
    }
  }, [
    dispatch,
    activeMarkerId,
    isMarkersData,
    mapInstance,
    activeIcon,
    defaultIcon,
    markers,
  ]);

  return (
    <MainWrapper>
      <MapWrapper>
        <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
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
              <Stack direction="row" spacing={2}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={centerMapHandler}
                  disabled={markersLoading}
                >
                  Center
                </Button>
              </Stack>
            </Header>
            <ItemMarkerList />
          </>
        )}
      </RightSiteContainer>
    </MainWrapper>
  );
}
