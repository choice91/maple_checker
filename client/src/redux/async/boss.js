import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../apis';

import modalSlice from '../slices/modalSlice';

export const addCharacterToBoss = createAsyncThunk(
  'boss/add',
  async (payload, thunkAPI) => {
    const {
      data: { nickname },
      navigate,
    } = payload;

    try {
      const response = await API.post('/boss', {
        nickname,
      });

      thunkAPI.dispatch(
        modalSlice.actions.openAndCloseAddModal({ type: 'boss' })
      );

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 400:
          console.error(response);
          return thunkAPI.rejectWithValue(response.data);
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
      }
    }
  }
);

export const getBossData = createAsyncThunk(
  'boss/getBoss',
  async (payload, thunkAPI) => {
    try {
      const response = await API.get('/boss');

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const bossCheckToServer = createAsyncThunk(
  'boss/check',
  async (payload, thunkAPI) => {
    const {
      data: { bossId, bossType },
      navigate,
    } = payload;

    try {
      const response = await API.post('/boss/done', {
        bossId,
        bossType,
      });

      return response.data;
    } catch (err) {
      const { response } = err;

      if (
        response.data.error.name === 'TokenExpiredError' &&
        response.status === 401
      ) {
        localStorage.removeItem('user');
        navigate('/login');
      }

      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const delCharacterToBoss = createAsyncThunk(
  'boss/delete',
  async (payload, thunkAPI) => {
    const {
      data: { bossId },
      navigate,
    } = payload;

    try {
      const response = await API.delete(`/boss/${bossId}`);

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(response.data);
      }
    }
  }
);

export const updateNicknameInBossTable = createAsyncThunk(
  'boss/update',
  async (payload, thunkAPI) => {
    const {
      data: { bossId, newNickname },
      navigate,
    } = payload;

    try {
      const response = await API.put(`/boss/${bossId}`, {
        newNickname,
      });

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(response.data);
      }
    }
  }
);

export const resetBossData = createAsyncThunk(
  'boss/reset',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.post('/boss/reset');

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 400:
          return thunkAPI.rejectWithValue(response.data);
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
      }
    }
  }
);
