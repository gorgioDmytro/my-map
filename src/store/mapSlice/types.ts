import { IMarker, TError } from 'types';

export interface IMapReducer {
  markers: IMarker[];
  activeMarkerId: string;
  markersLoading: boolean;
  error: TError;
}
