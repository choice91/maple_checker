import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../apis';
import modalSlice from '../slices/modalSlice';

export const getTodoDatas = createAsyncThunk(
  'todo/getTodos',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.get('/todo/quest');

      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 401:
          if (err.response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const addCharacter = createAsyncThunk(
  'todo/add',
  async (payload, thunkAPI) => {
    const {
      data: { nickname },
      navigate,
    } = payload;

    try {
      const response = await API.post('/todo/quest', { nickname });

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeAddModal());
      }

      return response.data;
    } catch (err) {
      switch (err.response.status) {
        case 400:
          return thunkAPI.rejectWithValue(err.response.data);
        case 401:
          if (err.response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
      }
    }
  }
);
