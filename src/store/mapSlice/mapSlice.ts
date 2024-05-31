import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarker, TError } from 'types';
import { IMapReducer } from './types';

const initialState: IMapReducer = {
  markers: [],
  activeMarkerId: '',
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
      state.activeMarkerId = action.payload;
    },
    clearActiveMarkersId: state => {
      state.activeMarkerId = '';
    },
  },
});

export const {
  getMarkersDataRequest,
  getMarkersDataSuccess,
  getMarkersDataFailure,
  setActiveMarkersId,
} = mapSlice.actions;

export default mapSlice.reducer;
