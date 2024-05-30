import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
  getMarkersDataRequest,
  getMarkersDataSuccess,
  getMarkersDataFailure,
} from './mapSlice';
import getMarkersApi from 'api';

import { GetMarkersApiResponse, GetMarkersApiParams } from 'api/types';

function* getMarkersSaga(action: PayloadAction<GetMarkersApiParams>) {
  try {
    const response: GetMarkersApiResponse = yield call(
      getMarkersApi,
      action.payload,
    );
    yield put(getMarkersDataSuccess(response.markers));
  } catch (error: any) {
    yield put(getMarkersDataFailure(error.message || 'Unknown error'));
  }
}

export function* watchGetMarkers() {
  yield takeLatest(getMarkersDataRequest.type, getMarkersSaga);
}
