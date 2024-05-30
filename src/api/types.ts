import { IMarker } from 'types';

export type RequestApi<P, R> = (
  payload: P,
  signal?: AbortSignal | null,
) => Promise<R>;

export type GetMarkersApiParams = {
  query?: string;
};

export type GetMarkersApiResponse = {
  markers: IMarker[];
};

export type GetMarkersApi = RequestApi<
  GetMarkersApiParams,
  GetMarkersApiResponse
>;
