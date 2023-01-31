import { createSlice } from "@reduxjs/toolkit";

import {
  addCharacterToBoss,
  getBossData,
  bossCheck,
  delCharacterToBoss,
  updateCharacterToBoss,
  resetBoss,
} from "../async/boss";
import { getLocalStorage, setLocalStorage } from "../../utils/LocalStorage";

const bossSlice = createSlice({
  name: "boss",
  initialState: {
    isFetching: false,
    errorMessage: "",
    category: "weekly",
    bossData: {},
    bossSeq: [],
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
    clearBossErrorMsg: (state, action) => {
      state.errorMessage = "";
    },
    bossCheckReducer: (state, action) => {
      const {
        payload: { bossId, category, bossType },
      } = action;

      state.bossData[bossId][category][bossType] =
        !state.bossData[bossId][category][bossType];
    },
    switchCategory: (state, action) => {
      state.category = action.payload.category;
      setLocalStorage("bossCategory", action.payload.category);
    },
    swapBoss: (state, action) => {
      const {
        payload: { index, direction },
      } = action;

      if (direction === "left") {
        [state.bossSeq[index - 1], state.bossSeq[index]] = [
          state.bossSeq[index],
          state.bossSeq[index - 1],
        ];
      } else if (direction === "right") {
        [state.bossSeq[index], state.bossSeq[index + 1]] = [
          state.bossSeq[index + 1],
          state.bossSeq[index],
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
    // 캐릭터 추가
    [addCharacterToBoss.pending]: (state, action) => {
      state.addState = {
        isFetching: true,
        isNicknameValid: true,
        isJobValid: true,
        nicknameResultMessage: "",
        jobResultMessage: "",
      };
    },
    [addCharacterToBoss.fulfilled]: (state, action) => {
      state.bossData = Object.assign(
        state.bossData,
        action.payload.data.newCharacter
      );
      state.bossSeq = [...state.bossSeq, action.payload.data.newCharacterId];
    },
    [addCharacterToBoss.rejected]: (state, action) => {
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
    [delCharacterToBoss.pending]: (state, action) => {},
    [delCharacterToBoss.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { deletedId },
        },
      } = action;

      delete state.bossData[deletedId];
      state.bossSeq = state.bossSeq.filter((id) => id !== deletedId);
    },
    [delCharacterToBoss.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    // 캐릭터 닉네임 수정
    [updateCharacterToBoss.pending]: (state, action) => {},
    [updateCharacterToBoss.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { updatedId, newNickname },
        },
      } = action;

      state.bossData[updatedId].nickname = newNickname;
    },
    [updateCharacterToBoss.rejected]: (state, action) => {
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

    // 데이터 불러오기
    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      state.bossData = { ...action.payload.data.bossData };
      state.bossSeq = [...action.payload.data.bossSeq];
      state.isFetching = false;

      const bossCategory = getLocalStorage("bossCategory");

      if (!bossCategory) {
        setLocalStorage("bossCategory", "weekly");
      } else {
        state.category = bossCategory;
      }
    },
    [getBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 체크
    [bossCheck.pending]: (state, action) => {},
    [bossCheck.fulfilled]: (state, action) => {},
    [bossCheck.rejected]: (state, action) => {},

    // 퀘스트 데이터 초기화
    [resetBoss.pending]: (state, action) => {},
    [resetBoss.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { category },
        },
      } = action;

      if (category === "weekly") {
        const bossDefaultValues = {
          zaqqum: false,
          magnus: false,
          hilla: false,
          papulatus: false,
          pierre: false,
          banban: false,
          bloodyQueen: false,
          vellum: false,
          pinkBean: false,
          lotus: false,
          damian: false,
          guardianAngelSlime: false,
          lucid: false,
          will: false,
          dusk: false,
          jinHilla: false,
          darknell: false,
          seren: false,
          kalos: false,
        };

        Object.keys(state.bossData).forEach((key) => {
          state.bossData[key].weekly = bossDefaultValues;
        });
      } else if (category === "monthly") {
        const monthlyDefaults = { blackMagician: false };

        Object.keys(state.bossData).forEach((key) => {
          state.bossData[key].monthly = monthlyDefaults;
        });
      }
    },
    [resetBoss.rejected]: (state, action) => {},
  },
});

export default bossSlice;
