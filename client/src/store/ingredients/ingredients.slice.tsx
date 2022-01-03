import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { IngredientDataType } from '../../utils/types/formData.types';
import { Ingredient, IngredientDetailed, RecipeIngredientDetailed, RequestStatus } from '../../utils/types/record.types';

interface IngredientsState {
  ingredients: Ingredient[],
  activeIngredient: IngredientDetailed | null,
  status: RequestStatus,
  filters: {
    name: string
  }
};

const initialState: IngredientsState = {
  ingredients: [],
  activeIngredient: null,
  status: 'idle',
  filters: {
    name: ''
  }
};

interface FilterToApply {
  key: string,
  value: string | boolean
};

type FilterOptions = ('name');
type FilterBooleanOptions = ('inBasket');

interface ThunkInput {
  id?: number,
  body?: IngredientDataType,
  sideEffect?: Function
};

interface ThunkOutput<Payload = IngredientDetailed> {
  success: boolean,
  data: {
    messages: string[],
    payload: Payload
  }
};

export const indexIngredients = createAsyncThunk<ThunkOutput<(Ingredient)[]>, ThunkInput>(
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
  reducers: {
    ingredientsAdded(state, action: PayloadAction<RecipeIngredientDetailed[]>) {
      // payload.payload.forEach()
      console.log(action.payload);
      console.log(state.ingredients);
      action.payload.forEach(ingredient => {
        if (!state.ingredients.find(thisIngredient => thisIngredient.id === ingredient.ingredient.id)) state.ingredients.push(ingredient.ingredient);
      })
    },
    filterApplied(state, action: PayloadAction<FilterToApply>) {
      if (action.payload.key in state.filters) {
        if (typeof action.payload.value === 'string') {
          state.filters[action.payload.key as FilterOptions] = action.payload.value;
        } else if (typeof action.payload.value === 'boolean') {
          // state.filters[action.payload.key as FilterBooleanOptions] = action.payload.value;
        }
      }
    },
    filterReset(state) {
      state.filters = initialState.filters
    }
  },
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
      state.activeIngredient = null;
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
      // console.log(state);
      // state.ingredients = state.ingredients.map(ingredient => (
      //   ingredient.id === payload.data.payload.id ? payload.data.payload : ingredient
      // ));
      console.log(payload)
      const index = state.ingredients.findIndex(ingredient => ingredient.id === payload.data.payload.id);
      // state.ingredients[index] = payload.data.payload;
  
      state.ingredients[index] = {id: payload.data.payload.id, name: payload.data.payload.name, recipe_count: payload.data.payload.recipes.length}
      state.activeIngredient = payload.data.payload;
      state.status = 'idle';
    });
    
    builder.addCase(destroyIngredient.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(destroyIngredient.fulfilled, (state, action) => {
      if (action.payload.success) {
        const index = state.ingredients.findIndex(ingredient => ingredient.id === action.meta.arg.id);
        state.ingredients.splice(index, 1);
        state.activeIngredient = null;
      }
      state.status = 'idle';
    });
  }
});

export const { ingredientsAdded, filterApplied, filterReset } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;