import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { sendRequest } from '../../utils/helpers/requests.helpers';
import { UserCredentialsType } from '../../utils/types/formData.types';
import { RequestStatus, User } from '../../utils/types/record.types';

interface AuthenticationState {
  userId: number | null,
  status: RequestStatus
};

export const initialState: AuthenticationState = {
  userId: null,
  status: 'idle'
};

type ThunkInput = {
  body?: UserCredentialsType,
  sideEffect?: Function
};

type ThunkOutput = {
  success: boolean,
  data: {
    messages: string[],
    payload: User
  }
};

export const authenticateUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/login', 
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({ 
      path: '/api/login', 
      method: 'POST', 
      body: body, 
      sideEffect: sideEffect
    });
  }
);

export const signOutUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/signOut',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/logout',
      method: 'DELETE',
      body,
      sideEffect
    });
  }
);

export const registerUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/register',
  async ({body={}, sideEffect=() => {}}) => {
    return sendRequest({ 
      path: '/api/users', 
      method: 'POST', 
      body: body, 
      sideEffect: sideEffect
    });
  }
);

export const verifyUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/verify',
  async ({sideEffect=() => {}}) => {
    return sendRequest({
      path: '/api/me',
      method: 'GET',
      sideEffect: sideEffect
    });
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    userLoggedOut(state) {
      state.userId = null;
      state.status = 'idle';
    }
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.pending, (state) => {
      // state.userId = null;
      state.status = 'loading';
    });
    builder.addCase(authenticateUser.fulfilled, (state, { payload }) => {
      state.userId = payload.success ? payload.data.payload.id : null;
      state.status = 'idle';
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.userId = null;
      state.status = 'failed';
      console.error(action);
    });

    builder.addCase(signOutUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(signOutUser.fulfilled, (state) => {
      state.status = 'idle';
      state.userId = null;
    });
    builder.addCase(signOutUser.rejected, (state) => {
      state.status = 'failed';
      state.userId = null;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.userId = null;
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.userId = payload.success ? payload.data.payload.id : null;
      state.status = 'idle';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.userId = null;
      state.status = 'failed';
      console.error(action);
    });

    builder.addCase(verifyUser.pending, state => {
      // state.userId = null;
      state.status = 'loading';
    });
    builder.addCase(verifyUser.fulfilled, (state, { payload }) => {
      state.userId = payload.success ? payload.data.payload.id : null;
      state.status = 'idle';
    });
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.userId = null;
      state.status = 'failed';
      console.error(action);
    });
  }
});

export const { userLoggedOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;