import { createSlice } from '@reduxjs/toolkit';
import { login, loginCheck } from '../async/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: null,
    isFetching: false,
    isLoggedIn: false,
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    [login.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isLoggedIn = true;
      state.id = payload.id;
      state.username = payload.username;
    },
    [login.rejected]: (state, { payload }) => {
      state.isFetching = false;
    },
    [loginCheck.pending]: (state, { payload }) => {},
    [loginCheck.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.id = payload.userInfo.id;
      state.username = payload.userInfo.username;
    },
    [loginCheck.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.errorMessage = payload.errorMessage;
    },
  },
});

export default userSlice;
