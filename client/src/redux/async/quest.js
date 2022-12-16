import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';

export const getQuests = createAsyncThunk(
  'quest/getQuests',
  async (payload, thunkAPI) => {
    const { navigate } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.get('/quest', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
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

export const questCheck = createAsyncThunk(
  'quest/check',
  async (payload, thunkAPI) => {
    const { nickname, questType } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.post(
        '/quest',
        {
          nickname,
          questType,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCharacter = createAsyncThunk(
  'quest/delete',
  async (payload, thunkAPI) => {
    const { nickname } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.delete(`/quest/${nickname}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
