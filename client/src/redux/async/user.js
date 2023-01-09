import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../apis';
import { setCookie } from '../../utils/Cookies';

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
      const accessExpires = new Date();
      const refreshExpires = new Date();
      accessExpires.setHours(now.getHours() + 1);
      refreshExpires.setDate(now.getDate() + 14);

      setCookie('access', accessToken, { path: '/', expires: accessExpires });
      setCookie('refresh', refreshToken, {
        path: '/',
        expires: refreshExpires,
      });

      // localStorage.setItem(
      //   'token',
      //   JSON.stringify({ accessToken, refreshToken })
      // );

      navigate('/todo', { replace: true });

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
