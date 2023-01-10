import { createSlice } from '@reduxjs/toolkit';

import {
  getTodoDatas,
  addCharacter,
  deleteCharacter,
  updateCharacter,
  todoCheck,
} from '../async/todo';
import { getLocalStorage, setLocalStorage } from '../../utils/LocalStorage';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    isFetching: false,
    errorMessage: '',
    category: 'daily',
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
    switchCategory: (state, action) => {
      state.category = action.payload.category;
      setLocalStorage('todoCategory', action.payload.category);
    },
  },
  extraReducers: {
    // Todo 데이터 불러오기
    [getTodoDatas.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getTodoDatas.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.todoData = { ...action.payload.todos };

      const todoCategory = getLocalStorage('todoCategory');

      if (!todoCategory) {
        setLocalStorage('todoCategory', 'daily');
      } else {
        state.category = todoCategory;
      }
    },
    [getTodoDatas.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 캐릭터 추가
    [addCharacter.pending]: (state, action) => {},
    [addCharacter.fulfilled]: (state, action) => {
      state.todoData = Object.assign(
        state.todoData,
        action.payload.newCharacter
      );
    },
    [addCharacter.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    // 캐릭터 삭제
    [deleteCharacter.pending]: (state, action) => {},
    [deleteCharacter.fulfilled]: (state, action) => {
      delete state.todoData[action.payload.data.deletedId];
    },
    [deleteCharacter.rejected]: (state, action) => {},

    // 닉네임 수정
    [updateCharacter.pending]: (state, action) => {},
    [updateCharacter.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { updatedId, newNickname },
        },
      } = action;

      state.todoData[updatedId].nickname = newNickname;
    },
    [updateCharacter.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    // 체크
    [todoCheck.pending]: (state, action) => {},
    [todoCheck.fulfilled]: (state, action) => {},
    [todoCheck.rejected]: (state, action) => {},
  },
});

export default todoSlice;
