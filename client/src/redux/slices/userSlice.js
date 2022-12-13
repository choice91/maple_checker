import { createSlice } from '@reduxjs/toolkit';
import { login, idCheck } from '../async/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: null,
    isFetching: false,
    isLoggedIn: false,
    checkIdDupLoading: false,
    checkIdDupResult: null,
    checkIdDupMessage: null,
    checkIdDupColor: '',
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
    [idCheck.pending]: (state, { payload }) => {
      state.checkIdDupLoading = true;
    },
    [idCheck.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.checkIdDupLoading = false;
      state.checkIdDupResult = !payload.ok;
      state.checkIdDupMessage = payload.message;
      state.checkIdDupColor = 'blue';
    },
    [idCheck.rejected]: (state, { payload }) => {
      console.error(payload);
      state.checkIdDupLoading = false;
      state.checkIdDupResult = !payload.ok;
      state.checkIdDupMessage = payload.message;
      state.checkIdDupColor = 'red';
    },
  },
});

export default userSlice;
