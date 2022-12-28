import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../apis';

import modalSlice from '../slices/modalSlice';

export const getQuests = createAsyncThunk(
  'quest/getQuests',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.get('/quest');

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

    try {
      const response = await API.post('/quest/done', {
        nickname,
        questType,
      });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addCharacter = createAsyncThunk(
  'quest/add',
  async (payload, thunkAPI) => {
    const {
      data: { nickname },
      navigate,
    } = payload;

    try {
      const response = await API.post('/quest', {
        nickname,
      });

      thunkAPI.dispatch(
        modalSlice.actions.openAndCloseAddModal({ type: 'quest' })
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

export const updateNickname = createAsyncThunk(
  'quest/update',
  async (payload, thunkAPI) => {
    const { prevNickname, newNickname } = payload;

    try {
      const response = await API.put('/quest', {
        prevNickname,
        newNickname,
      });

      return response.data;
    } catch (err) {
      console.error(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCharacter = createAsyncThunk(
  'quest/delete',
  async (payload, thunkAPI) => {
    const { id } = payload;

    try {
      const response = await API.delete(`/quest/${id}`);

      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetQuestData = createAsyncThunk(
  'quest/reset',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.post('/quest/reset');

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 400:
          return thunkAPI.rejectWithValue(response.data);
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
      }
    }
  }
);
