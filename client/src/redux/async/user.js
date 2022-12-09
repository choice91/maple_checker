import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';
import axios from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (payload, thunkAPI) => {
    const { id, pw } = payload;

    try {
      const response = await instance.post('/login', {
        id,
        password: pw,
      });
      console.log(response);
    } catch (err) {
      if (err) {
        console.error(err.response);
      }
    }
  }
);
