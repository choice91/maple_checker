import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../apis";

import modalSlice from "../slices/modalSlice";

export const addCharacterToBoss = createAsyncThunk(
  "boss/add",
  async (payload, thunkAPI) => {
    const {
      data: { nickname, job },
      navigate,
    } = payload;

    try {
      const response = await API.post("/boss", {
        nickname: nickname.replaceAll(/\s/g, ""),
        job,
      });

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeAddModal());
      }

      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 400:
          console.error(err.response);
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

export const getBossData = createAsyncThunk(
  "boss/getBoss",
  async (payload, thunkAPI) => {
    try {
      const response = await API.get("/boss");

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const bossCheck = createAsyncThunk(
  "boss/check",
  async (payload, thunkAPI) => {
    const {
      data: { bossId, category, bossType },
      navigate,
    } = payload;

    try {
      const response = await API.post("/boss/check", {
        bossId,
        category,
        bossType,
      });
      return response.data;
    } catch (err) {
      switch (err.response.status) {
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

export const delCharacterToBoss = createAsyncThunk(
  "boss/delete",
  async (payload, thunkAPI) => {
    const {
      data: { bossId },
      navigate,
    } = payload;

    try {
      const response = await API.delete(`/boss/${bossId}`);

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeDelModal());
      }

      return response.data;
    } catch (err) {
      switch (err.response.status) {
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

export const updateCharacterToBoss = createAsyncThunk(
  "boss/update",
  async (payload, thunkAPI) => {
    const {
      data: { id: bossId, newNickname, newJob },
      navigate,
    } = payload;

    try {
      const response = await API.put(`/boss/${bossId}`, {
        newNickname: newNickname.replaceAll(/\s/g, ""),
        newJob,
      });

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeUpdateModal());
      }

      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 400:
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

export const resetBoss = createAsyncThunk(
  "boss/reset",
  async (payload, thunkAPI) => {
    const {
      data: { category },
      navigate,
    } = payload;

    try {
      const response = await API.post("/boss/reset", { category });

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 400:
          return thunkAPI.rejectWithValue(response.data);
        case 401:
          if (response.data.error.name === "TokenExpiredError") {
            localStorage.removeItem("user");
            navigate("/login");
          }
          return;
      }
    }
  }
);

export const swapBoss = createAsyncThunk(
  "boss/swap",
  async (payload, thunkAPI) => {
    const {
      data: { index, direction },
      navigate,
    } = payload;

    try {
      const response = await API.put("/boss/swap", { index, direction });
      return response.data;
    } catch (err) {
      switch (err.response.status) {
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
