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
