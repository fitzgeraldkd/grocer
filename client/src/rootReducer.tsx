import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './store/authentication/authentication.slice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  },
});

export default store;