import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './store/authentication/authentication.slice';
import ingredientsReducer from './store/ingredients/ingredients.slice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    ingredients: ingredientsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;