import React from 'react';
import styled from 'styled-components';
import { setActiveMarkersId } from 'store/mapSlice/mapSlice';
import { useDispatch, useSelector } from 'react-redux';

import { NoMarkersBlock } from './NoMarkersBlock';
import { RootState } from 'types';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

const ItemMarker = styled.div<{ isActive: boolean }>`
  padding: 16px;
  background-color: ${({ isActive }) =>
    isActive ? '#debf92ff' : 'antiquewhite'};
  cursor: pointer;
`;

export default function ItemMarkerList() {
  const dispatch = useDispatch();
  const { activeMarkerId, markers, markersLoading } = useSelector(
    (state: RootState) => state.map,
  );

  const isMarkersData = markers.length > 0;

  if (markersLoading) return <Skeleton animation="wave" height={95} />;

  if (!isMarkersData && !markersLoading) return <NoMarkersBlock />;

  const onClickItem = (id: string) => {
    dispatch(setActiveMarkersId(id));
  };

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" gutterBottom>
            Markers list
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column" spacing={2}>
            {markers.map(({ id, title, lat, lng }) => {
              const isActive = activeMarkerId === id;
              return (
                <ItemMarker
                  key={id}
                  isActive={isActive}
                  onClick={() => onClickItem(id)}
                >
                  <div>{`Title: ${title}`}</div>
                  <div>{`Id: ${id}`}</div>
                  <div>{`Lat: ${lat}`}</div>
                  <div>{`Lng: ${lng}`}</div>
                </ItemMarker>
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
