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
      isError: false,
      message: "",
    },
    profile: {
      isFetching: false,
      message: "",
    },
  },
  reducers: {
    initLoginState: (state, action) => {
      state.loginState = {
        isFetching: false,
        isError: false,
        message: "",
      };
    },
  },
  extraReducers: {
    // 로그인
    [login.pending]: (state, action) => {
      state.loginState.isFetching = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loginState = {
        isFetching: false,
        message: "",
      };
    },
    [login.rejected]: (state, action) => {
      state.loginState.isFetching = false;

      if (
        action.payload.errorMessage === "user not found" ||
        action.payload.errorMessage === "incorrect password"
      ) {
        state.loginState.message = "아이디 또는 비밀번호를 잘못 입력했습니다.";
        state.loginState.isError = true;
      }
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
