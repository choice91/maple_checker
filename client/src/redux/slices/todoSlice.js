import { createSlice } from '@reduxjs/toolkit';

import { getTodoDatas } from '../async/todo';

export const questSlice = createSlice({
  name: 'quest',
  initialState: {
    isFetching: false,
    todoData: {},
  },
  reducers: {},
  extraReducers: {
    [getTodoDatas.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getTodoDatas.fulfilled]: (state, action) => {
      console.log(action);
      state.isFetching = false;
      state.todoData = { ...action.payload.todos };
    },
    [getTodoDatas.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default questSlice;
