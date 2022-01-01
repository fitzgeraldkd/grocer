import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { RecipeDataType } from '../../utils/types/formData.types';
import { Recipe, RecipeDetailed, RequestStatus } from '../../utils/types/record.types';

interface RecipesState {
  recipes: Recipe[],
  activeRecipe: RecipeDetailed | null,
  status: RequestStatus,
  filters: {
    name: string,
    cuisine: string,
    course: string,
    vegetarian: boolean,
    vegan: boolean
  }
};

const initialState: RecipesState = {
  recipes: [],
  activeRecipe: null,
  status: 'idle',
  filters: {
    name: '',
    cuisine: '',
    course: '',
    vegetarian: false,
    vegan: false
  }
};

interface FilterToApply {
  key: string,
  // key: 'name' | 'cuisine',
  value: string | boolean
};

type FilterOptions = ('name' | 'cuisine' | 'course');
type FilterBooleanOptions = ('vegetarian' | 'vegan');

interface ThunkInput {
  id?: number,
  body?: RecipeDataType,
  sideEffect?: Function
};

interface ThunkOutput<Payload = RecipeDetailed> {
  success: boolean,
  data: {
    messages: string[],
    payload: Payload
  }
};

export const indexRecipes = createAsyncThunk<ThunkOutput<Recipe[]>, ThunkInput>(
  'recipes/index',
  async ({sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/recipes',
      method: 'GET',
      sideEffect
    })
  }
);

export const showRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/show',
  async ({id, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/recipes/${id}`,
      method: 'GET',
      sideEffect
    });
  }
);

export const createRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/create',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/recipes',
      method: 'POST',
      body,
      sideEffect
    });
  }
);

export const updateRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/update',
  async ({id, body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/recipes/${id}`,
      method: 'PATCH',
      body,
      sideEffect
    });
  }
);

export const destroyRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/destroy',
  async ({id, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/recipes/${id}`,
      method: 'DELETE',
      sideEffect
    });
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: initialState,
  reducers: {
    filterApplied(state, action: PayloadAction<FilterToApply>) {
      if (action.payload.key in state.filters) {
        if (typeof action.payload.value === 'string') {
          state.filters[action.payload.key as FilterOptions] = action.payload.value
        } else if (typeof action.payload.value === 'boolean') {
          state.filters[action.payload.key as FilterBooleanOptions] = action.payload.value
        }
      }
    },
    filterReset(state) {
      state.filters = initialState.filters
    }
  },
  extraReducers: builder => {
    builder.addCase(indexRecipes.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(indexRecipes.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.recipes = payload.data.payload;
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(showRecipe.pending, state => {
      state.status = 'loading';
      state.activeRecipe = null;
    });
    builder.addCase(showRecipe.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.activeRecipe = payload.data.payload;
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(createRecipe.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createRecipe.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.recipes.push(payload.data.payload);
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(updateRecipe.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateRecipe.fulfilled, (state, { payload }) => {
      if (payload.success) {
        const index = state.recipes.findIndex(recipe => recipe.id === payload.data.payload.id);
        state.recipes[index] = payload.data.payload;
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(destroyRecipe.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(destroyRecipe.fulfilled, (state, action) => {
      if (action.payload.success) {
        const index = state.recipes.findIndex(recipe => recipe.id === action.meta.arg.id);
        state.recipes.splice(index, 1);
        state.activeRecipe = null;
      } else {
        action.payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    })
  }
});

export const { filterApplied, filterReset } = recipesSlice.actions;
export default recipesSlice.reducer;
