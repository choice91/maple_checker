import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../apis";
import { setCookie } from "../../utils/Cookies";
import { setLocalStorage } from "../../utils/LocalStorage";

export const login = createAsyncThunk(
  "user/login",
  async (payload, thunkAPI) => {
    const {
      data: { id, pw },
      navigate,
    } = payload;

    try {
      const response = await API.post("/login", {
        id,
        password: pw,
      });

      const { accessToken, refreshToken } = response.data.token;

      const now = new Date();
      const refreshExpires = new Date();
      refreshExpires.setDate(now.getDate() + 14);

      setLocalStorage("token", accessToken);
      setCookie("refresh", refreshToken, {
        path: "/",
        expires: refreshExpires,
      });

      navigate("/boss", { replace: true });

      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async (payload, thunkAPI) => {
    const {
      data: { id, pw, pw2, name },
      navigate,
    } = payload;

    try {
      const response = await API.post("/join", {
        id,
        password: pw,
        password2: pw2,
        name,
      });

      navigate("/login", { replace: false });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const idCheck = createAsyncThunk(
  "user/idCheck",
  async (payload, thunkAPI) => {
    const { id } = payload;

    try {
      const response = await API.post("id-check", { id });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.get("/user/profile");
      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 404:
          return thunkAPI.rejectWithValue(err.response.data);
        case 401:
          if (err.response.data.error.name === "TokenExpiredError") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          return;
      }
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (payload, thunkAPI) => {
    const {
      data: { name, curPw, newPw, verifyPw },
      navigate,
    } = payload;

    try {
      const response = await API.put("/user/profile", {
        name,
        curPw,
        newPw,
        verifyPw,
      });

      if (response.data.ok) {
        window.alert("비밀번호가 변경되었습니다.");
        navigate("/boss");
      }

      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 400:
          window.alert(err.response.data.errorMessage);
          return thunkAPI.rejectWithValue(err.response.data);
        case 401:
          if (err.response.data.error.name === "TokenExpiredError") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);
