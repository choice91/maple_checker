import { createSlice } from '@reduxjs/toolkit';

import {
  addCharacterToBoss,
  getBossData,
  bossCheck,
  delCharacterToBoss,
  updateCharacterToBoss,
  resetBossData,
} from '../async/boss';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    bossData: {},
    errorMessage: '',
  },
  reducers: {
    clearBossErrorMsg: (state, action) => {
      state.errorMessage = '';
    },
    bossCheckReducer: (state, action) => {
      const {
        payload: { bossId, bossType },
      } = action;

      state.bossData[bossId].boss[bossType] =
        !state.bossData[bossId].boss[bossType];
    },
  },
  extraReducers: {
    // 캐릭터 추가
    [addCharacterToBoss.pending]: (state, action) => {
      state.isFetching = true;
    },
    [addCharacterToBoss.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.bossData = Object.assign(
        state.bossData,
        action.payload.newCharacter
      );
    },
    [addCharacterToBoss.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 캐릭터 삭제
    [delCharacterToBoss.pending]: (state, action) => {
      state.isFetching = true;
    },
    [delCharacterToBoss.fulfilled]: (state, action) => {
      state.isFetching = false;
      delete state.bossData[action.payload.data.deletedId];
    },
    [delCharacterToBoss.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 캐릭터 닉네임 수정
    [updateCharacterToBoss.pending]: (state, action) => {
      state.isFetching = true;
    },
    [updateCharacterToBoss.fulfilled]: (state, action) => {
      const {
        payload: {
          data: { updatedId, newNickname },
        },
      } = action;

      state.isFetching = false;
      state.bossData[updatedId].nickname = newNickname;
    },
    [updateCharacterToBoss.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      state.bossData = { ...action.payload.bossData };
      state.isFetching = false;
    },
    [getBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },

    // 체크
    [bossCheck.pending]: (state, action) => {
      state.isFetching = true;
    },
    [bossCheck.fulfilled]: (state, action) => {
      state.isFetching = false;
    },
    [bossCheck.rejected]: (state, action) => {
      state.isFetching = false;
    },

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
