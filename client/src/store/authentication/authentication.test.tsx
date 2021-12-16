import authenticationReducer, { authenticateUser, userSet } from './authentication.slice';
// import { useDispatch, useSelector } from 'react-redux';
// import { createAsyncThunk } from '@reduxjs/toolkit'
import store from '../../rootReducer'



test('has initial state', () => {
  let state = store.getState().authentication;
  expect(state).toEqual({
    userId: null,
    status: 'idle'
  });
});

test('can set user', () => {
  let state = store.getState().authentication;
  store.dispatch(userSet({ userId: 5 }));
  
  state = store.getState().authentication;

  expect(state).toEqual({
    userId: 5,
    status: 'idle'
  });
});

test('can log in', () => {
  // store.dispatch(authenticateUser('test'))
})