import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { RecipeDataType } from '../../utils/types/formData.types';
import { RecipeRecordType, ValidRecordType } from '../../utils/types/record.types';

interface RecipesState {
  recipes: (RecipeRecordType & ValidRecordType)[]
}

const initialState: RecipesState = {
  recipes: []
};

type ThunkInput = {
  body?: RecipeDataType,
  sideEffect?: Function
};

type ThunkOutput = {
  success: boolean,
  data: {
    messages: string[],
    payload: RecipeRecordType & ValidRecordType
  }
};

export const indexRecipes = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/index',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/recipes',
      method: 'GET',
      body,
      sideEffect
    })
  }
)

export const createRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/add',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/recipes',
      method: 'POST',
      body,
      sideEffect
    });
  }
);

export const destroyRecipe = createAsyncThunk<ThunkOutput, ThunkInput>(
  'recipes/destroy',
  async ({body={}, sideEffect=() => {}}) => {
    // TODO: need to pass index of recipe to be deleted
    return sendRequest({
      path: '/api/recipes',
      method: 'DELETE',
      body,
      sideEffect
    });
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: initialState,
  reducers: {

  },
  extraReducers: builder => {

  }
})