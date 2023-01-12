import { createSlice } from '@reduxjs/toolkit';

import {
  addCharacterToBoss,
  getBossData,
  bossCheck,
  delCharacterToBoss,
  updateCharacterToBoss,
  resetBossData,
} from '../async/boss';
import { getLocalStorage, setLocalStorage } from '../../utils/LocalStorage';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    category: 'weekly',
    bossData: {},
    bossSeq: [],
    errorMessage: '',
  },
  reducers: {
    clearBossErrorMsg: (state, action) => {
      state.errorMessage = '';
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
      setLocalStorage('bossCategory', action.payload.category);
    },
    swapBoss: (state, action) => {
      const {
        payload: { index, direction },
      } = action;

      if (direction === 'left') {
        [state.bossSeq[index - 1], state.bossSeq[index]] = [
          state.bossSeq[index],
          state.bossSeq[index - 1],
        ];
      } else if (direction === 'right') {
        [state.bossSeq[index], state.bossSeq[index + 1]] = [
          state.bossSeq[index + 1],
          state.bossSeq[index],
        ];
      }
    },
  },
  extraReducers: {
    // 캐릭터 추가
    [addCharacterToBoss.pending]: (state, action) => {},
    [addCharacterToBoss.fulfilled]: (state, action) => {
      state.bossData = Object.assign(
        state.bossData,
        action.payload.data.newCharacter
      );
      state.bossSeq = [...state.bossSeq, action.payload.data.newCharacterId];
    },
    [addCharacterToBoss.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
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
      state.errorMessage = action.payload.errorMessage;
    },

    // 데이터 불러오기
    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      state.bossData = { ...action.payload.data.bossData };
      state.bossSeq = [...action.payload.data.bossSeq];
      state.isFetching = false;

      const bossCategory = getLocalStorage('bossCategory');

      if (!bossCategory) {
        setLocalStorage('bossCategory', 'weekly');
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
    [resetBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [resetBossData.fulfilled]: (state, action) => {
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

      for (let [key, _] of Object.entries(state.bossData)) {
        state.bossData[key].boss = bossDefaultValues;
      }

      state.isFetching = false;
    },
    [resetBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },
  },
});

export default bossSlice;
