import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarker, TError } from 'types';
import { IMapReducer } from './types';

const initialState: IMapReducer = {
  markers: [],
  activeMarkersId: [],
  distance: 0,
  markersLoading: false,
  error: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    getMarkersDataRequest: state => {
      state.markersLoading = true;
      state.error = null;
    },
    getMarkersDataSuccess: (state, action: PayloadAction<IMarker[]>) => {
      state.markersLoading = false;
      state.markers = action.payload;
    },
    getMarkersDataFailure: (state, action: PayloadAction<TError>) => {
      state.markersLoading = false;
      state.error = action.payload;
    },
    setActiveMarkersId: (state, action: PayloadAction<string>) => {
      const { activeMarkersId } = state;
      const current = action.payload;
      const isTwoMarkersChosen = activeMarkersId.length === 2;

      const isAlreadyActive = activeMarkersId.includes(current);

      state.activeMarkersId =
        isTwoMarkersChosen || isAlreadyActive
          ? [current]
          : [...activeMarkersId, current];
    },
    clearActiveMarkersId: state => {
      state.activeMarkersId = [];
    },
    setDistance: (state, action: PayloadAction<number>) => {
      state.distance = action.payload;
    },
    clearDistance: state => {
      state.distance = 0;
    },
  },
});

export const {
  getMarkersDataRequest,
  getMarkersDataSuccess,
  getMarkersDataFailure,
  setActiveMarkersId,
  setDistance,
  clearDistance,
} = mapSlice.actions;

export default mapSlice.reducer;
