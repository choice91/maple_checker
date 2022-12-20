import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';

import modalSlice from '../slices/modalSlice';

export const submitAddCharacterToBoss = createAsyncThunk(
  'boss/add',
  async (payload, thunkAPI) => {
    const {
      data: { nickname },
      navigate,
    } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.post(
        '/boss',
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      thunkAPI.dispatch(
        modalSlice.actions.openAndCloseAddModal({ type: 'boss' })
      );

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

export const getBossData = createAsyncThunk(
  'boss/getBoss',
  async (payload, thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.get('/boss', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

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
      data: { nickname, bossType },
      navigate,
    } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.post(
        '/boss/done',
        {
          nickname,
          bossType,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
