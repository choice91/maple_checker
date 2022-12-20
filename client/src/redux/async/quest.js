import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../apis';

import modalSlice from '../slices/modalSlice';

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
        '/quest/done',
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

export const addCharacter = createAsyncThunk(
  'quest/add',
  async (payload, thunkAPI) => {
    const {
      data: { nickname },
      navigate,
    } = payload;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.post(
        '/quest',
        {
          nickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.put(
        '/quest',
        {
          prevNickname,
          newNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

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
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await instance.delete(`/quest/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
