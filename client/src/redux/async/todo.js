import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../apis';

export const getTodoDatas = createAsyncThunk(
  'todo/getTodos',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.get('/todo/quest');
      console.log(response);

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
