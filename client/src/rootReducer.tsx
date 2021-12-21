import { configureStore } from '@reduxjs/toolkit';

import authenticationReducer from './store/authentication/authentication.slice';
import ingredientsReducer from './store/ingredients/ingredients.slice';
import recipesReducer from './store/recipes/recipes.slice';
import basketItemsReducer from './store/basketItems/basketItems.slice';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer,
    basketItems: basketItemsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;