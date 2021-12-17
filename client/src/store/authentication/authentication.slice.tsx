import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserCredentialsType } from '../../utils/types/formData.types';
import { sendRequest } from '../../utils/helpers/requests.helpers';
import { UserRecordType, ValidRecordType, ValidResponse } from '../../utils/types/record.types';
import { useNavigate } from "react-router-dom";

export interface AuthenticationState {
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
    // const sideEffect = (success: boolean, payload: ValidResponse) => {
    //   if (data.setMessages) data.setMessages(payload.messages);
    // };
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
    // const sideEffect = (success: boolean, payload: ValidResponse) => {
    //   if (success) {

    //   } else if (data.setMessages) {
    //     data.setMessages(payload.messages);
    //   }
    // }
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
    // userSet(state, action) {
    //   state.userId = action.payload.userId;
    // }
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.pending, (state, { payload }) => {
      state.userId = null;
      state.status = 'loading';
    });
    builder.addCase(authenticateUser.fulfilled, (state, { payload }) => {
      state.userId = payload.success ? payload.data.payload.id : null;
      state.status = 'idle';
      // payload.setMessages(payload.data.messages);
      // if (payload.success) {
      //   state.userId = payload.data.payload.id;
      // } else {
      //   state.userId = null;
      // }
      // console.log(payload)
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.status = 'failed';
      console.error(action);
    });
  }
});

// export const { userSet } = authenticationSlice.actions;
export default authenticationSlice.reducer;