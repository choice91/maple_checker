import { createSlice } from "@reduxjs/toolkit";

import {
  getTodoDatas,
  addCharacterToTodo,
  deleteCharacter,
  updateCharacter,
  resetTodo,
} from "../async/todo";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isFetching: false,
    errorMessage: "",
    todoData: {},
    todoSeq: [],
    addState: {
      isFetching: false,
      isNicknameValid: true,
      isJobValid: true,
      nicknameResultMessage: "",
      jobResultMessage: "",
    },
    updateState: {
      isFetching: false,
      isNicknameValid: true,
      isJobValid: true,
      nicknameResultMessage: "",
      jobResultMessage: "",
    },
  },
  reducers: {
    clearTodoErrorMsg: (state, action) => {
      state.errorMessage = "";
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

      if (direction === "left") {
        [state.todoSeq[index - 1], state.todoSeq[index]] = [
          state.todoSeq[index],
          state.todoSeq[index - 1],
        ];
      } else if (direction === "right") {
        [state.todoSeq[index], state.todoSeq[index + 1]] = [
          state.todoSeq[index + 1],
          state.todoSeq[index],
        ];
      }
    },
    initAddState: (state, action) => {
      state.addState = {
        isFetching: false,
        isNicknameValid: true,
        isJobValid: true,
        nicknameResultMessage: "",
        jobResultMessage: "",
      };
    },
    initUpdateState: (state, action) => {
      state.updateState = {
        isFetching: false,
        isNicknameValid: true,
        isJobValid: true,
        nicknameResultMessage: "",
        jobResultMessage: "",
      };
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
    },
    [getTodoDatas.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 캐릭터 추가
    [addCharacterToTodo.pending]: (state, action) => {
      state.addState = {
        isFetching: true,
        isNicknameValid: true,
        isJobValid: true,
        nicknameResultMessage: "",
        jobResultMessage: "",
      };
    },
    [addCharacterToTodo.fulfilled]: (state, action) => {
      state.addState.isFetching = false;
      const {
        payload: {
          data: { newCharacter, newCharacterId },
        },
      } = action;

      state.todoData = Object.assign(state.todoData, newCharacter);
      state.todoSeq = [...state.todoSeq, newCharacterId];
    },
    [addCharacterToTodo.rejected]: (state, action) => {
      state.addState.isFetching = false;

      switch (action.payload.errorMessage) {
        case "nickname and job is required": {
          state.addState.isNicknameValid = false;
          state.addState.nicknameResultMessage = "닉네임을 입력하세요";
          state.addState.isJobValid = false;
          state.addState.jobResultMessage = "직업을 선택하세요";
          break;
        }
        case "nickname is required": {
          state.addState.isNicknameValid = false;
          state.addState.nicknameResultMessage = "닉네임을 입력하세요";
          break;
        }
        case "job is required": {
          state.addState.isJobValid = false;
          state.addState.jobResultMessage = "직업을 선택하세요";
          break;
        }
        case "already registered character": {
          state.addState.isNicknameValid = false;
          state.addState.nicknameResultMessage = "이미 등록된 닉네임입니다";
          break;
        }
      }
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

    // 캐릭터 정보 수정
    [updateCharacter.pending]: (state, action) => {},
    [updateCharacter.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { updatedId, newNickname, newJob },
        },
      } = action;

      state.todoData[updatedId].nickname = newNickname;
      state.todoData[updatedId].job = newJob;
    },
    [updateCharacter.rejected]: (state, action) => {
      switch (action.payload.errorMessage) {
        case "nickname and job is required": {
          state.updateState.isNicknameValid = false;
          state.updateState.nicknameResultMessage = "닉네임을 입력하세요";
          state.updateState.isJobValid = false;
          state.updateState.jobResultMessage = "직업을 선택하세요";
          break;
        }
        case "nickname is required": {
          state.updateState.isNicknameValid = false;
          state.updateState.nicknameResultMessage = "닉네임을 입력하세요";
          break;
        }
        case "job is required": {
          state.updateState.isJobValid = false;
          state.updateState.jobResultMessage = "직업을 선택하세요";
          break;
        }
        case "already registered character": {
          state.updateState.isNicknameValid = false;
          state.updateState.nicknameResultMessage = "이미 등록된 닉네임입니다";
          break;
        }
      }
    },

    // 초기화
    [resetTodo.pending]: (state, action) => {},
    [resetTodo.fulfilled]: (state, action) => {
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
    },
    [resetTodo.rejected]: (state, action) => {},
  },
});

export default todoSlice;
