import { configureStore } from '@reduxjs/toolkit';
import authorisationReducer from '../features/authorisation/authorisationSlice';
import trackReducer from '../features/tracklist/trackSlice';
import playlistReducer from '../features/playlist/playlistSlice';


export const store = configureStore({
  reducer: {
    authorisation: authorisationReducer,
    track: trackReducer,
    playlist: playlistReducer,

  },
});
