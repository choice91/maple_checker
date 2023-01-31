import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signUp,
  idCheck,
  getProfile,
  updateProfile,
} from "../async/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loginState: {
      isFetching: false,
      message: "",
    },
    signUpState: {
      isFetching: false,
      message: "",
    },
    profile: {
      isFetching: false,
      message: "",
    },
  },
  reducers: {
    initLoginErrorMsg: (state, action) => {
      state.loginErrorMessage = "";
    },
  },
  extraReducers: {
    // 로그인
    [login.pending]: (state, action) => {
      state.loginState.isFetching = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loginState.isFetching = false;
    },
    [login.rejected]: (state, action) => {
      state.loginState.isFetching = false;
      state.loginState.message = action.payload.errorMessage;
    },

    // 회원가입
    [signUp.pending]: (state, action) => {
      state.signUpState.isFetching = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.signUpState.isFetching = false;
    },
    [signUp.rejected]: (state, action) => {
      state.signUpState.isFetching = false;
      state.signUpState.message = action.payload.errorMessage;
    },

    // ID 중복확인
    [idCheck.pending]: (state, action) => {},
    [idCheck.fulfilled]: (state, action) => {
      state.signUpState.message = action.payload.message;
    },
    [idCheck.rejected]: (state, action) => {
      state.signUpState.message = action.payload.errorMessage;
    },

    // 회원정보 불러오기
    [getProfile.pending]: (state, action) => {},
    [getProfile.fulfilled]: (state, action) => {
      state.username = action.payload.user.name;
    },
    [getProfile.rejected]: (state, action) => {},

    // 프로필 업데이트
    [updateProfile.pending]: (state, action) => {
      state.profile.isFetching = true;
      state.profile.message = "";
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profile.isFetching = false;
    },
    [updateProfile.rejected]: (state, action) => {
      state.profile.isFetching = false;
      state.profile.message = action.payload.errorMessage;
    },
  },
});

export default userSlice;
