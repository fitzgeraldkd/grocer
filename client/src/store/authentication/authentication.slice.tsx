import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserCredentialsType } from '../../utils/types/formData.types';
import { sendRequest } from '../../utils/helpers/requests.helpers';
import { UserRecordType, ValidRecordType } from '../../utils/types/record.types';

interface AuthenticationState {
  userId: number | null,
  status: 'idle' | 'loading' | 'failed'
};

const initialState: AuthenticationState = {
  userId: null,
  status: 'idle'
};

type ThunkInput = {
  body: UserCredentialsType,
  sideEffect?: Function
};

type ThunkOutput = {
  success: boolean,
  data: {
    messages: string[],
    payload: UserRecordType & ValidRecordType
  }
}

export const authenticateUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/login', 
  async data => {
    return sendRequest({ 
      path: '/api/login', 
      method: 'POST', 
      body: data.body, 
      sideEffect: data.sideEffect
    });
  }
);

export const registerUser = createAsyncThunk<ThunkOutput, ThunkInput>(
  'authenticate/register',
  async data => {
    return sendRequest({ 
      path: '/api/users', 
      method: 'POST', 
      body: data.body, 
      sideEffect: data.sideEffect
    });
  }
)

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
      state.userId = null;
      state.status = 'loading';
    });
    builder.addCase(authenticateUser.fulfilled, (state, { payload }) => {
      state.userId = payload.success ? payload.data.payload.id : null;
      state.status = 'idle';
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.status = 'failed';
      console.error(action);
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
      state.status = 'failed';
      console.error(action);
    });
  }
});

export const { userLoggedOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;