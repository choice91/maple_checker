import { createSlice } from '@reduxjs/toolkit';

import {
  addCharacterToBoss,
  getBossData,
  bossCheckToServer,
  delCharacterToBoss,
} from '../async/boss';

const bossSlice = createSlice({
  name: 'boss',
  initialState: {
    isFetching: false,
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDelModalOpen: false,
    nickname: null,
    bossId: null,
    bossData: {},
    errorMessage: '',
  },
  reducers: {
    bossCheckReducer: (state, action) => {
      const {
        payload: { bossId, bossType },
      } = action;

      state.bossData[`${bossId}`].boss[`${bossType}`] =
        !state.bossData[`${bossId}`].boss[`${bossType}`];
    },
    bossErrorMessageClear: (state, action) => {
      state.errorMessage = '';
    },

    // 캐릭터 추가 모달
    openBossAddModal: (state, action) => {
      state.isAddModalOpen = true;
    },
    closeBossAddModal: (state, action) => {
      state.isAddModalOpen = false;
      state.errorMessage = '';
    },

    // 캐릭터 닉네임 수정 모달
    openBossUpdateModal: (state, action) => {
      const {
        payload: { nickname, id: bossId },
      } = action;

      state.isUpdateModalOpen = true;
      state.nickname = nickname;
      state.bossId = bossId;
    },
    closeBossUpdateModal: (state, action) => {
      state.isUpdateModalOpen = false;
      state.errorMessage = '';
      state.nickname = null;
      state.bossId = null;
    },

    // 캐릭터 삭제 모달
    openBossDelModal: (state, action) => {
      const {
        payload: { nickname, id: bossId },
      } = action;

      state.isDelModalOpen = true;
      state.nickname = nickname;
      state.bossId = bossId;
    },
    closeBossDelModal: (state, action) => {
      state.isDelModalOpen = false;
      state.nickname = null;
      state.bossId = null;
    },

    // 캐릭터 닉네임 수정
    updateNicknameInTable: (state, action) => {
      const {
        payload: { id: bossId, nickname },
      } = action;

      state.bossData[`${bossId}`].nickname = nickname;
      state.isUpdateModalOpen = false;
      state.errorMessage = false;
      state.nickname = null;
      state.bossId = null;
    },

    // 캐릭터 삭제
    delCharacterInTable: (state, action) => {
      const {
        payload: { id: bossId },
      } = action;

      delete state.bossData[`${bossId}`];
      state.isDelModalOpen = false;
      state.nickname = null;
      state.bossId = null;
    },
  },
  extraReducers: {
    [addCharacterToBoss.pending]: (state, action) => {
      state.errorMessage = '';
    },
    [addCharacterToBoss.fulfilled]: (state, action) => {
      const {
        payload: { newCharacter },
      } = action;

      state.bossData = Object.assign(state.bossData, newCharacter);
    },
    [addCharacterToBoss.rejected]: (state, action) => {
      const {
        payload: { errorMessage },
      } = action;

      state.errorMessage = errorMessage;
    },

    [delCharacterToBoss.pending]: (state, action) => {},
    [delCharacterToBoss.fulfilled]: (state, action) => {},
    [delCharacterToBoss.rejected]: (state, action) => {
      const {
        payload: { errorMessage },
      } = action;

      state.errorMessage = errorMessage;
    },

    [getBossData.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getBossData.fulfilled]: (state, action) => {
      const {
        payload: { bossData },
      } = action;

      state.bossData = bossData;
      state.isFetching = false;
    },
    [getBossData.rejected]: (state, action) => {
      state.isFetching = false;
    },

    [bossCheckToServer.pending]: (state, action) => {},
    [bossCheckToServer.fulfilled]: (state, action) => {},
    [bossCheckToServer.rejected]: (state, action) => {},
  },
});

export default bossSlice;
