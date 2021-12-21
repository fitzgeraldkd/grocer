import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/helpers/requests.helpers";
import { BasketItem, PendingBasketItem, RequestStatus } from "../../utils/types/record.types";

interface BasketItemsState {
  basketItems: BasketItem[],
  status: RequestStatus
};

const initialState: BasketItemsState = {
  basketItems: [],
  status: 'idle'
};

interface ThunkInput {
  id?: number,
  body?: PendingBasketItem // TODO: determine a type
  sideEffect?: Function
};

interface ThunkOutput<Payload = BasketItem> {
  success: boolean,
  data: {
    messages: string[],
    payload: Payload
  }
};

export const indexBasketItems = createAsyncThunk<ThunkOutput<BasketItem[]>, ThunkInput>(
  'basketItems/index',
  async ({sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/basket_items',
      method: 'GET',
      sideEffect
    });
  }
);

export const createBasketItem = createAsyncThunk<ThunkOutput, ThunkInput>(
  'basketItems/create',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/basket_items',
      method: 'POST',
      body,
      sideEffect
    });
  }
);

export const updateBasketItem = createAsyncThunk<ThunkOutput, ThunkInput>(
  'basketItems/update',
  async ({id, body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/basket_items/${id}`,
      method: 'PATCH',
      body,
      sideEffect
    });
  }
);

export const destroyBasketItem = createAsyncThunk<ThunkOutput, ThunkInput>(
  'basketItems/destroy',
  async ({id, sideEffect=() => {}}) => {
    return sendRequest({
      path: `/api/basket_items/${id}`,
      method: 'DELETE',
      sideEffect
    });
  }
);

const basketItemsSlice = createSlice({
  name: 'basketItems',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(indexBasketItems.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(indexBasketItems.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.basketItems = payload.data.payload;
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(createBasketItem.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createBasketItem.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.basketItems.push(payload.data.payload);
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(updateBasketItem.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateBasketItem.fulfilled, (state, { payload }) => {
      if (payload.success) {
        const index = state.basketItems.findIndex(basketItem => basketItem.id === payload.data.payload.id)
        state.basketItems[index] = payload.data.payload;
      } else {
        payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });

    builder.addCase(destroyBasketItem.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(destroyBasketItem.fulfilled, (state, action) => {
      if (action.payload.success) {
        const index = state.basketItems.findIndex(basketItem => basketItem.id === action.meta.arg.id)
        state.basketItems.splice(index, 1);
      } else {
        action.payload.data.messages.forEach(message => console.warn(message));
      }
      state.status = 'idle';
    });
  }
});

export default basketItemsSlice.reducer;