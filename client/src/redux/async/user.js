import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';
import jwtDecode from 'jwt-decode';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    const {
      data: { id, pw },
      navigate,
    } = payload;

    try {
      const response = await instance.post('/login', {
        id,
        password: pw,
      });

      const { accessToken } = response.data.token;
      const decodedToken = jwtDecode(accessToken);

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: decodedToken.id,
          username: decodedToken.username,
          token: accessToken,
        })
      );

      navigate('/', { replace: true });

      return { id, username: decodedToken.username };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (payload, thunkAPI) => {
    const { id, pw, pw2, name } = payload;

    try {
      const response = await instance.post('/join', {
        id,
        password: pw,
        password2: pw2,
        name,
      });
      console.log(response);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const loginCheck = createAsyncThunk(
  'user/loginCheck',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get('/auth-check');
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
