import { createSlice } from '@reduxjs/toolkit';

import { addCharacter, getTodoDatas } from '../async/todo';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    isFetching: false,
    errorMessage: '',
    todoData: {},
  },
  reducers: {
    clearTodoErrorMsg: (state, action) => {
      state.errorMessage = '';
    },
  },
  extraReducers: {
    // Todo 데이터 불러오기
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

    // 캐릭터 추가
    [addCharacter.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addCharacter.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.todoData = Object.assign(
        state.todoData,
        action.payload.newCharacter
      );
    },
    [addCharacter.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export default todoSlice;
