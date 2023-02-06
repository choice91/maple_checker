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
      idCheckError: false,
      idCheckMessage: "",
      pwCheckError: false,
      pwCheckMessage: "",
      pw2CheckError: false,
      pw2CheckMessage: "",
      nameCheckError: false,
      nameCHeckMessage: "",
      signUpErrorMessage: "",
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
        message: "",
      };
    },
    initSignUpState: (state, action) => {
      state.signUpState = {
        isFetching: false,
        idCheckError: false,
        idCheckMessage: "",
        pwCheckError: false,
        pwCheckMessage: "",
        pw2CheckError: false,
        pw2CheckMessage: "",
      };
    },
    validateId: (state, action) => {
      state.signUpState.idCheckError = action.payload.isError;
      state.signUpState.idCheckMessage = action.payload.message;
    },
    validatePw: (state, action) => {
      state.signUpState.pwCheckError = action.payload.isError;
      state.signUpState.pwCheckMessage = action.payload.message;
    },
    validatePw2: (state, action) => {
      state.signUpState.pw2CheckError = action.payload.isError;
      state.signUpState.pw2CheckMessage = action.payload.message;
    },
    comparePwAndPw2: (state, action) => {
      state.signUpState = {
        ...state.signUpState,
        pwCheckError: action.payload.isError,
        pwCheckMessage: action.payload.message,
        pw2CheckError: action.payload.isError,
        pw2CheckMessage: action.payload.message,
      };
    },
    validateName: (state, action) => {
      state.signUpState.nameCheckError = action.payload.isError;
      state.signUpState.nameCHeckMessage = action.payload.message;
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
      state.signUpState = {
        isFetching: false,
        idCheckError: false,
        idCheckMessage: "",
        pwCheckError: false,
        pwCheckMessage: "",
        pw2CheckError: false,
        pw2CheckMessage: "",
        nameCheckError: false,
        nameCHeckMessage: "",
        signUpErrorMessage: "",
      };
    },
    [signUp.rejected]: (state, action) => {
      state.signUpState.isFetching = false;

      if (action.payload.errorMessage === "password incorrect") {
        state.signUpState.signUpErrorMessage =
          "비밀번호가 서로 일치하지 않습니다.";
      } else if (action.payload.errorMessage === "exist id") {
        state.signUpState.signUpErrorMessage = "이미 존재하는 아이디입니다.";
      }
    },

    // ID 중복확인
    [idCheck.pending]: (state, action) => {},
    [idCheck.fulfilled]: (state, action) => {
      state.signUpState.idCheckError = false;
      if (action.payload.message === "valid id") {
        state.signUpState.idCheckMessage = "사용 가능한 아이디입니다.";
      }
    },
    [idCheck.rejected]: (state, action) => {
      state.signUpState.idCheckError = true;
      if (action.payload.errorMessage === "id duplication") {
        state.signUpState.idCheckMessage = "중복된 아이디입니다.";
      }
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
