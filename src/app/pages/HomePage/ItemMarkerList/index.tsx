import React from 'react';
import styled from 'styled-components/macro';
import { Map as LeafletMap } from 'leaflet';
import { NoMarkersBlock } from './NoMarkersBlock';
import { IMarker } from 'types';

interface IDashboard {
  map: LeafletMap;
  markersData: IMarker[];
}

const ItemMarker = styled.div`
  margin: 16px;
  padding: 16px;
  background-color: antiquewhite;
  cursor: pointer;
`;

export default function ItemMarkerList({ markersData, map }: IDashboard) {
  const isMarkersData = markersData.length > 0;

  if (!isMarkersData) return <NoMarkersBlock />;

  const onClickItem = (lat: number, lng: number) => {
    map.flyTo([lat, lng]);
  };

  return (
    <>
      {markersData.map(({ id, title, lat, lng }) => (
        <ItemMarker key={id} onClick={() => onClickItem(lat, lng)}>
          <div>{`Title: ${title}`}</div>
          <div>{`Id: ${id}`}</div>
          <div>{`Lat: ${lat}`}</div>
          <div>{`Lng: ${lng}`}</div>
        </ItemMarker>
      ))}
    </>
  );
}
