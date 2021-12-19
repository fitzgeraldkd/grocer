import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { RecipeDataType } from '../../utils/types/formData.types';
import { RecipeRecordType, RequestStatus, ValidRecordType } from '../../utils/types/record.types';

interface RecipesState {
  recipes: (RecipeRecordType & ValidRecordType)[],
  activeRecipe: (RecipeRecordType & ValidRecordType) | null,
  status: RequestStatus
};

const initialState: RecipesState = {
  recipes: [],
  activeRecipe: null,
  status: 'idle'
};

interface ThunkInput {
  id?: number,
  body?: RecipeDataType,
  sideEffect?: Function
};

interface ThunkOutput<Payload = RecipeRecordType & ValidRecordType> {
  success: boolean,
  data: {
    messages: string[],
    payload: Payload
  }
};

export const indexRecipes = createAsyncThunk<ThunkOutput<(RecipeRecordType & ValidRecordType)[]>, ThunkInput>(
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
  reducers: {},
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

export default recipesSlice.reducer;
