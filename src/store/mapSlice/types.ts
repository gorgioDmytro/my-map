import { IMarker, TError } from 'types';

export interface IMapReducer {
  markers: IMarker[];
  activeMarkersId: string[];
  distance: number;
  markersLoading: boolean;
  error: TError;
}
