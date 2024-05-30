import { IMarker, TError } from 'types';

export interface IMapReducer {
  markers: IMarker[];
  markersLoading: boolean;
  error: TError;
}
