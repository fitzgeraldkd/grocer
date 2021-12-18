import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { IngredientDataType } from '../../utils/types/formData.types';
import { IngredientRecordType, RequestStatus, ValidRecordType } from '../../utils/types/record.types';

interface IngredientsState {
  ingredients: (IngredientRecordType & ValidRecordType)[],
  activeIngredient: (IngredientRecordType & ValidRecordType) | null,
  status: RequestStatus
};

const initialState: IngredientsState = {
  ingredients: [],
  activeIngredient: null,
  status: 'idle'
};

interface ThunkInput {
  id?: number,
  body?: IngredientDataType,
  sideEffect?: Function
};

interface ThunkOutput<Payload = IngredientRecordType & ValidRecordType> {
  success: boolean,
  data: {
    messages: string[],
    payload: Payload
  }
};

export const indexIngredients = createAsyncThunk<ThunkOutput<(IngredientRecordType & ValidRecordType)[]>, ThunkInput>(
  'ingredients/index',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/ingredients',
      method: 'GET',
      body,
      sideEffect
    });
  }
);

export const showIngredient = createAsyncThunk<ThunkOutput, ThunkInput>(
  'ingredients/show',
  async ({id, body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/ingredients/${id}`,
      method: 'GET',
      body,
      sideEffect
    });
  }
);

export const createIngredient = createAsyncThunk<ThunkOutput, ThunkInput>(
  'ingredients/create',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/ingredients',
      method: 'POST',
      body,
      sideEffect
    });
  }
);

export const updateIngredient = createAsyncThunk<ThunkOutput, ThunkInput>(
  'ingredients/update',
  async ({id, body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/ingredients/${id}`,
      method: 'PATCH',
      body,
      sideEffect
    });
  }
);

export const destroyIngredient = createAsyncThunk<ThunkOutput, ThunkInput>(
  'ingredients/destroy',
  async ({id, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/ingredients/${id}`,
      method: 'DELETE',
      body: {},
      sideEffect
    });
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(indexIngredients.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(indexIngredients.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.ingredients = payload.data.payload;
        state.status = 'idle';
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
    });
    
    builder.addCase(showIngredient.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(showIngredient.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.activeIngredient = payload.data.payload;
        state.status = 'idle';
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
    });
    
    builder.addCase(createIngredient.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createIngredient.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.ingredients.push(payload.data.payload);
        state.activeIngredient = payload.data.payload;
        state.status = 'idle';
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
    });
    
    builder.addCase(updateIngredient.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateIngredient.fulfilled, (state, { payload }) => {
      state.ingredients = state.ingredients.map(ingredient => (
        ingredient.id === payload.data.payload.id ? payload.data.payload : ingredient
      ));
      state.activeIngredient = payload.data.payload;
      state.status = 'idle';
    });
    
    builder.addCase(destroyIngredient.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(destroyIngredient.fulfilled, (state, { payload }) => {
      // TODO: For this to work, backend will need to return the id of the deleted element
      // TODO: Could achieve this by modifying ThunkOutput to include headers, and return id from destroy request
      state.ingredients = state.ingredients.filter(ingredient => (
        ingredient.id !== payload.data.payload.id
      ));
      state.activeIngredient = null;
      state.status = 'idle';
    });
  }
});


export default ingredientsSlice.reducer;