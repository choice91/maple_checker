import { createSlice } from '@reduxjs/toolkit';
import { login, signUp, idCheck } from '../async/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    username: null,
    isLoginFetching: false,
    isSignUpFetching: false,
    isIdDupFetching: false,
    isLoggedIn: false,
    idDupMsg: null,
    idDupColor: '',
    errorMessage: null,
  },
  reducers: {},
  extraReducers: {
    // 로그인
    [login.pending]: (state, { payload }) => {
      state.isLoginFetching = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isLoginFetching = false;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.isLoginFetching = false;
    },

    // 회원가입
    [signUp.pending]: (state, { payload }) => {
      state.isSignUpFetching = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isSignUpFetching = false;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isSignUpFetching = false;
      if (payload.type === 'exist id') {
        state.errorMessage = 'PW를 확인해주세요';
      } else if (payload.type === 'password incorrect') {
        state.errorMessage = 'ID 중복확인을 해주세요.';
      }
    },

    // ID 중복확인
    [idCheck.pending]: (state, { payload }) => {
      state.isIdDupFetching = true;
    },
    [idCheck.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isIdDupFetching = false;
      state.idDupMsg = payload.message;
      state.idDupColor = 'blue';
    },
    [idCheck.rejected]: (state, { payload }) => {
      console.error(payload);
      state.isIdDupFetching = false;
      state.idDupMsg = payload.message;
      state.idDupColor = 'red';
    },
  },
});

export default userSlice;
