export type TError = Error | null | unknown;

export interface IMarker {
  id: string;
  title: string;
  lat: number;
  lng: number;
}
