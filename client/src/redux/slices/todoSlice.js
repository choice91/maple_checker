import { createSlice } from '@reduxjs/toolkit';

import {
  getTodoDatas,
  addCharacter,
  deleteCharacter,
  updateCharacter,
  resetTodo,
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

    // 초기화
    [resetTodo.pending]: (state, action) => {},
    [resetTodo.fulfilled]: (state, action) => {
      const dailyDefaults = {
        yeoro: false,
        chuchu: false,
        lachelein: false,
        arcana: false,
        morass: false,
        esfera: false,
        cernium: false,
        burningCernium: false,
        arcs: false,
        odium: false,
      };

      const weeklyDefaults = {
        yeoro: false,
        chuchu: false,
        lachelein: false,
        arcana: false,
        morass: false,
        esfera: false,
      };

      for (let key of Object.keys(state.todoData)) {
        state.todoData[key].daily = dailyDefaults;
        state.todoData[key].weekly = weeklyDefaults;
      }
    },
    [resetTodo.rejected]: (state, action) => {},
  },
});

export default todoSlice;
