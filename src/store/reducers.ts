/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { InjectedReducersType } from 'utils/types/injector-typings';

import mapSlice from './mapSlice/mapSlice';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  return combineReducers({
    ...injectedReducers,
    map: mapSlice,
  });
}
