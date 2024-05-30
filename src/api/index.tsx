import { GetMarkersApi } from './types';

const getMarkersApi: GetMarkersApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        markers: [
          { id: '1', lat: 31.510357, lng: 52.101027, title: 'Marker1' },
          { id: '2', lat: 31.941757, lng: 51.6107027, title: 'Marker2' },
          { id: '3', lat: 31.960857, lng: 51.4501027, title: 'Marker3' },
          { id: '4', lat: 31.730457, lng: 51.2205087, title: 'Marker4' },
        ],
      });
    }, 1000);
  });
};

export default getMarkersApi;
