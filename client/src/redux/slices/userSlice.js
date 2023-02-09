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
      username: "",
      nameCheckError: false,
      nameCheckMessage: "",
      currentPwCheckError: false,
      currentPwCheckMessage: "",
      pwCheckError: false,
      pwCheckMessage: "",
      pw2CheckError: false,
      pw2CheckMessage: "",
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
    initProfileState: (state, action) => {
      state.profile = {
        ...state.profile,
        isFetching: false,
        nameCheckError: false,
        nameCheckMessage: "",
        currentPwCheckError: false,
        currentPwCheckMessage: "",
        pwCheckError: false,
        pwCheckMessage: "",
        pw2CheckError: false,
        pw2CheckMessage: "",
      };
    },
    validateSignUpstate: (state, action) => {
      state.signUpState = {
        ...state.signUpState,
        ...action.payload,
      };
    },
    validateProfile: (state, action) => {
      state.profile = {
        ...state.profile,
        ...action.payload,
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
      state.signUpState = {
        isFetching: true,
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
    [signUp.fulfilled]: (state, action) => {
      state.signUpState.isFetching = false;
    },
    [signUp.rejected]: (state, action) => {
      state.signUpState.isFetching = false;

      if (action.payload.errorMessage === "password incorrect") {
        state.signUpState.signUpErrorMessage =
          "비밀번호가 서로 일치하지 않습니다.";
        state.signUpState.pwCheckError = true;
        state.signUpState.pwCheckMessage = "비밀번호가 서로 일치하지 않습니다.";
        state.signUpState.pw2CheckError = true;
        state.signUpState.pw2CheckMessage =
          "비밀번호가 서로 일치하지 않습니다.";
      } else if (action.payload.errorMessage === "exist id") {
        state.signUpState.signUpErrorMessage = "아이디 중복확인을 해주세요.";
        state.signUpState.idCheckError = true;
        state.signUpState.idCheckMessage = "이미 존재하는 아이디입니다.";
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
      state.profile.username = action.payload.user.name;
    },
    [getProfile.rejected]: (state, action) => {},

    // 프로필 업데이트
    [updateProfile.pending]: (state, action) => {
      state.profile = {
        ...state.profile,
        isFetching: true,
        nameCheckError: false,
        nameCheckMessage: "",
        currentPwCheckError: false,
        currentPwCheckMessage: "",
        pwCheckError: false,
        pwCheckMessage: "",
        pw2CheckError: false,
        pw2CheckMessage: "",
      };
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profile.isFetching = false;
    },
    [updateProfile.rejected]: (state, action) => {
      state.profile.isFetching = false;

      switch (action.payload.errorMessage) {
        case "incorrect password":
          state.profile.currentPwCheckError = true;
          state.profile.currentPwCheckMessage = "비밀번호가 일치하지 않습니다.";
          break;
        case "new password is same current password":
          state.profile.currentPwCheckError = true;
          state.profile.currentPwCheckMessage =
            "현재 비밀번호와 새 비밀번호가 일치합니다.";
          state.profile.pwCheckError = true;
          state.profile.pwCheckMessage =
            "현재 비밀번호와 새 비밀번호가 일치합니다.";
          break;
        case "password does not match":
          state.profile.pwCheckError = true;
          state.profile.pwCheckMessage =
            "변경할 비밀번호가 서로 일치하지 않습니다.";
          state.profile.pw2CheckError = true;
          state.profile.pw2CheckMessage =
            "변경할 비밀번호가 서로 일치하지 않습니다.";
          break;
      }
    },
  },
});

export default userSlice;
