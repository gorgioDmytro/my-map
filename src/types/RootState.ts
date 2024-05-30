// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
import { IMapReducer } from 'store/mapSlice/types';

export interface RootState {
  map: IMapReducer;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
