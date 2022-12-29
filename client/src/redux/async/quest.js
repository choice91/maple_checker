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
    const {
      data: { questId, questType },
      navigate,
    } = payload;

    try {
      const response = await API.post('/quest/done', {
        questId,
        questType,
      });

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(response.data);
      }
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

export const updateNickname = createAsyncThunk(
  'quest/update',
  async (payload, thunkAPI) => {
    const {
      data: { questId, newNickname },
      navigate,
    } = payload;

    try {
      const response = await API.put(`/quest/${questId}`, {
        newNickname,
      });

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(response.data);
      }
    }
  }
);

export const deleteCharacter = createAsyncThunk(
  'quest/delete',
  async (payload, thunkAPI) => {
    const {
      data: { questId },
      navigate,
    } = payload;

    try {
      const response = await API.delete(`/quest/${questId}`);

      return response.data;
    } catch (err) {
      const { response } = err;

      switch (response.status) {
        case 401:
          if (response.data.error.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            navigate('/login');
          }
          return;
        case 404:
          return thunkAPI.rejectWithValue(response.data);
      }
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
