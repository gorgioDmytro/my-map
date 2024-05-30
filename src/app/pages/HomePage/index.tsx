import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { Map as LeafletMap } from 'leaflet';

import { getMarkersDataRequest } from 'store/mapSlice/mapSlice';

import { RootState } from 'types';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '../../../constants';

import { MainWrapper, MapWrapper } from './index.styles';
import ItemMarkerList from './ItemMarkerList';

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

  const dispatch = useDispatch();

  const markersData = useSelector((state: RootState) => state.map.markers);

  const isMarkersData = !!markersData.length;

  useEffect(() => {
    if (!isMarkersData) dispatch(getMarkersDataRequest());
  }, [dispatch, isMarkersData]);

  return (
    <MainWrapper>
      <MapWrapper>
        <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM}>
          <InitMapInstance callback={setMapInstance} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markersData.map(({ id, lat, lng }) => (
            <Marker key={id} position={[lat, lng]} />
          ))}
        </MapContainer>
      </MapWrapper>
      <div>
        {mapInstance && (
          <ItemMarkerList markersData={markersData} map={mapInstance} />
        )}
      </div>
    </MainWrapper>
  );
}
