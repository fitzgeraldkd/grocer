import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './store/authentication/authentication.slice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;