import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMarker, TError } from 'types';
import { IMapReducer } from './types';

const initialState: IMapReducer = {
  markers: [],
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
  },
});

export const {
  getMarkersDataRequest,
  getMarkersDataSuccess,
  getMarkersDataFailure,
} = mapSlice.actions;

export default mapSlice.reducer;
