import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../apis';
import { setCookie } from '../../utils/Cookies';
import { setLocalStorage } from '../../utils/LocalStorage';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    const {
      data: { id, pw },
      navigate,
    } = payload;

    try {
      const response = await API.post('/login', {
        id,
        password: pw,
      });

      const { accessToken, refreshToken } = response.data.token;

      const now = new Date();
      const refreshExpires = new Date();
      refreshExpires.setDate(now.getDate() + 14);

      setLocalStorage('token', accessToken);
      setCookie('refresh', refreshToken, {
        path: '/',
        expires: refreshExpires,
      });

      navigate('/boss', { replace: true });

      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (payload, thunkAPI) => {
    const {
      data: { id, pw, pw2, name },
      navigate,
    } = payload;

    try {
      const response = await API.post('/join', {
        id,
        password: pw,
        password2: pw2,
        name,
      });

      navigate('/login', { replace: false });

      return response.data;
    } catch (err) {
      console.error(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const idCheck = createAsyncThunk(
  'user/idCheck',
  async (payload, thunkAPI) => {
    const { id } = payload;

    try {
      const response = await API.post('id-check', { id });
      return response.data;
    } catch (err) {
      console.error(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
