import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';

export const submitAddCharacterToBoss = createAsyncThunk(
  'boss/add',
  async (payload, thunkAPI) => {
    const { nickname } = payload;
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
      console.log(response);

      return response.data;
    } catch (err) {
      console.error(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
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
      console.log(response);

      return response.data;
    } catch (err) {
      console.error(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
