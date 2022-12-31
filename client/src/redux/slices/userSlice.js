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
    idDupMsg: '',
    isIdOk: true,
    errorMessage: '',
    loginErrorMessage: '',
  },
  reducers: {
    initIdCheckMsg: (state, action) => {
      state.idDupMsg = '';
      state.isIdOk = true;
    },
    initLoginErrorMsg: (state, action) => {
      state.loginErrorMessage = '';
    },
  },
  extraReducers: {
    // 로그인
    [login.pending]: (state, action) => {
      state.isLoginFetching = true;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoginFetching = false;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {
      const {
        payload: { errorMessage },
      } = action;

      state.isLoginFetching = false;
      state.loginErrorMessage = errorMessage;
    },

    // 회원가입
    [signUp.pending]: (state, action) => {
      state.isSignUpFetching = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.isSignUpFetching = false;
    },
    [signUp.rejected]: (state, action) => {
      const {
        payload: { type },
      } = action;

      state.isSignUpFetching = false;

      if (type === 'exist id') {
        state.errorMessage = 'PW를 확인해주세요';
      } else if (type === 'password incorrect') {
        state.errorMessage = 'ID 중복확인을 해주세요.';
      }
    },

    // ID 중복확인
    [idCheck.pending]: (state, action) => {
      state.isIdDupFetching = true;
    },
    [idCheck.fulfilled]: (state, action) => {
      const {
        payload: { message },
      } = action;

      state.isIdDupFetching = false;
      state.idDupMsg = message;
      state.isIdOk = true;
    },
    [idCheck.rejected]: (state, action) => {
      const {
        payload: { errorMessage },
      } = action;

      state.isIdDupFetching = false;
      state.idDupMsg = errorMessage;
      state.isIdOk = false;
    },
  },
});

export default userSlice;
