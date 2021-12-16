import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserCredentialsType } from '../../utils/types/formData.types';

export interface AuthenticationState {
  userId: number | null,
  status: 'idle' | 'loading' | 'failed'
};

const initialState: AuthenticationState = {
  userId: null,
  status: 'idle'
};

export const authenticateUser = createAsyncThunk<any, UserCredentialsType>(
  'authenticate/login', 
  async (data) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    const response = await fetch('/api/login', options);
    const payload = await response.json();
    return {success: response.ok, data: payload};
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    userSet(state, action) {
      state.userId = action.payload.userId;
    }
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.pending, (state, { payload }) => {
      state.status = 'loading';
      console.log('test')
    });
    builder.addCase(authenticateUser.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.userId = payload.data.id
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.status = 'failed';
      console.error(action);
    });
  }
});

export const { userSet } = authenticationSlice.actions;
export default authenticationSlice.reducer;