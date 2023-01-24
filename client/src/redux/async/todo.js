import { createAsyncThunk } from '@reduxjs/toolkit';

import API from '../apis';
import modalSlice from '../slices/modalSlice';

export const getTodoDatas = createAsyncThunk(
  'todo/getTodos',
  async (payload, thunkAPI) => {
    const { navigate } = payload;

    try {
      const response = await API.get('/todo');

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
      data: { nickname, job },
      navigate,
    } = payload;

    try {
      const response = await API.post('/todo', { nickname, job });

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

export const deleteCharacter = createAsyncThunk(
  'todo/delete',
  async (payload, thunkAPI) => {
    const {
      data: { todoId },
      navigate,
    } = payload;

    try {
      const response = await API.delete(`/todo/${todoId}`);

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeDelModal());
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

export const updateCharacter = createAsyncThunk(
  'todo/update',
  async (payload, thunkAPI) => {
    const {
      data: { id: todoId, newNickname, newJob },
      navigate,
    } = payload;

    try {
      const response = await API.put(`/todo/${todoId}`, {
        newNickname,
        newJob,
      });

      if (response.data.ok) {
        thunkAPI.dispatch(modalSlice.actions.closeUpdateModal());
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
        case 404:
          return thunkAPI.rejectWithValue(err.response.data);
        case 409:
          return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const todoCheck = createAsyncThunk(
  'todo/check',
  async (payload, thunkAPI) => {
    const {
      data: { todoId, category, todoType },
      navigate,
    } = payload;

    try {
      const response = await API.post('/todo/check', {
        todoId,
        category,
        todoType,
      });
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

export const resetTodo = createAsyncThunk(
  'todo/reset',
  async (payload, thunkAPI) => {
    const {
      data: { category },
      navigate,
    } = payload;

    try {
      const response = await API.post('/todo/reset', { category });
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

export const swapTodo = createAsyncThunk(
  'todo/swap',
  async (payload, thunkAPI) => {
    const {
      data: { index, direction },
      navigate,
    } = payload;

    try {
      const response = await API.put('/todo/swap', { index, direction });
      return response.data;
    } catch (err) {
      switch (err.response.status) {
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
