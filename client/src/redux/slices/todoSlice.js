import { createSlice } from '@reduxjs/toolkit';

import {
  getTodoDatas,
  addCharacter,
  deleteCharacter,
  updateCharacter,
  todoCheck,
} from '../async/todo';

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
    todoCheckReducer: (state, action) => {
      const {
        payload: { todoId, category, todoType },
      } = action;

      state.todoData[todoId][category][todoType] =
        !state.todoData[todoId][category][todoType];
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

    // 캐릭터 삭제
    [deleteCharacter.pending]: (state, action) => {
      state.isFetching = true;
    },
    [deleteCharacter.fulfilled]: (state, action) => {
      state.isFetching = false;
      delete state.todoData[action.payload.data.deletedId];
    },
    [deleteCharacter.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 닉네임 수정
    [updateCharacter.pending]: (state, action) => {
      state.isFetching = true;
    },
    [updateCharacter.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { updatedId, newNickname },
        },
      } = action;

      state.isFetching = false;
      state.todoData[updatedId].nickname = newNickname;
    },
    [updateCharacter.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 체크
    [todoCheck.pending]: (state, action) => {
      state.isFetching = true;
    },
    [todoCheck.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [todoCheck.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default todoSlice;
