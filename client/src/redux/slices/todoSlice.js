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
    todoData: {},
    todoSeq: [],
  },
  reducers: {
    clearTodoErrorMsg: (state, action) => {
      state.errorMessage = '';
    },
    todoCheckReducer: (state, action) => {
      const {
        payload: { todoId, todoType },
      } = action;

      state.todoData[todoId].weekly[todoType] =
        !state.todoData[todoId].weekly[todoType];
    },
    swapTodo: (state, action) => {
      const {
        payload: { index, direction },
      } = action;

      if (direction === 'left') {
        [state.todoSeq[index - 1], state.todoSeq[index]] = [
          state.todoSeq[index],
          state.todoSeq[index - 1],
        ];
      } else if (direction === 'right') {
        [state.todoSeq[index], state.todoSeq[index + 1]] = [
          state.todoSeq[index + 1],
          state.todoSeq[index],
        ];
      }
    },
  },
  extraReducers: {
    // Todo 데이터 불러오기
    [getTodoDatas.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getTodoDatas.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.todoData = { ...action.payload.data.todos };
      state.todoSeq = [...action.payload.data.todoSeq];

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
      const {
        payload: {
          data: { newCharacter, newCharacterId },
        },
      } = action;

      state.todoData = Object.assign(state.todoData, newCharacter);
      state.todoSeq = [...state.todoSeq, newCharacterId];
    },
    [addCharacter.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    // 캐릭터 삭제
    [deleteCharacter.pending]: (state, action) => {},
    [deleteCharacter.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { deletedId },
        },
      } = action;

      delete state.todoData[deletedId];
      state.todoSeq = state.todoSeq.filter((id) => id !== deletedId);
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
      const {
        payload: {
          data: { category },
        },
      } = action;

      if (category === 'daily') {
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

        Object.keys(state.todoData).forEach((key) => {
          state.todoData[key].daily = dailyDefaults;
        });
      } else if (category === 'weekly') {
        const weeklyDefaults = {
          yeoro: false,
          chuchu: false,
          lachelein: false,
          arcana: false,
          morass: false,
          esfera: false,
        };

        Object.keys(state.todoData).forEach((key) => {
          state.todoData[key].weekly = weeklyDefaults;
        });
      }
    },
    [resetTodo.rejected]: (state, action) => {},
  },
});

export default todoSlice;
